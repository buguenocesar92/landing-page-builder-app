'use client';

import React, { useState } from 'react';
import { Eye, Download, Palette, Type, Image, Zap } from 'lucide-react';
import LandingRenderer from './LandingRenderer';

interface TemplateCustomizerProps {
  initialTemplate: any;
  onSave?: (customizedTemplate: any) => void;
}

const TemplateCustomizer: React.FC<TemplateCustomizerProps> = ({ initialTemplate, onSave }) => {
  // Asegurar que el template inicial tenga una estructura completa
  const [template, setTemplate] = useState(() => {
    const defaultTemplate = {
      colors: {
        primary: '#3b82f6',
        secondary: '#1e40af',
        accent: '#fbbf24',
        background: '#ffffff',
        text: '#1f2937'
      },
      fonts: {
        heading: 'Inter',
        body: 'Inter'
      },
      animations: {
        hero: { type: 'fadeInUp', duration: 1.0 },
        features: { type: 'fadeInUp', duration: 1.0 },
        typing_effect: { enabled: false }
      },
      hero: {
        title: 'Automatiza tu Negocio con IA',
        subtitle: 'La plataforma más avanzada para gestionar tu empresa',
        description: 'Aumenta tu productividad en un 300% con nuestras herramientas de automatización basadas en inteligencia artificial.',
        cta_text: 'Prueba Gratis por 14 Días',
        background: {
          type: 'gradient',
          colors: ['#667eea', '#764ba2']
        }
      },
      features: {
        title: 'Características Destacadas',
        subtitle: 'Todo lo que necesitas para hacer crecer tu negocio',
        items: [
          {
            title: 'IA Avanzada',
            description: 'Automatización inteligente que aprende de tus procesos',
            icon: 'zap',
            image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop'
          },
          {
            title: 'Seguridad Total',
            description: 'Protección de datos con encriptación de nivel empresarial',
            icon: 'shield',
            image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&h=300&fit=crop'
          },
          {
            title: 'Analytics Avanzados',
            description: 'Insights detallados para tomar mejores decisiones',
            icon: 'trending-up',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop'
          }
        ]
      },
      stats: {
        title: 'Números que Hablan',
        items: [
          { value: 10000, suffix: '+', label: 'Empresas Confiaron' },
          { value: 99, suffix: '%', label: 'Uptime Garantizado' },
          { value: 300, suffix: '%', label: 'Aumento Productividad' },
          { value: 24, suffix: '/7', label: 'Soporte Técnico' }
        ]
      },
      testimonials: {
        title: 'Lo que Dicen Nuestros Clientes',
        items: [
          {
            name: 'María González',
            role: 'CEO, TechStart',
            comment: 'Increíble plataforma que transformó completamente nuestros procesos.',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b0c0?w=100&h=100&fit=crop&crop=face',
            rating: 5
          },
          {
            name: 'Carlos Rodríguez',
            role: 'Fundador, InnovateLab',
            comment: 'La mejor inversión que hemos hecho. ROI increíble en solo 3 meses.',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
            rating: 5
          }
        ]
      },
      pricing: {
        title: 'Planes Flexibles',
        subtitle: 'Elige el plan perfecto para tu negocio',
        plans: [
          {
            name: 'Starter',
            price: 29,
            period: 'mes',
            features: [
              'Hasta 1,000 automatizaciones/mes',
              'Soporte por email',
              'Dashboard básico',
              'Integraciones básicas'
            ],
            cta_text: 'Comenzar Gratis',
            popular: false
          },
          {
            name: 'Pro',
            price: 99,
            period: 'mes',
            features: [
              'Automatizaciones ilimitadas',
              'Soporte prioritario 24/7',
              'Analytics avanzados',
              'Todas las integraciones',
              'IA personalizada'
            ],
            cta_text: 'Probar Pro',
            popular: true
          },
          {
            name: 'Enterprise',
            price: 299,
            period: 'mes',
            features: [
              'Todo lo de Pro',
              'Infraestructura dedicada',
              'Soporte telefónico',
              'Consultoría personalizada',
              'SLA garantizado'
            ],
            cta_text: 'Contactar Ventas',
            popular: false
          }
        ]
      },
      form: {
        title: 'Comienza Tu Transformación Digital',
        subtitle: '¡Únete a miles de empresas que ya automatizaron su éxito!',
        cta_text: 'Comenzar Ahora',
        fields: [
          { name: 'name', label: 'Nombre Completo', type: 'text', required: true, icon: 'user' },
          { name: 'email', label: 'Correo Electrónico', type: 'email', required: true, icon: 'mail' },
          { name: 'company', label: 'Empresa', type: 'text', required: false, icon: 'building' },
          { name: 'phone', label: 'Teléfono', type: 'tel', required: false, icon: 'phone' },
          { name: 'message', label: 'Cuéntanos sobre tu proyecto', type: 'textarea', required: false, icon: 'message-square' }
        ],
        privacy_text: 'Al enviar este formulario, aceptas nuestros términos y condiciones.'
      },
      social_proof: {
        title: 'Empresas que confían en nosotros',
        logos: [
          'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop',
          'https://images.unsplash.com/photo-1611647832580-377268dba7cb?w=200&h=100&fit=crop',
          'https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?w=200&h=100&fit=crop'
        ]
      },
      ...initialTemplate
    };
    return defaultTemplate;
  });
  
  const [activeTab, setActiveTab] = useState('colors');

  const updateTemplate = (path: string, value: any) => {
    const keys = path.split('.');
    const updated = JSON.parse(JSON.stringify(template));
    
    let current = updated;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    setTemplate(updated);
  };

  const updateColorPalette = (preset: { primary: string; secondary: string; accent: string }) => {
    const updated = JSON.parse(JSON.stringify(template));
    if (!updated.colors) updated.colors = {};
    updated.colors.primary = preset.primary;
    updated.colors.secondary = preset.secondary;
    updated.colors.accent = preset.accent;
    setTemplate(updated);
  };

  const updateFontPair = (pair: { heading: string; body: string }) => {
    const updated = JSON.parse(JSON.stringify(template));
    if (!updated.fonts) updated.fonts = {};
    updated.fonts.heading = pair.heading;
    updated.fonts.body = pair.body;
    setTemplate(updated);
  };

  const colorPresets = [
    { name: 'Tech Blue', primary: '#3b82f6', secondary: '#1e40af', accent: '#fbbf24' },
    { name: 'Elegant Black', primary: '#1f2937', secondary: '#111827', accent: '#d4af37' },
    { name: 'Nature Green', primary: '#10b981', secondary: '#047857', accent: '#f59e0b' },
    { name: 'Passion Red', primary: '#ef4444', secondary: '#dc2626', accent: '#fbbf24' },
    { name: 'Royal Purple', primary: '#8b5cf6', secondary: '#7c3aed', accent: '#f59e0b' },
  ];

  const fontPairs = [
    { name: 'Modern', heading: 'Inter', body: 'Inter' },
    { name: 'Elegant', heading: 'Playfair Display', body: 'Lato' },
    { name: 'Clean', heading: 'Montserrat', body: 'Open Sans' },
    { name: 'Classic', heading: 'Roboto', body: 'Source Sans Pro' },
    { name: 'Creative', heading: 'Poppins', body: 'Nunito' },
  ];

  const animationOptions = [
    { name: 'Suave', type: 'fadeInUp', duration: 0.8 },
    { name: 'Dinámico', type: 'slideInLeft', duration: 0.6 },
    { name: 'Energético', type: 'bounceIn', duration: 1.0 },
    { name: 'Elegante', type: 'staggeredFadeIn', duration: 1.2 },
  ];

  const renderColorTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Paletas Predefinidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {colorPresets.map((preset, index) => (
            <button
              key={index}
              onClick={() => updateColorPalette(preset)}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div 
                  className="w-6 h-6 rounded-full" 
                  style={{ backgroundColor: preset.primary }}
                />
                <div 
                  className="w-6 h-6 rounded-full" 
                  style={{ backgroundColor: preset.secondary }}
                />
                <div 
                  className="w-6 h-6 rounded-full" 
                  style={{ backgroundColor: preset.accent }}
                />
              </div>
              <p className="text-sm font-medium">{preset.name}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Personalización Manual</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Color Primario</label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={template.colors?.primary || '#3b82f6'}
                onChange={(e) => updateTemplate('colors.primary', e.target.value)}
                className="w-12 h-10 border rounded"
              />
              <input
                type="text"
                value={template.colors?.primary || '#3b82f6'}
                onChange={(e) => updateTemplate('colors.primary', e.target.value)}
                className="flex-1 px-3 py-2 border rounded-md"
                placeholder="#3b82f6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Color Secundario</label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={template.colors?.secondary || '#1e40af'}
                onChange={(e) => updateTemplate('colors.secondary', e.target.value)}
                className="w-12 h-10 border rounded"
              />
              <input
                type="text"
                value={template.colors?.secondary || '#1e40af'}
                onChange={(e) => updateTemplate('colors.secondary', e.target.value)}
                className="flex-1 px-3 py-2 border rounded-md"
                placeholder="#1e40af"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Color de Acento</label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={template.colors?.accent || '#fbbf24'}
                onChange={(e) => updateTemplate('colors.accent', e.target.value)}
                className="w-12 h-10 border rounded"
              />
              <input
                type="text"
                value={template.colors?.accent || '#fbbf24'}
                onChange={(e) => updateTemplate('colors.accent', e.target.value)}
                className="flex-1 px-3 py-2 border rounded-md"
                placeholder="#fbbf24"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFontsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Combinaciones de Fuentes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fontPairs.map((pair, index) => (
            <button
              key={index}
              onClick={() => updateFontPair(pair)}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow text-left"
            >
              <div className="mb-2">
                <p 
                  className="text-lg font-bold"
                  style={{ fontFamily: pair.heading }}
                >
                  Título Principal
                </p>
                <p 
                  className="text-sm text-gray-600"
                  style={{ fontFamily: pair.body }}
                >
                  Este es el texto del cuerpo que explica el contenido.
                </p>
              </div>
              <p className="text-xs font-medium text-gray-500">{pair.name}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Fuentes Personalizadas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Fuente para Títulos</label>
            <select
              value={template.fonts?.heading || 'Inter'}
              onChange={(e) => updateTemplate('fonts.heading', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="Inter">Inter</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Playfair Display">Playfair Display</option>
              <option value="Roboto">Roboto</option>
              <option value="Poppins">Poppins</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Fuente para Texto</label>
            <select
              value={template.fonts?.body || 'Inter'}
              onChange={(e) => updateTemplate('fonts.body', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="Inter">Inter</option>
              <option value="Lato">Lato</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Source Sans Pro">Source Sans Pro</option>
              <option value="Nunito">Nunito</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnimationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Estilo de Animaciones</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {animationOptions.map((anim, index) => (
            <button
              key={index}
              onClick={() => {
                updateTemplate('animations.hero.type', anim.type);
                updateTemplate('animations.hero.duration', anim.duration);
                updateTemplate('animations.features.type', anim.type);
                updateTemplate('animations.features.duration', anim.duration);
              }}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-5 w-5 text-indigo-600" />
                <span className="font-medium">{anim.name}</span>
              </div>
              <p className="text-sm text-gray-600">
                {anim.type} - {anim.duration}s
              </p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Configuración Avanzada</h3>
        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={template.animations?.typing_effect?.enabled || false}
                onChange={(e) => updateTemplate('animations.typing_effect.enabled', e.target.checked)}
                className="rounded"
              />
              <span>Efecto de escritura en el título</span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={template.animations?.counter?.enabled || false}
                onChange={(e) => updateTemplate('animations.counter.enabled', e.target.checked)}
                className="rounded"
              />
              <span>Contadores animados</span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={template.animations?.parallax?.enabled || false}
                onChange={(e) => updateTemplate('animations.parallax.enabled', e.target.checked)}
                className="rounded"
              />
              <span>Efecto parallax en imágenes</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContentTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Contenido Principal</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Título Principal</label>
            <input
              type="text"
              value={template.hero?.title || ''}
              onChange={(e) => updateTemplate('hero.title', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Tu título impactante aquí"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subtítulo</label>
            <input
              type="text"
              value={template.hero?.subtitle || ''}
              onChange={(e) => updateTemplate('hero.subtitle', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Subtítulo explicativo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Descripción</label>
            <textarea
              value={template.hero?.description || ''}
              onChange={(e) => updateTemplate('hero.description', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
              placeholder="Descripción detallada de tu propuesta de valor"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Texto del Botón</label>
            <input
              type="text"
              value={template.hero?.cta_text || ''}
              onChange={(e) => updateTemplate('hero.cta_text', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Comenzar Ahora"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Imagen de Fondo</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">URL de la Imagen</label>
            <input
              type="url"
              value={template.hero?.background?.url || ''}
              onChange={(e) => updateTemplate('hero.background.url', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="https://images.unsplash.com/photo-..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Overlay (Transparencia)</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={parseFloat(template.hero?.background?.overlay?.replace('rgba(0,0,0,', '').replace(')', '') || '0.4')}
              onChange={(e) => updateTemplate('hero.background.overlay', `rgba(0,0,0,${e.target.value})`)}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'colors', name: 'Colores', icon: Palette },
    { id: 'fonts', name: 'Fuentes', icon: Type },
    { id: 'animations', name: 'Animaciones', icon: Zap },
    { id: 'content', name: 'Contenido', icon: Image },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="border-b bg-gray-50 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Personalizar Template
            </h2>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  // Crear una vista previa completa con todas las secciones
                  const previewWindow = window.open('', '_blank', 'width=1200,height=800');
                  if (previewWindow) {
                    const htmlContent = `
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <title>Vista Previa - Template</title>
                          <meta charset="UTF-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <script src="https://cdn.tailwindcss.com"></script>
                          <link href="https://fonts.googleapis.com/css2?family=${template.fonts?.heading?.replace(' ', '+')}:wght@400;500;600;700;800;900&family=${template.fonts?.body?.replace(' ', '+')}:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
                          <style>
                            body { 
                              margin: 0; 
                              padding: 0; 
                              font-family: '${template.fonts?.body || 'Inter'}', sans-serif; 
                              line-height: 1.6;
                            }
                            h1, h2, h3, h4, h5, h6 { 
                              font-family: '${template.fonts?.heading || 'Inter'}', sans-serif; 
                              margin: 0;
                            }
                            .primary-color { color: ${template.colors?.primary || '#3b82f6'}; }
                            .secondary-color { color: ${template.colors?.secondary || '#1e40af'}; }
                            .accent-color { color: ${template.colors?.accent || '#fbbf24'}; }
                            .text-color { color: ${template.colors?.text || '#1f2937'}; }
                            .bg-primary { background-color: ${template.colors?.primary || '#3b82f6'}; }
                            .bg-secondary { background-color: ${template.colors?.secondary || '#1e40af'}; }
                            .bg-accent { background-color: ${template.colors?.accent || '#fbbf24'}; }
                            .bg-background { background-color: ${template.colors?.background || '#ffffff'}; }
                          </style>
                        </head>
                        <body>
                          <!-- Hero Section -->
                          <section class="min-h-screen flex items-center justify-center px-4" style="background: linear-gradient(135deg, ${template.colors?.primary || '#3b82f6'}, ${template.colors?.secondary || '#1e40af'});">
                            <div class="text-center text-white max-w-6xl mx-auto">
                              <h1 class="text-5xl md:text-7xl font-extrabold mb-6">
                                ${template.hero?.title || 'Tu Título Aquí'}
                              </h1>
                              <h2 class="text-2xl md:text-3xl mb-6 opacity-90">
                                ${template.hero?.subtitle || 'Subtítulo explicativo'}
                              </h2>
                              <p class="text-xl mb-8 max-w-3xl mx-auto opacity-80">
                                ${template.hero?.description || 'Descripción detallada de tu propuesta de valor'}
                              </p>
                              <button class="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg transition-all hover:scale-105" style="background-color: ${template.colors?.accent || '#fbbf24'}; color: white;">
                                ${template.hero?.cta_text || 'Comenzar Ahora'}
                              </button>
                            </div>
                          </section>

                          <!-- Features Section -->
                          <section class="py-20 px-4" style="background-color: ${template.colors?.background || '#ffffff'};">
                            <div class="max-w-6xl mx-auto">
                              <div class="text-center mb-16">
                                <h2 class="text-4xl md:text-5xl font-bold mb-6 text-color">
                                  ${template.features?.title || 'Características Destacadas'}
                                </h2>
                                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                                  ${template.features?.subtitle || 'Todo lo que necesitas para hacer crecer tu negocio'}
                                </p>
                              </div>
                              <div class="grid md:grid-cols-3 gap-8">
                                ${template.features?.items?.map((feature, index) => `
                                  <div class="bg-white rounded-xl p-8 shadow-lg">
                                    <div class="flex items-center mb-4">
                                      <div class="p-3 rounded-lg mr-4" style="background-color: ${template.colors?.primary}20;">
                                        <div class="w-6 h-6 primary-color">⚡</div>
                                      </div>
                                      <h3 class="text-xl font-bold text-color">${feature.title}</h3>
                                    </div>
                                    <p class="text-gray-600">${feature.description}</p>
                                  </div>
                                `).join('') || '<div class="text-center text-gray-500">No hay características definidas</div>'}
                              </div>
                            </div>
                          </section>

                          <!-- Stats Section -->
                          <section class="py-20 px-4 bg-gray-50">
                            <div class="max-w-6xl mx-auto">
                              <div class="text-center mb-16">
                                <h2 class="text-4xl md:text-5xl font-bold mb-6 text-color">
                                  ${template.stats?.title || 'Números que Hablan'}
                                </h2>
                              </div>
                              <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                                ${template.stats?.items?.map((stat, index) => `
                                  <div class="text-center">
                                    <div class="text-4xl font-bold primary-color mb-2">
                                      ${stat.value}${stat.suffix || ''}
                                    </div>
                                    <p class="text-gray-600">${stat.label}</p>
                                  </div>
                                `).join('') || '<div class="text-center text-gray-500">No hay estadísticas definidas</div>'}
                              </div>
                            </div>
                          </section>

                          <!-- Testimonials Section -->
                          <section class="py-20 px-4" style="background-color: ${template.colors?.background || '#ffffff'};">
                            <div class="max-w-6xl mx-auto">
                              <div class="text-center mb-16">
                                <h2 class="text-4xl md:text-5xl font-bold mb-6 text-color">
                                  ${template.testimonials?.title || 'Lo que Dicen Nuestros Clientes'}
                                </h2>
                              </div>
                              <div class="grid md:grid-cols-2 gap-8">
                                ${template.testimonials?.items?.map((testimonial, index) => `
                                  <div class="bg-white rounded-xl p-8 shadow-lg">
                                    <div class="flex items-center mb-4">
                                      <div class="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                                      <div>
                                        <h4 class="font-bold text-color">${testimonial.name}</h4>
                                        <p class="text-sm text-gray-600">${testimonial.role}</p>
                                      </div>
                                    </div>
                                    <p class="text-gray-600">"${testimonial.comment}"</p>
                                    <div class="flex text-yellow-400 mt-4">
                                      ${'★'.repeat(testimonial.rating || 5)}
                                    </div>
                                  </div>
                                `).join('') || '<div class="text-center text-gray-500">No hay testimoniales definidos</div>'}
                              </div>
                            </div>
                          </section>

                          <!-- Pricing Section -->
                          <section class="py-20 px-4 bg-gray-50">
                            <div class="max-w-6xl mx-auto">
                              <div class="text-center mb-16">
                                <h2 class="text-4xl md:text-5xl font-bold mb-6 text-color">
                                  ${template.pricing?.title || 'Planes Flexibles'}
                                </h2>
                                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                                  ${template.pricing?.subtitle || 'Elige el plan perfecto para tu negocio'}
                                </p>
                              </div>
                              <div class="grid md:grid-cols-3 gap-8">
                                ${template.pricing?.plans?.map((plan, index) => `
                                  <div class="bg-white rounded-2xl p-8 shadow-lg ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}">
                                    ${plan.popular ? '<div class="text-center mb-4"><span class="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold">Más Popular</span></div>' : ''}
                                    <div class="text-center mb-8">
                                      <h3 class="text-2xl font-bold mb-4 text-color">${plan.name}</h3>
                                      <div class="mb-4">
                                        <span class="text-5xl font-bold primary-color">$${plan.price}</span>
                                        <span class="text-gray-600">/${plan.period}</span>
                                      </div>
                                    </div>
                                    <ul class="space-y-4 mb-8">
                                      ${plan.features?.map(feature => `
                                        <li class="flex items-start">
                                          <span class="text-green-500 mr-3">✓</span>
                                          <span class="text-gray-700">${feature}</span>
                                        </li>
                                      `).join('') || ''}
                                    </ul>
                                    <button class="w-full py-3 px-6 rounded-lg font-semibold ${plan.popular ? 'text-white' : 'border-2'}" style="background-color: ${plan.popular ? template.colors?.primary : 'transparent'}; border-color: ${template.colors?.primary}; color: ${plan.popular ? 'white' : template.colors?.primary};">
                                      ${plan.cta_text}
                                    </button>
                                  </div>
                                `).join('') || '<div class="text-center text-gray-500">No hay planes definidos</div>'}
                              </div>
                            </div>
                          </section>

                          <!-- Form Section -->
                          <section class="py-20 px-4" style="background-color: ${template.colors?.primary || '#3b82f6'};">
                            <div class="max-w-2xl mx-auto">
                              <div class="text-center mb-12">
                                <h2 class="text-4xl md:text-5xl font-bold mb-6 text-white">
                                  ${template.form?.title || 'Comienza Tu Transformación Digital'}
                                </h2>
                                <p class="text-xl text-white opacity-90">
                                  ${template.form?.subtitle || '¡Únete a miles de empresas que ya automatizaron su éxito!'}
                                </p>
                              </div>
                              <div class="bg-white rounded-xl p-8 shadow-2xl">
                                <div class="grid gap-6">
                                  ${template.form?.fields?.map(field => `
                                    <div>
                                      <label class="block text-sm font-medium mb-2 text-color">
                                        ${field.label} ${field.required ? '<span class="text-red-500">*</span>' : ''}
                                      </label>
                                      ${field.type === 'textarea' ? 
                                        `<textarea class="w-full px-3 py-2 border border-gray-300 rounded-lg" rows="4" placeholder="${field.label}"></textarea>` :
                                        `<input type="${field.type}" class="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="${field.label}">`
                                      }
                                    </div>
                                  `).join('') || '<div class="text-center text-gray-500">No hay campos definidos</div>'}
                                </div>
                                <button class="w-full mt-8 py-4 px-6 rounded-lg font-semibold text-lg text-white" style="background-color: ${template.colors?.accent || '#fbbf24'};">
                                  ${template.form?.cta_text || 'Comenzar Ahora'}
                                </button>
                                ${template.form?.privacy_text ? `<p class="text-sm text-gray-600 mt-4 text-center">${template.form.privacy_text}</p>` : ''}
                              </div>
                            </div>
                          </section>

                          <!-- Social Proof Section -->
                          ${template.social_proof ? `
                          <section class="py-16 px-4 bg-gray-50">
                            <div class="max-w-6xl mx-auto text-center">
                              <h3 class="text-lg font-medium text-gray-600 mb-8">
                                ${template.social_proof.title}
                              </h3>
                              <div class="flex justify-center items-center space-x-8 opacity-60">
                                ${template.social_proof.logos?.map(logo => `
                                  <div class="relative h-12 w-32 bg-gray-200 rounded"></div>
                                `).join('') || ''}
                              </div>
                            </div>
                          </section>
                          ` : ''}

                          <script>
                            // Agregar interactividad básica
                            document.querySelectorAll('button').forEach(button => {
                              button.addEventListener('click', function() {
                                alert('Esta es una vista previa. Los botones no son funcionales.');
                              });
                            });

                            // Efectos de hover
                            document.querySelectorAll('.shadow-lg').forEach(element => {
                              element.addEventListener('mouseenter', function() {
                                this.style.transform = 'translateY(-4px)';
                                this.style.transition = 'transform 0.3s ease';
                              });
                              element.addEventListener('mouseleave', function() {
                                this.style.transform = 'translateY(0)';
                              });
                            });
                          </script>
                        </body>
                      </html>
                    `;
                    
                    previewWindow.document.write(htmlContent);
                    previewWindow.document.close();
                  }
                }}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                <Eye className="h-4 w-4 mr-2" />
                Vista Previa
              </button>
              <button
                onClick={() => onSave?.(template)}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Guardar
              </button>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar con tabs */}
          <div className="w-64 bg-gray-50 border-r">
            <nav className="p-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 rounded-md text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-3" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Contenido principal */}
          <div className="flex-1 p-6">
            {activeTab === 'colors' && renderColorTab()}
            {activeTab === 'fonts' && renderFontsTab()}
            {activeTab === 'animations' && renderAnimationsTab()}
            {activeTab === 'content' && renderContentTab()}
          </div>
        </div>
      </div>

      {/* Preview en tiempo real */}
      <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">Vista Previa en Tiempo Real</h3>
          <div className="flex items-center space-x-3">
            <div className="text-sm text-gray-600">
              ⬇️ Scroll para ver todas las secciones
            </div>
            <div className="text-xs text-gray-500 px-2 py-1 bg-gray-200 rounded">
              Colores: {template.colors?.primary || 'N/A'}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4">
          <div className="max-h-[800px] overflow-y-auto border-4 border-gray-300 rounded-lg bg-white shadow-inner">
            <div className="transform scale-50 origin-top-left" style={{ width: '200%' }}>
              <div key={`${template.colors?.primary}-${template.colors?.secondary}-${template.colors?.accent}-${template.fonts?.heading}-${template.fonts?.body}`}>
                <LandingRenderer content={template} />
              </div>
            </div>
          </div>
          <div className="mt-2 text-center">
            <p className="text-xs text-gray-500">
              Vista escalada al 50% - Las secciones incluyen: Hero, Características, Estadísticas, Testimoniales, Precios, Formulario y Social Proof
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCustomizer; 