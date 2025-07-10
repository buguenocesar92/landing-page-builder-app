'use client';

import React, { useState } from 'react';
import { Eye, Download, Palette, Type, Image, Zap, TrendingUp } from 'lucide-react';
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
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Zap className="h-5 w-5 text-blue-600" />
          <h4 className="font-medium text-blue-900">Animaciones Activas</h4>
        </div>
        <p className="text-sm text-blue-700">
          Las animaciones se aplican cuando el usuario hace scroll hasta cada sección. 
          Actualiza la página para ver los cambios.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Estilo de Animaciones</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {animationOptions.map((anim, index) => (
            <button
              key={index}
              onClick={() => {
                // Actualizar múltiples configuraciones de animación
                updateTemplate('animations.hero.type', anim.type);
                updateTemplate('animations.hero.duration', anim.duration);
                updateTemplate('animations.hero.delay', 0.2);
                updateTemplate('animations.features.type', anim.type);
                updateTemplate('animations.features.duration', anim.duration);
                updateTemplate('animations.features.delay', 0.1);
                updateTemplate('animations.cta.type', anim.type);
                updateTemplate('animations.cta.duration', anim.duration);
                updateTemplate('animations.cta.delay', 0.3);
                
                // Mostrar feedback visual
                console.log('Animación aplicada:', anim.name, anim.type);
              }}
              className={`p-4 border rounded-lg hover:shadow-md transition-shadow text-left ${
                template.animations?.hero?.type === anim.type 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Zap className={`h-5 w-5 ${
                  template.animations?.hero?.type === anim.type 
                    ? 'text-blue-600' 
                    : 'text-gray-400'
                }`} />
                <span className="font-medium">{anim.name}</span>
                {template.animations?.hero?.type === anim.type && (
                  <div className="ml-auto">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Activo
                    </span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600">
                {anim.type} - {anim.duration}s
              </p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Efectos Especiales</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <Type className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-900">
                  Efecto de escritura en el título
                </label>
                <p className="text-sm text-gray-500">
                  Texto que se escribe automáticamente
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={template.animations?.typing_effect?.enabled || false}
                onChange={(e) => {
                  updateTemplate('animations.typing_effect.enabled', e.target.checked);
                  if (e.target.checked) {
                    updateTemplate('animations.typing_effect.texts', [
                      'Innovación Digital',
                      'Soluciones Creativas',
                      'Tecnología Avanzada'
                    ]);
                    updateTemplate('animations.typing_effect.speed', 100);
                  }
                }}
                className="sr-only"
              />
              <div className="relative">
                <div className={`block w-14 h-8 rounded-full ${
                  template.animations?.typing_effect?.enabled 
                    ? 'bg-blue-600' 
                    : 'bg-gray-200'
                }`}></div>
                <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                  template.animations?.typing_effect?.enabled 
                    ? 'transform translate-x-6' 
                    : ''
                }`}></div>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-900">
                  Contadores animados
                </label>
                <p className="text-sm text-gray-500">
                  Números que cuentan hasta el valor final
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={template.animations?.counter?.enabled || false}
                onChange={(e) => {
                  updateTemplate('animations.counter.enabled', e.target.checked);
                  if (e.target.checked) {
                    updateTemplate('animations.counter.duration', 2.0);
                  }
                }}
                className="sr-only"
              />
              <div className="relative">
                <div className={`block w-14 h-8 rounded-full ${
                  template.animations?.counter?.enabled 
                    ? 'bg-green-600' 
                    : 'bg-gray-200'
                }`}></div>
                <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                  template.animations?.counter?.enabled 
                    ? 'transform translate-x-6' 
                    : ''
                }`}></div>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <Image className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-900">
                  Efecto parallax en imágenes
                </label>
                <p className="text-sm text-gray-500">
                  Movimiento suave de fondo al hacer scroll
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={template.animations?.parallax?.enabled || false}
                onChange={(e) => {
                  updateTemplate('animations.parallax.enabled', e.target.checked);
                  if (e.target.checked) {
                    updateTemplate('animations.parallax.speed', 0.5);
                  }
                }}
                className="sr-only"
              />
              <div className="relative">
                <div className={`block w-14 h-8 rounded-full ${
                  template.animations?.parallax?.enabled 
                    ? 'bg-indigo-600' 
                    : 'bg-gray-200'
                }`}></div>
                <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                  template.animations?.parallax?.enabled 
                    ? 'transform translate-x-6' 
                    : ''
                }`}></div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <svg className="h-5 w-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <h4 className="font-medium text-yellow-900">Consejo</h4>
        </div>
        <p className="text-sm text-yellow-700">
          Para ver las animaciones funcionando, actualiza la página y haz scroll lentamente. 
          Las animaciones se activan cuando cada sección entra en el viewport.
        </p>
      </div>
    </div>
  );

  const renderContentTab = () => (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
          Sección Principal (Hero)
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-semibold mb-3">Imagen de Fondo</h4>
            <div className="space-y-3">
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
                <div className="text-xs text-gray-500 mt-1">
                  Oscuridad: {Math.round(parseFloat(template.hero?.background?.overlay?.replace('rgba(0,0,0,', '').replace(')', '') || '0.4') * 100)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
          Características/Features
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Título de la Sección</label>
              <input
                type="text"
                value={template.features?.title || ''}
                onChange={(e) => updateTemplate('features.title', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Características Destacadas"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subtítulo</label>
              <input
                type="text"
                value={template.features?.subtitle || ''}
                onChange={(e) => updateTemplate('features.subtitle', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Todo lo que necesitas para hacer crecer tu negocio"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Características Individuales</label>
            {template.features?.items?.map((feature: any, index: number) => (
              <div key={index} className="border rounded-lg p-3 mb-3 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-1">Título</label>
                    <input
                      type="text"
                      value={feature.title || ''}
                      onChange={(e) => updateTemplate(`features.items.${index}.title`, e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm"
                      placeholder="Título de la característica"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Icono</label>
                    <select
                      value={feature.icon || 'zap'}
                      onChange={(e) => updateTemplate(`features.items.${index}.icon`, e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm"
                    >
                      <option value="zap">⚡ Zap</option>
                      <option value="shield">🛡️ Shield</option>
                      <option value="trending-up">📈 Trending Up</option>
                      <option value="heart">❤️ Heart</option>
                      <option value="award">🏆 Award</option>
                      <option value="check-circle">✅ Check</option>
                    </select>
                  </div>
                </div>
                <div className="mt-2">
                  <label className="block text-xs font-medium mb-1">Descripción</label>
                  <textarea
                    value={feature.description || ''}
                    onChange={(e) => updateTemplate(`features.items.${index}.description`, e.target.value)}
                    className="w-full px-2 py-1 border rounded text-sm"
                    rows={2}
                    placeholder="Descripción de la característica"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
          Estadísticas/Números
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Título de la Sección</label>
            <input
              type="text"
              value={template.stats?.title || ''}
              onChange={(e) => updateTemplate('stats.title', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Números que Hablan"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Estadísticas</label>
            {template.stats?.items?.map((stat: any, index: number) => (
              <div key={index} className="border rounded-lg p-3 mb-3 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-1">Número</label>
                    <input
                      type="number"
                      value={stat.number || stat.value || ''}
                      onChange={(e) => updateTemplate(`stats.items.${index}.number`, parseInt(e.target.value))}
                      className="w-full px-2 py-1 border rounded text-sm"
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Sufijo</label>
                    <input
                      type="text"
                      value={stat.suffix || ''}
                      onChange={(e) => updateTemplate(`stats.items.${index}.suffix`, e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm"
                      placeholder="+, %, K, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Etiqueta</label>
                    <input
                      type="text"
                      value={stat.label || ''}
                      onChange={(e) => updateTemplate(`stats.items.${index}.label`, e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm"
                      placeholder="Clientes Felices"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
          Testimonios
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Título de la Sección</label>
            <input
              type="text"
              value={template.testimonials?.title || ''}
              onChange={(e) => updateTemplate('testimonials.title', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Lo que Dicen Nuestros Clientes"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Testimonios</label>
            {template.testimonials?.items?.map((testimonial: any, index: number) => (
              <div key={index} className="border rounded-lg p-3 mb-3 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-1">Nombre</label>
                    <input
                      type="text"
                      value={testimonial.name || ''}
                      onChange={(e) => updateTemplate(`testimonials.items.${index}.name`, e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm"
                      placeholder="María González"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Cargo/Posición</label>
                    <input
                      type="text"
                      value={testimonial.position || testimonial.role || ''}
                      onChange={(e) => updateTemplate(`testimonials.items.${index}.position`, e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm"
                      placeholder="CEO, Empresa"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <label className="block text-xs font-medium mb-1">Testimonio</label>
                  <textarea
                    value={testimonial.content || testimonial.comment || ''}
                    onChange={(e) => updateTemplate(`testimonials.items.${index}.content`, e.target.value)}
                    className="w-full px-2 py-1 border rounded text-sm"
                    rows={3}
                    placeholder="Excelente servicio, muy recomendable..."
                  />
                </div>
                <div className="mt-2">
                  <label className="block text-xs font-medium mb-1">Calificación (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={testimonial.rating || 5}
                    onChange={(e) => updateTemplate(`testimonials.items.${index}.rating`, parseInt(e.target.value))}
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      {template.pricing && (
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
            Precios/Planes
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Título de la Sección</label>
                <input
                  type="text"
                  value={template.pricing?.title || ''}
                  onChange={(e) => updateTemplate('pricing.title', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Planes Flexibles"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subtítulo</label>
                <input
                  type="text"
                  value={template.pricing?.subtitle || ''}
                  onChange={(e) => updateTemplate('pricing.subtitle', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Elige el plan perfecto para ti"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Planes</label>
              {template.pricing?.plans?.map((plan: any, index: number) => (
                <div key={index} className="border rounded-lg p-3 mb-3 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">Nombre del Plan</label>
                      <input
                        type="text"
                        value={plan.name || ''}
                        onChange={(e) => updateTemplate(`pricing.plans.${index}.name`, e.target.value)}
                        className="w-full px-2 py-1 border rounded text-sm"
                        placeholder="Básico"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Precio</label>
                      <input
                        type="text"
                        value={plan.price || ''}
                        onChange={(e) => updateTemplate(`pricing.plans.${index}.price`, e.target.value)}
                        className="w-full px-2 py-1 border rounded text-sm"
                        placeholder="29"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Período</label>
                      <input
                        type="text"
                        value={plan.period || ''}
                        onChange={(e) => updateTemplate(`pricing.plans.${index}.period`, e.target.value)}
                        className="w-full px-2 py-1 border rounded text-sm"
                        placeholder="mes"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="block text-xs font-medium mb-1">Texto del Botón</label>
                    <input
                      type="text"
                      value={plan.cta_text || ''}
                      onChange={(e) => updateTemplate(`pricing.plans.${index}.cta_text`, e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm"
                      placeholder="Comenzar Ahora"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Form Section */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
          Formulario de Contacto
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Título del Formulario</label>
              <input
                type="text"
                value={template.form?.title || ''}
                onChange={(e) => updateTemplate('form.title', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Contáctanos"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subtítulo</label>
              <input
                type="text"
                value={template.form?.subtitle || ''}
                onChange={(e) => updateTemplate('form.subtitle', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Nos pondremos en contacto contigo"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Texto del Botón</label>
            <input
              type="text"
              value={template.form?.cta_text || ''}
              onChange={(e) => updateTemplate('form.cta_text', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enviar Mensaje"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Texto de Privacidad</label>
            <textarea
              value={template.form?.privacy_text || ''}
              onChange={(e) => updateTemplate('form.privacy_text', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              rows={2}
              placeholder="Respetamos tu privacidad y no compartiremos tu información."
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
                                ${template.features?.items?.map((feature: any, index: number) => `
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
                                ${template.stats?.items?.map((stat: any, index: number) => `
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
                                ${template.testimonials?.items?.map((testimonial: any, index: number) => `
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
                                ${template.pricing?.plans?.map((plan: any, index: number) => `
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
                                      ${plan.features?.map((feature: any) => `
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
                                  ${template.form?.fields?.map((field: any) => `
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
                                ${template.social_proof.logos?.map((logo: any) => `
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