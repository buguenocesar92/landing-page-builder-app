'use client';

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Eye, MousePointer, ShoppingCart, Award, Calendar, DollarSign, Filter } from 'lucide-react';
import { useAuth, useRequireAuth } from '@/lib/auth-context';
import apiService from '@/lib/api';

interface ProductStat {
  product_name: string;
  product_category: string;
  product_price: number;
  clicks_count: number;
  unique_visitors: number;
  avg_price: number;
}

interface AnalyticsData {
  landing: {
    id: number;
    title: string;
    slug: string;
  };
  summary: {
    total_clicks: number;
    unique_visitors: number;
    avg_clicks_per_visitor: number;
    total_revenue_potential: number;
    avg_product_price: number;
  };
  popular_products: ProductStat[];
  clicks_by_hour: Array<{ hour: number; clicks_count: number }>;
  clicks_by_category: Array<{ product_category: string; clicks_count: number }>;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0', '#ffb347', '#87ceeb'];

// Helper function para formatear números de forma segura
const safeFormatNumber = (value: any, decimals: number = 0): string => {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return '0';
  }
  const num = Number(value);
  return decimals > 0 ? num.toFixed(decimals) : num.toLocaleString();
};

// Helper function para obtener valor numérico seguro
const safeNumber = (value: any, defaultValue: number = 0): number => {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return defaultValue;
  }
  return Number(value);
};

