'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import apiService from '@/lib/api';
import LandingRenderer from '@/components/LandingRenderer';
import type { Landing } from '@/types';

export default function PublicLandingPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [landing, setLanding] = useState<Landing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (slug) {
      loadLanding();
    }
  }, [slug]);

  const loadLanding = async () => {
    try {
      setLoading(true);
      const response = await apiService.getLandingBySlug(slug);
      
      if (response.success && response.data) {
        setLanding(response.data);
        // Actualizar title dinámicamente
        document.title = response.data.title;
        
        // Incrementar contador de visitas
        try {
          await apiService.incrementLandingViews(response.data.id);
        } catch (err) {
          console.log('Error incrementing views:', err);
        }
      } else {
        setError('Landing page no encontrada');
      }
    } catch (err: any) {
      console.error('Error loading landing:', err);
      setError('Error al cargar la página');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (formData: any) => {
    if (!landing) return;

    try {
      const leadData = {
        landing_id: landing.id,
        name: formData.name?.trim(),
        email: formData.email?.trim(),
        phone: formData.phone?.trim() || undefined,
        message: formData.message?.trim() || undefined,
        company: formData.company?.trim() || undefined,
        extra_data: {
          form_fields: Object.keys(formData),
          landing_title: landing.title,
          landing_slug: landing.slug,
          submission_time: new Date().toISOString()
        }
      };

      const response = await apiService.submitLead(leadData);
      
      if (response.success) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error(response.message || 'Error al enviar el formulario');
      }
    } catch (err: any) {
      console.error('Error submitting lead:', err);
      throw err;
    }
  };

  // Componente de loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-t-4 border-indigo-300 mx-auto animate-ping"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Cargando experiencia...</h2>
          <p className="text-gray-500">Preparando el contenido para ti</p>
        </div>
      </div>
    );
  }

  // Componente de error
  if (error || !landing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-8xl mb-6">🔍</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Página no encontrada</h1>
          <p className="text-lg text-gray-600 mb-8">
            La landing page que buscas no existe o ha sido eliminada.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
          >
            Ir al inicio
          </a>
        </div>
      </div>
    );
  }

  // Componente de éxito
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-8xl mb-6">✅</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">¡Mensaje enviado!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Gracias por tu interés. Nos pondremos en contacto contigo muy pronto.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
          >
            Ver página nuevamente
          </button>
        </div>
      </div>
    );
  }

  // Componente principal
  return (
    <LandingRenderer 
      content={landing.content} 
      onSubmit={handleFormSubmit}
    />
  );
} 