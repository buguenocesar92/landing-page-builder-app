'use client';

import { useEffect, useState } from 'react';
import { useAuth, useRequireAuth } from '@/lib/auth-context';
import { useParams, useRouter } from 'next/navigation';
import apiService from '@/lib/api';
import { 
  ArrowLeft, 
  Eye, 
  Users, 
  BarChart3, 
  ExternalLink, 
  Copy, 
  Edit, 
  Trash2,
  Download,
  RefreshCw,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import type { Landing, LandingAnalytics, Lead } from '@/types';
import TemplateCustomizer from '@/components/TemplateCustomizer';

export default function LandingDetailPage() {
  const { user } = useAuth();
  const { isAuthenticated, loading: authLoading } = useRequireAuth();
  const params = useParams();
  const router = useRouter();
  const landingId = parseInt(params.id as string);
  
  const [landing, setLanding] = useState<Landing | null>(null);
  const [analytics, setAnalytics] = useState<LandingAnalytics | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (isAuthenticated && landingId) {
      loadLandingData();
    }
  }, [isAuthenticated, landingId]);

  const loadLandingData = async () => {
    try {
      setLoading(true);
      const [landingResponse, analyticsResponse, leadsResponse] = await Promise.all([
        apiService.getLanding(landingId),
        apiService.getLandingAnalytics(landingId),
        apiService.getLeads(),
      ]);

      if (landingResponse.success && landingResponse.data) {
        setLanding(landingResponse.data);
      }

      if (analyticsResponse.success && analyticsResponse.data) {
        setAnalytics(analyticsResponse.data);
      }

      if (leadsResponse.success) {
        // Filtrar leads de esta landing page
        const landingLeads = leadsResponse.data?.filter(
          (lead: Lead) => lead.landing_id === landingId
        ) || [];
        setLeads(landingLeads);
      }
    } catch (error) {
      console.error('Error loading landing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadLandingData();
    setRefreshing(false);
  };

  const handleCopyUrl = () => {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/l/${landing?.slug}`;
    navigator.clipboard.writeText(url);
    alert('URL copiada al portapapeles');
  };

  const handleDeleteLanding = async () => {
    if (!landing) return;
    
    if (confirm(`¿Estás seguro de que quieres eliminar "${landing.title}"? Esta acción no se puede deshacer.`)) {
      try {
        const response = await apiService.deleteLanding(landing.id);
        if (response.success) {
          router.push('/dashboard');
        } else {
          alert('Error al eliminar la landing page');
        }
      } catch (error) {
        console.error('Error deleting landing:', error);
        alert('Error al eliminar la landing page');
      }
    }
  };

  const handleDuplicate = async () => {
    if (!landing) return;
    
    try {
      const response = await apiService.duplicateLanding(landing.id);
      if (response.success && response.data) {
        router.push(`/dashboard/landing/${response.data.id}`);
      } else {
        alert('Error al duplicar la landing page');
      }
    } catch (error) {
      console.error('Error duplicating landing:', error);
      alert('Error al duplicar la landing page');
    }
  };

  const handleSaveTemplate = async (customizedTemplate: any, showSuccessMessage: boolean = true) => {
    if (!landing) return;
    
    try {
      const response = await apiService.updateLanding(landing.id, {
        title: landing.title,
        slug: landing.slug,
        template_id: landing.template_id,
        content: customizedTemplate,
        is_active: landing.is_active
      });
      
      if (response.success && response.data) {
        setLanding(response.data);
        if (showSuccessMessage) {
          alert('Template guardado exitosamente');
          setIsEditMode(false);
        }
      } else {
        alert('Error al guardar el template');
      }
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Error al guardar el template');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando datos...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !landing) {
    return null;
  }

  const publicUrl = `${process.env.NEXT_PUBLIC_APP_URL}/l/${landing.slug}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Link
                href="/dashboard"
                className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                Dashboard
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {landing.title}
                </h1>
                <p className="text-sm text-gray-500">/{landing.slug}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className={`flex items-center px-3 py-2 border rounded-md transition-colors ${
                  isEditMode
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'text-indigo-600 hover:text-indigo-700 border-indigo-300'
                }`}
              >
                <Settings className="h-4 w-4 mr-1" />
                {isEditMode ? 'Ver Dashboard' : 'Editar Template'}
              </button>
              
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md"
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
                Actualizar
              </button>
              
              <a
                href={publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 text-indigo-600 hover:text-indigo-700 border border-indigo-300 rounded-md"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Ver Pública
              </a>
              
              <button
                onClick={handleCopyUrl}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md"
              >
                <Copy className="h-4 w-4 mr-1" />
                Copiar URL
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mostrar Editor o Dashboard */}
        {isEditMode ? (
          <TemplateCustomizer 
            initialTemplate={landing.content}
            onSave={handleSaveTemplate}
            landingSlug={landing.slug}
          />
        ) : (
          <>
            {/* Analytics Cards */}
            {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Eye className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Visitas Totales</p>
                  <p className="text-2xl font-semibold text-gray-900">{analytics.total_views}</p>
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
                  <p className="text-2xl font-semibold text-gray-900">{analytics.total_leads}</p>
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
                  <p className="text-2xl font-semibold text-gray-900">{analytics.conversion_rate}%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Landing Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Información General */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Información General</h2>
              </div>
              <div className="px-6 py-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Título</label>
                  <p className="mt-1 text-sm text-gray-900">{landing.title}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">URL Pública</label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="text"
                      value={publicUrl}
                      readOnly
                      className="flex-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-l-md px-3 py-2"
                    />
                    <button
                      onClick={handleCopyUrl}
                      className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-md px-3 py-2 hover:bg-gray-200"
                    >
                      <Copy className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Estado</label>
                  <span
                    className={`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      landing.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {landing.is_active ? 'Activa' : 'Inactiva'}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha de Creación</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(landing.created_at).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Acciones</h2>
              </div>
              <div className="px-6 py-4">
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleDuplicate}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicar
                  </button>
                  
                  <button
                    className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                    disabled
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar (Próximamente)
                  </button>
                  
                  <button
                    onClick={handleDeleteLanding}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Leads Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">
                  Leads Recientes ({leads.length})
                </h2>
                {leads.length > 0 && (
                  <button className="flex items-center text-sm text-indigo-600 hover:text-indigo-700">
                    <Download className="h-4 w-4 mr-1" />
                    Exportar
                  </button>
                )}
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {leads.length === 0 ? (
                  <div className="px-6 py-8 text-center">
                    <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No hay leads aún</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {leads.map((lead) => (
                      <div key={lead.id} className="px-6 py-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                            <p className="text-sm text-gray-500">{lead.email}</p>
                            {lead.phone && (
                              <p className="text-sm text-gray-500">{lead.phone}</p>
                            )}
                            {lead.message && (
                              <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                                {lead.message}
                              </p>
                            )}
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(lead.created_at).toLocaleDateString('es-ES')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
          </>
        )}
      </main>
    </div>
  );
} 