export default function AnalyticsPage() {
  const { user } = useAuth();
  const { isAuthenticated, loading: authLoading } = useRequireAuth();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanding, setSelectedLanding] = useState<number | null>(null);
  const [landings, setLandings] = useState<any[]>([]);
  const [dateFilter, setDateFilter] = useState({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 días atrás
    to: new Date().toISOString().split('T')[0] // hoy
  });

  // Cargar landings disponibles
  useEffect(() => {
    if (!isAuthenticated || authLoading) return;

    const fetchLandings = async () => {
      try {
        const response = await apiService.getLandings();
        
        if (response.success && response.data) {
          setLandings(response.data);
          if (response.data.length > 0) {
            setSelectedLanding(response.data[0].id);
          }
        }
      } catch (error) {
        console.error('Error cargando landings:', error);
        setError('Error cargando landing pages');
      }
    };

    fetchLandings();
  }, [isAuthenticated, authLoading]);

  // Cargar analytics cuando cambie la landing seleccionada
  useEffect(() => {
    if (!selectedLanding || !isAuthenticated || authLoading) return;

    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await apiService.getProductAnalytics(selectedLanding, {
          date_from: dateFilter.from,
          date_to: dateFilter.to,
          limit: 10
        });
        
        if (response.success) {
          setAnalyticsData(response.data);
        } else {
          setError(response.message || 'Error cargando datos');
        }
      } catch (error: any) {
        setError(error.message || 'Error desconocido');
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [selectedLanding, dateFilter, isAuthenticated, authLoading]);

  // Mostrar loading mientras se autentica
  if (authLoading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-lg text-gray-600">Verificando autenticación...</span>
        </div>
      </div>
    );
  }

  // El useRequireAuth se encarga de redirigir si no está autenticado
  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-lg text-gray-600">Cargando analytics...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error cargando datos</h3>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!analyticsData || !analyticsData.summary) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No hay datos disponibles</h3>
          <p className="text-gray-500">
            {selectedLanding ? 'No hay clics registrados para esta landing page.' : 'Selecciona una landing page para ver las estadísticas'}
          </p>
          {selectedLanding && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 <strong>Tip:</strong> Los datos aparecerán aquí cuando los visitantes hagan clic en los botones de productos de tu landing page.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-blue-600" />
              Analytics de Productos
            </h1>
            <p className="text-gray-600 mt-2">
              Estadísticas detalladas de clics en productos para {analyticsData.landing?.title || 'Landing Page'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Usuario: {user?.name} | {landings.length} landing pages disponibles
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Filtro de Landing Page */}
            <select
              value={selectedLanding || ''}
              onChange={(e) => setSelectedLanding(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar Landing</option>
              {landings.map((landing) => (
                <option key={landing.id} value={landing.id}>
                  {landing.title}
                </option>
              ))}
            </select>

            {/* Filtros de fecha */}
            <input
              type="date"
              value={dateFilter.from}
              onChange={(e) => setDateFilter(prev => ({ ...prev, from: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
            <span className="text-gray-500">hasta</span>
            <input
              type="date"
              value={dateFilter.to}
              onChange={(e) => setDateFilter(prev => ({ ...prev, to: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Estadísticas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <MousePointer className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Clics</p>
              <p className="text-2xl font-bold text-gray-900">{safeFormatNumber(analyticsData.summary.total_clicks)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <Eye className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Visitantes Únicos</p>
              <p className="text-2xl font-bold text-gray-900">{safeFormatNumber(analyticsData.summary.unique_visitors)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Clics/Visitante</p>
              <p className="text-2xl font-bold text-gray-900">{safeFormatNumber(analyticsData.summary.avg_clicks_per_visitor, 1)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Potencial Ingresos</p>
              <p className="text-2xl font-bold text-gray-900">${safeFormatNumber(analyticsData.summary.total_revenue_potential)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <Award className="w-8 h-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Precio Promedio</p>
              <p className="text-2xl font-bold text-gray-900">${safeFormatNumber(analyticsData.summary.avg_product_price, 2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Verificar si hay datos de productos antes de mostrar gráficos */}
      {analyticsData.popular_products && analyticsData.popular_products.length > 0 ? (
        <>
          {/* Productos Más Populares */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Productos */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="w-6 h-6 mr-2 text-gold-600" />
                Top 10 Productos Más Clickeados
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={analyticsData.popular_products}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="product_name" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [value, name === 'clicks_count' ? 'Clics' : 'Visitantes Únicos']}
                    labelFormatter={(label) => `Producto: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="clicks_count" fill="#8884d8" name="Total Clics" />
                  <Bar dataKey="unique_visitors" fill="#82ca9d" name="Visitantes Únicos" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Clics por Categoría */}
            {analyticsData.clicks_by_category && analyticsData.clicks_by_category.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <ShoppingCart className="w-6 h-6 mr-2 text-blue-600" />
                  Distribución por Categoría
                </h3>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={analyticsData.clicks_by_category}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ product_category, percent }: any) => `${product_category} ${((percent || 0) * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="clicks_count"
                    >
                      {analyticsData.clicks_by_category.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, 'Clics']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Clics por Hora */}
          {analyticsData.clicks_by_hour && analyticsData.clicks_by_hour.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-purple-600" />
                Distribución de Clics por Hora (Hoy)
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.clicks_by_hour}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="hour" 
                    tickFormatter={(value: any) => `${value}:00`}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [value, 'Clics']}
                    labelFormatter={(value) => `Hora: ${value}:00`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="clicks_count" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Tabla Detallada */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Detalles de Productos</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Producto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoría
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Precio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Clics
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Visitantes Únicos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CTR
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue Potencial
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analyticsData.popular_products.map((product, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">
                            {product.product_name}
                          </span>
                          {index < 3 && (
                            <span className="ml-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                              Top {index + 1}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.product_category || 'Sin categoría'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${safeFormatNumber(product.product_price, 2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {safeFormatNumber(product.clicks_count)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {safeFormatNumber(product.unique_visitors)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {safeFormatNumber((safeNumber(product.clicks_count) / Math.max(safeNumber(product.unique_visitors), 1)) * 100, 1)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                        ${safeFormatNumber(safeNumber(product.clicks_count) * safeNumber(product.product_price))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Mensaje cuando no hay datos de productos */
        <div className="bg-white rounded-lg shadow-sm p-12">
          <div className="text-center">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No hay datos de productos aún</h3>
            <p className="text-gray-500 mb-6">
              Los gráficos y estadísticas aparecerán aquí cuando los visitantes interactúen con los productos en tu landing page.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h4 className="font-semibold text-blue-900 mb-3">🚀 Para generar datos:</h4>
              <ul className="text-sm text-blue-800 space-y-2 text-left">
                <li>1. <strong>Ve a tu landing page:</strong> /l/{analyticsData.landing?.slug || 'tu-landing'}</li>
                <li>2. <strong>Haz clic</strong> en los botones "Lo Quiero" de algunos productos</li>
                <li>3. <strong>Regresa aquí</strong> para ver las estadísticas actualizadas</li>
                <li>4. <strong>Comparte la página</strong> para obtener más datos reales</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 