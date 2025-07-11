'use client';

import { useEffect, useState } from 'react';
import { useAuth, useRequireAuth } from '@/lib/auth-context';
import apiService from '@/lib/api';
import { BarChart3, FileText, Users, Eye, Plus, LogOut, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import type { DashboardStats, Landing } from '@/types';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { isAuthenticated, loading: authLoading } = useRequireAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [landings, setLandings] = useState<Landing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user) {
      loadDashboardData();
    }
  }, [isAuthenticated, user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsResponse, landingsResponse] = await Promise.all([
        apiService.getDashboardStats(user?.id),
        apiService.getLandings(),
      ]);

      if (statsResponse.success) {
        setStats(statsResponse.data);
      }

      if (landingsResponse.success) {
        setLandings(landingsResponse.data || []);
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // El hook useRequireAuth se encarga de la redirección
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Dashboard
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Hola, <span className="font-medium">{user?.name}</span>
              </span>
              <button
                onClick={logout}
                className="flex items-center text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Salir
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Landing Pages</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.total_landings}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Eye className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Visitas Totales</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.total_views}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Leads Capturados</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.total_leads}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Conversión</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.conversion_rate}%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Landing Pages Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Mis Landing Pages</h2>
              <div className="flex space-x-3">
                <Link
                  href="/dashboard/analytics"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Analytics de Productos
                </Link>
                <Link
                  href="/dashboard/create"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Nueva Landing Page
                </Link>
              </div>
            </div>
          </div>

          {landings.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No tienes landing pages aún
              </h3>
              <p className="text-gray-500 mb-6">
                Crea tu primera landing page para empezar a capturar leads.
              </p>
              <Link
                href="/dashboard/create"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium inline-flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Crear Mi Primera Landing Page
              </Link>
            </div>
          ) : (
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Landing Page
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Visitas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Leads
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Conversión
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {landings.map((landing) => (
                    <tr key={landing.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {landing.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            /{landing.slug}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            landing.is_active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {landing.is_active ? 'Activa' : 'Inactiva'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {landing.views_count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {landing.leads_count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {landing.views_count > 0 
                          ? ((landing.leads_count / landing.views_count) * 100).toFixed(1)
                          : '0'
                        }%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/dashboard/landing/${landing.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Ver detalles
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        {stats?.recent_activity && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Leads */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Últimos Leads</h3>
              </div>
              <div className="px-6 py-4">
                {stats.recent_activity.recent_leads.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No hay leads recientes</p>
                ) : (
                  <div className="space-y-3">
                    {stats.recent_activity.recent_leads.slice(0, 5).map((lead) => (
                      <div key={lead.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                          <p className="text-sm text-gray-500">{lead.email}</p>
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Recent Landings */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Landing Pages Recientes</h3>
              </div>
              <div className="px-6 py-4">
                {stats.recent_activity.recent_landings.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No hay landing pages recientes</p>
                ) : (
                  <div className="space-y-3">
                    {stats.recent_activity.recent_landings.slice(0, 5).map((landing) => (
                      <div key={landing.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{landing.title}</p>
                          <p className="text-sm text-gray-500">/{landing.slug}</p>
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(landing.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 