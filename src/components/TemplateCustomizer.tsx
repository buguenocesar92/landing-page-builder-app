'use client';

import React, { useState, useRef } from 'react';
import { Eye, Download, Palette, Type, Image, Zap, TrendingUp, RefreshCw, ShoppingCart, Plus, Edit, Trash2, Move, DollarSign } from 'lucide-react';

interface TemplateCustomizerProps {
  initialTemplate: any;
  onSave?: (customizedTemplate: any, showSuccessMessage?: boolean) => void;
  landingSlug?: string; // Slug de la landing page para el iframe
}

const TemplateCustomizer: React.FC<TemplateCustomizerProps> = ({ initialTemplate, onSave, landingSlug }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [initialValues, setInitialValues] = useState<any>(null);
  
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
  const [previewMode, setPreviewMode] = useState<'scaled' | 'tablet' | 'mobile'>('scaled');
  
  const updateTemplate = (path: string, value: any) => {
    console.log('🔧 updateTemplate llamado:', { path, value });
    
    const keys = path.split('.');
    const updated = JSON.parse(JSON.stringify(template));
    
    let current = updated;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    console.log('🎯 Template antes:', template);
    setTemplate(updated);
    console.log('✅ Template después:', updated);
    
    // Forzar auto-save inmediato para cambios críticos
    if (landingSlug && path.includes('animations')) {
      console.log('🚀 Forzando auto-save inmediato para animaciones');
      setTimeout(() => {
        if (onSave) {
          onSave(updated, false);
          setTimeout(() => {
            if (iframeRef.current) {
              const timestamp = new Date().getTime();
              iframeRef.current.src = `/l/${landingSlug}?t=${timestamp}`;
              console.log('🔄 Iframe refrescado con timestamp:', timestamp);
            }
          }, 500);
        }
      }, 100);
    }
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

  const getPreviewConfig = () => {
    switch (previewMode) {
      case 'scaled':
        return {
          container: { 
            width: '100%', 
            height: '700px', 
            overflow: 'hidden', 
            position: 'relative' as const,
            border: '2px solid #e5e7eb',
            borderRadius: '8px'
          },
          iframe: { 
            width: '100%', 
            height: '700px', 
            border: 'none'
          },
          title: '🖥️ Vista Desktop',
          description: 'Vista desktop real - Sin scroll doble'
        };
      case 'tablet':
        return {
          container: { width: '768px', height: '650px', overflow: 'hidden', border: '2px solid #e5e7eb' },
          iframe: { width: '768px', height: '1024px' },
          title: '📱 Vista Tablet',
          description: 'Vista de tablet (768x1024) - Scroll natural'
        };
      case 'mobile':
        return {
          container: { width: '375px', height: '650px', overflow: 'hidden', border: '2px solid #e5e7eb' },
          iframe: { width: '375px', height: '812px' },
          title: '📱 Vista Mobile',
          description: 'Vista móvil (375x812) - Scroll natural'
        };
      default:
        return getPreviewConfig();
    }
  };

  const refreshIframe = async (shouldSave: boolean = false, showSuccessMessage: boolean = false) => {
    console.log('🔄 refreshIframe llamado:', { shouldSave, showSuccessMessage, landingSlug, hasIframe: !!iframeRef.current });
    
    if (!iframeRef.current || !landingSlug) {
      console.log('❌ No se puede refrescar: falta iframe o landingSlug');
      return;
    }
    
    setIsRefreshing(true);
    console.log('⏳ Iniciando proceso de refresh...');
    
    try {
      // Solo guardamos si se solicita explícitamente
      if (shouldSave && onSave) {
        console.log('💾 Guardando cambios en la base de datos...');
        await onSave(template, showSuccessMessage);
        console.log('✅ Cambios guardados exitosamente');
        // Esperamos un poco para que se guarden los cambios
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      // Refrescamos el iframe con timestamp para evitar caché
      const iframe = iframeRef.current;
      const timestamp = new Date().getTime();
      const newSrc = `/l/${landingSlug}?t=${timestamp}`;
      
      console.log('🔄 Refrescando iframe:', { 
        oldSrc: iframe.src, 
        newSrc,
        timestamp 
      });
      
      iframe.src = newSrc;
      console.log('✅ Iframe refrescado correctamente');
      
    } catch (error) {
      console.error('❌ Error al refrescar preview:', error);
    } finally {
      setTimeout(() => {
        setIsRefreshing(false);
        console.log('✅ Proceso de refresh completado');
      }, 1000);
    }
  };

  const handleRefreshClick = () => {
    refreshIframe(false, false); // Solo refrescar, no guardar
  };

  const handleSaveClick = async () => {
    if (onSave) {
      await onSave(template, true); // Guardar con mensaje de éxito
      // Después de guardar, refrescar el iframe
      setTimeout(() => refreshIframe(false, false), 300);
    }
  };

  // Efecto para marcar como inicializado después del primer render
  React.useEffect(() => {
    const timer = setTimeout(() => {
      // Capturar valores iniciales
      setInitialValues({
        primary: template.colors?.primary,
        secondary: template.colors?.secondary,
        heading: template.fonts?.heading,
        body: template.fonts?.body
      });
      setIsInitialized(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Auto-refresh cuando cambian colores o fuentes principales (solo después de inicialización)
  React.useEffect(() => {
    console.log('🎨 useEffect colores/fuentes ejecutado', {
      landingSlug,
      isInitialized,
      initialValues,
      currentColors: template.colors,
      currentFonts: template.fonts
    });

    if (landingSlug && isInitialized && initialValues) {
      // Verificar si realmente hubo cambios
      const hasChanges = 
        initialValues.primary !== template.colors?.primary ||
        initialValues.secondary !== template.colors?.secondary ||
        initialValues.heading !== template.fonts?.heading ||
        initialValues.body !== template.fonts?.body;
      
      console.log('🔍 Cambios detectados en colores/fuentes:', hasChanges);
      
      if (hasChanges) {
        console.log('⏰ Programando refresh por cambios en colores/fuentes');
        const timer = setTimeout(() => {
          console.log('🚀 Ejecutando refresh por colores/fuentes');
          refreshIframe(true, false); // Guardar automáticamente SIN mostrar mensaje
        }, 500);
        
        return () => {
          console.log('🧹 Cleanup timer colores/fuentes');
          clearTimeout(timer);
        };
      }
    }
  }, [template.colors?.primary, template.colors?.secondary, template.fonts?.heading, template.fonts?.body, isInitialized, initialValues]);

  // Auto-refresh para cambios en contenido (títulos, textos, etc.)
  React.useEffect(() => {
    if (landingSlug && isInitialized) {
      const timer = setTimeout(() => {
        refreshIframe(true, false); // Guardar cambios de contenido
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [template.hero?.title, template.hero?.subtitle, template.hero?.description, template.features?.title, isInitialized]);

  // Auto-refresh para cambios en animaciones
  React.useEffect(() => {
    console.log('🎬 useEffect animaciones ejecutado', {
      landingSlug,
      isInitialized,
      animations: template.animations
    });

    if (landingSlug && isInitialized) {
      console.log('⏰ Programando refresh por cambios en animaciones');
      const timer = setTimeout(() => {
        console.log('🚀 Ejecutando refresh por animaciones');
        refreshIframe(true, false); // Guardar cambios de animaciones
      }, 500);
      
      return () => {
        console.log('🧹 Cleanup timer animaciones');
        clearTimeout(timer);
      };
    }
  }, [
    template.animations?.hero?.type, 
    template.animations?.hero?.duration,
    template.animations?.features?.type, 
    template.animations?.typing_effect?.enabled,
    template.animations?.counter?.enabled,
    template.animations?.parallax?.enabled,
    isInitialized
  ]);

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
      {/* Panel de estado actual */}
      <div className="bg-gray-50 border rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
          Estado Actual de Animaciones
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Hero:</span>
            <span className="ml-2 text-gray-600">
              {safeGetTemplateValue('animations.hero.type', 'No definido')} 
              ({safeGetTemplateValue('animations.hero.duration', 0)}s)
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Features:</span>
            <span className="ml-2 text-gray-600">
              {safeGetTemplateValue('animations.features.type', 'No definido')}
              ({safeGetTemplateValue('animations.features.duration', 0)}s)
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Typing Effect:</span>
            <span className={`ml-2 ${safeGetTemplateValue('animations.typing_effect.enabled', false) ? 'text-green-600' : 'text-gray-400'}`}>
              {safeGetTemplateValue('animations.typing_effect.enabled', false) ? 'Activo' : 'Inactivo'}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Contadores:</span>
            <span className={`ml-2 ${safeGetTemplateValue('animations.counter.enabled', false) ? 'text-green-600' : 'text-gray-400'}`}>
              {safeGetTemplateValue('animations.counter.enabled', false) ? 'Activo' : 'Inactivo'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Zap className="h-5 w-5 text-blue-600" />
          <h4 className="font-medium text-blue-900">Animaciones Activas</h4>
        </div>
        <p className="text-sm text-blue-700">
          Las animaciones se aplican cuando el usuario hace scroll hasta cada sección. 
          Los cambios se reflejan automáticamente en la vista previa.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Estilo de Animaciones</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {animationOptions.map((anim, index) => (
            <button
              key={index}
              onClick={() => {
                console.log('Clic en animación:', anim.name, anim.type);
                // Asegurar que la estructura de animaciones existe
                if (!template.animations) {
                  updateTemplate('animations', {});
                }
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
                console.log('Template después del cambio:', template.animations);
                
                // Feedback visual temporal
                const button = document.activeElement as HTMLButtonElement;
                if (button) {
                  const originalText = button.innerHTML;
                  button.innerHTML = `<div class="flex items-center justify-center"><div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>Aplicando...</div>`;
                  setTimeout(() => {
                    button.innerHTML = originalText;
                  }, 800);
                }
              }}
              className={`p-4 border rounded-lg hover:shadow-md transition-all duration-200 text-left ${
                safeGetTemplateValue('animations.hero.type', '') === anim.type 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Zap className={`h-5 w-5 ${
                  safeGetTemplateValue('animations.hero.type', '') === anim.type 
                    ? 'text-blue-600' 
                    : 'text-gray-400'
                }`} />
                <span className="font-medium">{anim.name}</span>
                {safeGetTemplateValue('animations.hero.type', '') === anim.type && (
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

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <svg className="h-5 w-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <h4 className="font-medium text-yellow-800">Consejos de Animaciones</h4>
        </div>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Las animaciones se activan automáticamente en 0.5 segundos</li>
          <li>• Abre la consola del navegador (F12) para ver el debugging de los cambios</li>
          <li>• Las animaciones se activan cuando el usuario hace scroll hasta cada sección</li>
        </ul>
        <div className="mt-3 flex space-x-2">
          <button
            onClick={runComprehensiveTest}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-xs font-medium"
            title="Ejecutar test comprensivo del sistema de animaciones"
          >
            🧪 Test Comprensivo
          </button>
          <button
            onClick={() => {
              console.log('🔍 ESTADO ACTUAL DEL SISTEMA:');
              console.log('Template completo:', JSON.stringify(template, null, 2));
              console.log('Landing slug:', landingSlug);
              console.log('Is initialized:', isInitialized);
              console.log('onSave function:', typeof onSave);
              console.log('iframe ref:', iframeRef.current);
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs font-medium"
            title="Mostrar estado actual del sistema"
          >
            🔍 Debug Estado
          </button>
        </div>
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

  const renderProductsTab = () => {
    // Obtener productos actuales del template
    const products = template.product_showcase || template.products || {
      title: 'Nuestros Productos',
      subtitle: 'Descubre nuestra increíble selección',
      items: []
    };

    // Función para agregar un nuevo producto
    const addNewProduct = () => {
      const newProduct = {
        id: Date.now(), // ID único basado en timestamp
        name: 'Nuevo Producto',
        price: 99,
        currency: 'USD',
        description: 'Descripción del producto...',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        category: 'General',
        stock: 'Disponible',
        cta_button: 'Lo Quiero',
        features: ['Calidad premium', 'Garantía incluida', 'Envío gratis']
      };

      const updatedProducts = {
        ...products,
        items: [...(products.items || []), newProduct]
      };

      updateTemplate('product_showcase', updatedProducts);
    };

    // Función para eliminar un producto
    const removeProduct = (index: number) => {
      const updatedProducts = {
        ...products,
        items: products.items.filter((_: any, i: number) => i !== index)
      };
      updateTemplate('product_showcase', updatedProducts);
    };

    // Función para mover productos (reordenar)
    const moveProduct = (fromIndex: number, toIndex: number) => {
      const items = [...products.items];
      const [movedItem] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, movedItem);

      const updatedProducts = {
        ...products,
        items
      };
      updateTemplate('product_showcase', updatedProducts);
    };

    return (
      <div className="space-y-6">
        {/* Header de la sección productos */}
        <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2 text-blue-600" />
              Editor de Productos
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {products.items?.length || 0} productos
              </span>
              <button
                onClick={addNewProduct}
                className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Agregar Producto
              </button>
            </div>
          </div>

          {/* Configuración general de la sección */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Título de la Sección</label>
              <input
                type="text"
                value={products.title || ''}
                onChange={(e) => updateTemplate('product_showcase.title', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Nuestros Productos"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subtítulo</label>
              <input
                type="text"
                value={products.subtitle || ''}
                onChange={(e) => updateTemplate('product_showcase.subtitle', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Descubre nuestra increíble selección"
              />
            </div>
          </div>
        </div>

        {/* Lista de productos */}
        <div className="space-y-4">
          {products.items?.map((product: any, index: number) => (
            <div key={product.id || index} className="border rounded-lg p-4 bg-white shadow-sm">
              {/* Header del producto con controles */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={() => index > 0 && moveProduct(index, index - 1)}
                      disabled={index === 0}
                      className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      title="Mover arriba"
                    >
                      <Move className="w-3 h-3 rotate-180" />
                    </button>
                    <button
                      onClick={() => index < products.items.length - 1 && moveProduct(index, index + 1)}
                      disabled={index === products.items.length - 1}
                      className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      title="Mover abajo"
                    >
                      <Move className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                  <h4 className="font-semibold text-gray-900">{product.name}</h4>
                </div>
                <button
                  onClick={() => removeProduct(index)}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                  title="Eliminar producto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Formulario del producto */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Información básica */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium mb-1">Nombre del Producto</label>
                    <input
                      type="text"
                      value={product.name || ''}
                      onChange={(e) => updateTemplate(`product_showcase.items.${index}.name`, e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-sm"
                      placeholder="Nombre del producto"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium mb-1">Precio</label>
                      <input
                        type="number"
                        value={product.price || ''}
                        onChange={(e) => updateTemplate(`product_showcase.items.${index}.price`, parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border rounded-md text-sm"
                        placeholder="99"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Moneda</label>
                      <select
                        value={product.currency || 'USD'}
                        onChange={(e) => updateTemplate(`product_showcase.items.${index}.currency`, e.target.value)}
                        className="w-full px-3 py-2 border rounded-md text-sm"
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="MXN">MXN</option>
                        <option value="COP">COP</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1">Categoría</label>
                    <input
                      type="text"
                      value={product.category || ''}
                      onChange={(e) => updateTemplate(`product_showcase.items.${index}.category`, e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-sm"
                      placeholder="Categoría"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1">Stock/Estado</label>
                    <select
                      value={product.stock || 'Disponible'}
                      onChange={(e) => updateTemplate(`product_showcase.items.${index}.stock`, e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-sm"
                    >
                      <option value="Disponible">✅ Disponible</option>
                      <option value="Pocas Unidades">⚠️ Pocas Unidades</option>
                      <option value="Agotado">❌ Agotado</option>
                      <option value="Edición Limitada">⭐ Edición Limitada</option>
                      <option value="Preventa">🚀 Preventa</option>
                    </select>
                  </div>
                </div>

                {/* Descripción y características */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium mb-1">Descripción</label>
                    <textarea
                      value={product.description || ''}
                      onChange={(e) => updateTemplate(`product_showcase.items.${index}.description`, e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-sm"
                      rows={4}
                      placeholder="Descripción detallada del producto..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1">Botón de Acción</label>
                    <input
                      type="text"
                      value={product.cta_button || ''}
                      onChange={(e) => updateTemplate(`product_showcase.items.${index}.cta_button`, e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-sm"
                      placeholder="Lo Quiero"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1">Características (separadas por coma)</label>
                    <textarea
                      value={product.features?.join(', ') || ''}
                      onChange={(e) => updateTemplate(`product_showcase.items.${index}.features`, e.target.value.split(',').map((f: string) => f.trim()))}
                      className="w-full px-3 py-2 border rounded-md text-sm"
                      rows={2}
                      placeholder="Característica 1, Característica 2, Característica 3"
                    />
                  </div>
                </div>

                {/* Imagen y vista previa */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium mb-1">URL de la Imagen</label>
                    <input
                      type="url"
                      value={product.image || ''}
                      onChange={(e) => updateTemplate(`product_showcase.items.${index}.image`, e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-sm"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>

                  {/* Vista previa de la imagen */}
                  {product.image && (
                    <div className="relative">
                      <label className="block text-xs font-medium mb-1">Vista Previa</label>
                      <div className="relative h-32 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop';
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <span className="text-white text-xs font-medium">Vista Previa</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tarjeta de vista previa del producto */}
                  <div className="border rounded-lg p-3 bg-gray-50">
                    <div className="text-xs font-medium text-gray-600 mb-2">Vista Previa del Producto:</div>
                    <div className="space-y-2">
                      <div className="font-semibold text-sm">{product.name}</div>
                      <div className="text-xs text-gray-600">{product.category}</div>
                      <div className="text-sm font-bold text-blue-600">
                        ${product.price} {product.currency}
                      </div>
                      <div className="text-xs text-gray-700 line-clamp-2">
                        {product.description}
                      </div>
                      <div className="text-xs">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          product.stock === 'Disponible' ? 'bg-green-100 text-green-800' :
                          product.stock === 'Pocas Unidades' ? 'bg-yellow-100 text-yellow-800' :
                          product.stock === 'Agotado' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {product.stock}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Mensaje cuando no hay productos */}
          {(!products.items || products.items.length === 0) && (
            <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
              <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay productos</h3>
              <p className="text-gray-600 mb-4">Comienza agregando tu primer producto</p>
              <button
                onClick={addNewProduct}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Primer Producto
              </button>
            </div>
          )}
        </div>

        {/* Consejos y ayuda */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">💡 Consejos para Productos</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>Imágenes:</strong> Usa URLs de Unsplash para mejores resultados (recomendado: 400x400px)</li>
            <li>• <strong>Descripciones:</strong> Mantén las descripciones claras y concisas (máximo 2-3 líneas)</li>
            <li>• <strong>Precios:</strong> Incluye la moneda local para mejor conversión</li>
            <li>• <strong>Características:</strong> Máximo 3 características por producto para mejor legibilidad</li>
            <li>• <strong>Orden:</strong> Usa las flechas para reordenar productos por importancia</li>
          </ul>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'colors', name: 'Colores', icon: Palette },
    { id: 'fonts', name: 'Fuentes', icon: Type },
    { id: 'animations', name: 'Animaciones', icon: Zap },
    { id: 'content', name: 'Contenido', icon: Image },
    { id: 'products', name: 'Productos', icon: ShoppingCart },
  ];

  // Validación de datos para evitar errores
  const safeGetTemplateValue = (path: string, defaultValue: any = null) => {
    try {
      const keys = path.split('.');
      let current = template;
      for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
          current = current[key];
        } else {
          return defaultValue;
        }
      }
      return current;
    } catch (error) {
      console.error('Error al obtener valor del template:', error);
      return defaultValue;
    }
  };

  // Inicialización con valores por defecto si no existen
  React.useEffect(() => {
    if (!template.animations) {
      console.log('⚠️ Template sin animaciones, inicializando...');
      updateTemplate('animations', {
        hero: { type: 'fadeInUp', duration: 1.0, delay: 0.2 },
        features: { type: 'staggeredFadeIn', duration: 0.8, delay: 0.3 },
        typing_effect: { enabled: false },
        counter: { enabled: false },
        parallax: { enabled: false }
      });
    }
    
    if (!template.colors) {
      console.log('⚠️ Template sin colores, inicializando...');
      updateTemplate('colors', {
        primary: '#3b82f6',
        secondary: '#1e40af',
        accent: '#f59e0b',
        text: '#1f2937',
        background: '#ffffff'
      });
    }
    
    if (!template.fonts) {
      console.log('⚠️ Template sin fuentes, inicializando...');
      updateTemplate('fonts', {
        heading: 'Inter',
        body: 'Inter'
      });
    }
  }, [template]);

  // Debug del estado del template
  React.useEffect(() => {
    console.log('📊 Template actualizado:', {
      hasAnimations: !!template.animations,
      hasColors: !!template.colors,
      hasFonts: !!template.fonts,
      landingSlug,
      isInitialized
    });
  }, [template, landingSlug, isInitialized]);

  // Función de test completa para debugging
  const runComprehensiveTest = () => {
    console.log('🧪 ===== INICIANDO TEST COMPRENSIVO =====');
    console.log('1. Estado inicial del template:', JSON.stringify(template, null, 2));
    
    // Test 1: Verificar estructura de animaciones
    console.log('2. Verificando estructura de animaciones...');
    const hasAnimations = !!template.animations;
    console.log('   - Tiene animaciones:', hasAnimations);
    
    if (!hasAnimations) {
      console.log('   - Inicializando estructura de animaciones...');
      updateTemplate('animations', {
        hero: { type: 'fadeInUp', duration: 1.0, delay: 0.2 },
        features: { type: 'staggeredFadeIn', duration: 0.8, delay: 0.3 },
        typing_effect: { enabled: false },
        counter: { enabled: false },
        parallax: { enabled: false }
      });
    }
    
    // Test 2: Cambiar animaciones paso a paso
    console.log('3. Aplicando cambios de animación...');
    setTimeout(() => {
      console.log('   - Cambiando hero a bounceIn...');
      updateTemplate('animations.hero.type', 'bounceIn');
      updateTemplate('animations.hero.duration', 1.5);
      
      setTimeout(() => {
        console.log('   - Activando typing effect...');
        updateTemplate('animations.typing_effect.enabled', true);
        updateTemplate('animations.typing_effect.texts', ['Test 1', 'Test 2', 'Test 3']);
        
        setTimeout(() => {
          console.log('   - Activando contadores...');
          updateTemplate('animations.counter.enabled', true);
          updateTemplate('animations.counter.duration', 2.0);
          
          setTimeout(() => {
            console.log('4. Estado final del template:', JSON.stringify(template, null, 2));
            console.log('5. Forzando guardado y refresh...');
            
                         if (onSave) {
               onSave(template, false);
               console.log('6. Guardado llamado, refrescando iframe...');
               setTimeout(() => {
                 refreshIframe(false, false);
                 console.log('🎉 ===== TEST COMPRENSIVO COMPLETADO =====');
               }, 500);
             }
          }, 500);
        }, 500);
      }, 500);
    }, 500);
  };

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
                onClick={handleSaveClick}
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
            {activeTab === 'products' && renderProductsTab()}
          </div>
        </div>
      </div>

      {/* Preview en tiempo real */}
      <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Vista Previa en Tiempo Real</h3>
            
            {/* Botones de selección de vista */}
            <div className="flex space-x-2">
              <button
                onClick={() => setPreviewMode('scaled')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  previewMode === 'scaled'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🖥️ Desktop
              </button>
              <button
                onClick={() => setPreviewMode('tablet')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  previewMode === 'tablet'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                📱 Tablet
              </button>
              <button
                onClick={() => setPreviewMode('mobile')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  previewMode === 'mobile'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                📱 Mobile
              </button>
            </div>
          </div>
          
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {getPreviewConfig().description}
            </p>
            <div className="text-xs text-gray-500 px-2 py-1 bg-gray-200 rounded">
              {getPreviewConfig().title}
            </div>
          </div>
        </div>
        
        <div className="bg-gray-100 p-6">
          <div 
            className="bg-white rounded-lg shadow-lg mx-auto relative"
            style={getPreviewConfig().container}
          >
            {/* Botón de refresh */}
            <div className="absolute top-2 right-2 z-10 flex items-center space-x-2">
              {isRefreshing && (
                <div className="bg-green-600 bg-opacity-90 text-white px-3 py-1 rounded text-xs font-medium flex items-center">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                  Actualizando...
                </div>
              )}
              <button
                onClick={() => {
                  console.log('🧪 Test manual de animaciones');
                  console.log('📊 Estado actual del template:', template);
                  console.log('🎬 Animaciones actuales:', template.animations);
                  
                  // Cambio de prueba
                  updateTemplate('animations.hero.type', 'bounceIn');
                  updateTemplate('animations.hero.duration', 1.0);
                  
                  // Forzar refresh inmediato
                  setTimeout(() => {
                    refreshIframe(true, false);
                  }, 200);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs font-medium"
                title="Test de animaciones"
              >
                🧪 Test
              </button>
              <button
                onClick={handleRefreshClick}
                disabled={isRefreshing || !landingSlug}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-2 rounded shadow-lg transition-colors"
                title="Refrescar vista previa"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
            
            {/* Iframe para preview */}
            {landingSlug ? (
              <iframe
                ref={iframeRef}
                src={`/l/${landingSlug}`}
                style={getPreviewConfig().iframe}
                className="border-none rounded-lg w-full h-full"
                title="Vista previa de la landing page"
                loading="lazy"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Eye className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No hay landing page para previsualizar</p>
                  <p className="text-sm">Guarda primero tu template</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Vista previa con dimensiones reales - Cada vista simula el dispositivo real
            </p>
            {previewMode === 'scaled' && (
              <p className="text-xs text-gray-500 mt-1">
                💡 Tip: El scroll es interno del iframe, experiencia más limpia
              </p>
            )}
            {landingSlug && (
              <p className="text-xs text-gray-400 mt-1">
                🔄 Cambios en colores, fuentes, contenido y animaciones se actualizan automáticamente
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCustomizer; 