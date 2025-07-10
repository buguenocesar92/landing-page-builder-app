'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import apiService from '@/lib/api';
import { Rocket, Mail, User, Phone, MessageSquare, Send, CheckCircle } from 'lucide-react';
import type { Landing } from '@/types';

export default function PublicLandingPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [landing, setLanding] = useState<Landing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!landing || !formData.name.trim() || !formData.email.trim()) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    try {
      setSubmitting(true);
      
      const leadData = {
        landing_id: landing.id,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        message: formData.message.trim() || undefined,
      };

      const response = await apiService.submitLead(leadData);
      
      if (response.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        alert('Error al enviar el formulario: ' + response.message);
      }
    } catch (err: any) {
      console.error('Error submitting lead:', err);
      alert('Error al enviar el formulario');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error || !landing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Página no encontrada</h1>
          <p className="text-gray-600">La landing page que buscas no existe o ha sido eliminada.</p>
        </div>
      </div>
    );
  }

  const content = landing.content || {};
  const colors = content.colors || { primary: '#3b82f6', secondary: '#1e40af' };
  const formFields = content.form?.fields || ['name', 'email'];

  return (
    <div 
      className="min-h-screen"
      style={{
        background: `linear-gradient(135deg, ${colors.primary}15, ${colors.secondary}15)`
      }}
    >
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Rocket 
              className="h-16 w-16 mx-auto mb-6" 
              style={{ color: colors.primary }}
            />
          </div>
          
          <h1 
            className="text-4xl md:text-6xl font-extrabold mb-6"
            style={{ color: colors.secondary }}
          >
            {content.title || landing.title}
          </h1>
          
          {content.subtitle && (
            <h2 className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {content.subtitle}
            </h2>
          )}
          
          {content.description && (
            <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
              {content.description}
            </p>
          )}
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {submitted ? (
            // Success Message
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Gracias por tu interés!
              </h3>
              <p className="text-gray-600 mb-6">
                Hemos recibido tu información. Te contactaremos pronto.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Enviar otra consulta
              </button>
            </div>
          ) : (
            // Contact Form
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {content.cta_text || '¡Contáctanos!'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {formFields.includes('name') && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                  </div>
                )}

                {formFields.includes('email') && (
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                )}

                {formFields.includes('phone') && (
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="+1234567890"
                      />
                    </div>
                  </div>
                )}

                {formFields.includes('message') && (
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensaje
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Cuéntanos más sobre tu interés..."
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full text-white px-6 py-3 rounded-md font-medium flex items-center justify-center hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: colors.primary }}
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      {content.cta_text || 'Enviar'}
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 {content.title || landing.title}. Powered by Landing Page Builder.
          </p>
        </div>
      </footer>
    </div>
  );
} 