'use client';

import { useEffect, useState } from 'react';
import { useAuth, useRequireAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import apiService from '@/lib/api';
import { ArrowLeft, FileText, Zap, Crown, Rocket } from 'lucide-react';
import Link from 'next/link';
import type { Template } from '@/types';

export default function CreateLandingPage() {
  const { user } = useAuth();
  const { isAuthenticated, loading: authLoading } = useRequireAuth();
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    template_id: 0,
  });
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadTemplates();
    }
  }, [isAuthenticated]);

  const loadTemplates = async () => {
    try {
      const response = await apiService.getTemplates();
      if (response.success) {
        setTemplates(response.data || []);
      }
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLanding = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTemplate || !formData.title.trim()) {
      alert('Por favor completa todos los campos y selecciona un template');
      return;
    }

    try {
      setCreating(true);
      
      // Generar slug si no se proporcionó
      let slug = formData.slug.trim();
      if (!slug) {
        const slugResponse = await apiService.generateSlug(formData.title);
        if (slugResponse.success) {
          slug = slugResponse.data.slug;
        }
      }

      // Crear landing page
      const landingData = {
        title: formData.title.trim(),
        slug,
        template_id: selectedTemplate.id,
        user_id: user?.id,
        content: {
          ...selectedTemplate.content,
          title: formData.title.trim(),
        },
        is_active: true,
      };

      const response = await apiService.createLanding(landingData);
      
      if (response.success) {
        router.push(`/dashboard/landing/${response.data.id}`);
      } else {
        alert('Error al crear la landing page: ' + response.message);
      }
    } catch (error: any) {
      console.error('Error creating landing:', error);
      alert('Error al crear la landing page: ' + (error.response?.data?.message || error.message));
    } finally {
      setCreating(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
    });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando templates...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Link
              href="/dashboard"
              className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Volver al Dashboard
            </Link>
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Nueva Landing Page
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Detalles de tu Landing Page
              </h2>
              
              <form onSubmit={handleCreateLanding} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Título *
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={handleTitleChange}
                    placeholder="Ej: Mi Producto Increíble"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                    URL (slug)
                  </label>
                  <div className="mt-1 flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      .../l/
                    </span>
                    <input
                      type="text"
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="mi-producto-increible"
                      className="flex-1 block w-full border border-gray-300 rounded-none rounded-r-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Se genera automáticamente si se deja vacío
                  </p>
                </div>

                {selectedTemplate && (
                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Template Seleccionado:</h3>
                    <div className="bg-indigo-50 rounded-md p-3">
                      <div className="flex items-center">
                        {selectedTemplate.is_premium ? (
                          <Crown className="h-4 w-4 text-yellow-500 mr-2" />
                        ) : (
                          <Zap className="h-4 w-4 text-green-500 mr-2" />
                        )}
                        <span className="text-sm font-medium text-gray-900">
                          {selectedTemplate.name}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {selectedTemplate.description}
                      </p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={creating || !selectedTemplate || !formData.title.trim()}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-3 rounded-md font-medium flex items-center justify-center"
                >
                  {creating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creando...
                    </>
                  ) : (
                    <>
                      <Rocket className="h-4 w-4 mr-2" />
                      Crear Landing Page
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Templates Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Selecciona un Template
              </h2>

              {templates.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No hay templates disponibles
                  </h3>
                  <p className="text-gray-500">
                    Contacta al administrador para agregar templates.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template)}
                      className={`relative cursor-pointer rounded-lg border-2 p-4 hover:shadow-md transition-all ${
                        selectedTemplate?.id === template.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {/* Premium Badge */}
                      {template.is_premium && (
                        <div className="absolute top-2 right-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <Crown className="h-3 w-3 mr-1" />
                            Premium
                          </span>
                        </div>
                      )}

                      {/* Free Badge */}
                      {!template.is_premium && (
                        <div className="absolute top-2 right-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Zap className="h-3 w-3 mr-1" />
                            Gratis
                          </span>
                        </div>
                      )}

                      {/* Template Preview */}
                      <div className="aspect-video bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                        {template.preview_image ? (
                          <img
                            src={template.preview_image}
                            alt={template.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        ) : (
                          <div className="text-center">
                            <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Vista previa</p>
                          </div>
                        )}
                      </div>

                      {/* Template Info */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          {template.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {template.description}
                        </p>

                        {/* Selection Indicator */}
                        {selectedTemplate?.id === template.id && (
                          <div className="flex items-center text-indigo-600">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></div>
                            <span className="text-sm font-medium">Seleccionado</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 