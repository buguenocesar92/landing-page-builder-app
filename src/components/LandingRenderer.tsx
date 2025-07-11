'use client';

import React, { useEffect, useState, useRef } from 'react';
import { 
  Play, 
  Star, 
  Check, 
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  User,
  Mail,
  Building,
  Phone,
  Heart,
  Award,
  CheckCircle,
  X,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Pause,
  Users,
  Target,
  Eye,
  EyeOff
} from 'lucide-react';
import Image from 'next/image';
import { trackProductClick, getProductTrackingData } from '@/lib/analytics';

interface LandingRendererProps {
  content: any;
  onSubmit?: (data: any) => Promise<void>;
}

// Componente de animación de entrada
const AnimatedSection: React.FC<{ 
  children: React.ReactNode;
  animation?: string;
  delay?: number;
  className?: string;
}> = ({ children, animation = 'fadeInUp', delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Debug: log when animations are being applied
    console.log('AnimatedSection - Animation type:', animation, 'Delay:', delay);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay * 1000);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, hasAnimated, animation]);

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-1000 ease-out';
    
    if (!isVisible) {
      // Estado inicial (antes de la animación)
      switch (animation) {
        case 'fadeInUp':
          return `${baseClasses} opacity-0 transform translate-y-8`;
        case 'slideInLeft':
          return `${baseClasses} opacity-0 transform -translate-x-8`;
        case 'slideInRight':
          return `${baseClasses} opacity-0 transform translate-x-8`;
        case 'bounceIn':
          return `${baseClasses} opacity-0 transform scale-95`;
        case 'staggeredFadeIn':
          return `${baseClasses} opacity-0 transform translate-y-4`;
        default:
          return `${baseClasses} opacity-0 transform translate-y-4`;
      }
    } else {
      // Estado final (después de la animación)
      switch (animation) {
        case 'bounceIn':
          return `${baseClasses} opacity-100 transform scale-100 animate-bounce`;
        default:
          return `${baseClasses} opacity-100 transform translate-x-0 translate-y-0 scale-100`;
      }
    }
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClasses()} ${className}`}
      style={{
        transitionDelay: isVisible ? '0ms' : `${delay * 1000}ms`,
        animationDelay: isVisible ? `${delay * 1000}ms` : '0ms'
      }}
    >
      {children}
    </div>
  );
};

// Componente de efecto typing
const TypingEffect: React.FC<{ texts: string[]; speed?: number }> = ({ texts, speed = 100 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    const timeout = setTimeout(() => {
      const fullText = texts[currentIndex % texts.length];
      
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex(prev => prev + 1);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, texts, speed]);

  return (
    <span className="text-blue-400 border-r-2 border-current pr-1 animate-pulse">
      {currentText}
    </span>
  );
};

// Componente contador animado
const AnimatedCounter: React.FC<{ 
  end: number; 
  suffix?: string; 
  duration?: number;
}> = ({ end, suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          
          const increment = end / (duration * 60);
          const timer = setInterval(() => {
            setCount(prev => {
              const next = prev + increment;
              if (next >= end) {
                clearInterval(timer);
                return end;
              }
              return next;
            });
          }, 1000 / 60);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, isVisible]);

  return (
    <div ref={ref} className="text-4xl font-bold">
      {Math.floor(count)}{suffix}
    </div>
  );
};

// Componente galería de imágenes con lightbox
const ImageGallery: React.FC<{ images: string[]; alt: string }> = ({ images, alt }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg hover:opacity-75 transition-opacity"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image}
              alt={`${alt} ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <div className="max-w-4xl max-h-[90vh] relative">
            <Image
              src={selectedImage}
              alt={alt}
              width={1200}
              height={800}
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

// Componente principal de renderizado
const LandingRenderer: React.FC<LandingRendererProps> = ({ content, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Configuración de personalización
  const colors = content.colors || {
    primary: '#3b82f6',
    secondary: '#1e40af',
    accent: '#fbbf24',
    background: '#ffffff',
    text: '#1f2937'
  };
  
  const fonts = content.fonts || {
    heading: 'Inter',
    body: 'Inter'
  };
  
  const animations = content.animations || {};

  // Aplicar estilos dinámicos
  useEffect(() => {
    // Debug: verificar si los colores están cambiando
    console.log('Colors updated:', colors);
    console.log('Fonts updated:', fonts);
    console.log('Animations updated:', animations);
    
    // Aplicar variables CSS para colores
    const root = document.documentElement;
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-text', colors.text);
    
    // Cargar fuentes de Google Fonts si no son del sistema
    const loadGoogleFont = (fontName: string) => {
      if (!['Inter', 'Arial', 'Helvetica', 'sans-serif', 'serif', 'monospace'].includes(fontName)) {
        const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}&display=swap`;
        if (!document.querySelector(`link[href="${fontUrl}"]`)) {
          const link = document.createElement('link');
          link.href = fontUrl;
          link.rel = 'stylesheet';
          document.head.appendChild(link);
        }
      }
    };
    
    loadGoogleFont(fonts.heading);
    if (fonts.body !== fonts.heading) {
      loadGoogleFont(fonts.body);
    }
    
    // Aplicar fuentes al documento
    root.style.setProperty('--font-heading', fonts.heading);
    root.style.setProperty('--font-body', fonts.body);
    
    return () => {
      // Cleanup no necesario para este caso
    };
  }, [colors, fonts, animations]);

  const getIcon = (iconName: string, size: string = 'h-6 w-6') => {
    const icons: Record<string, any> = {
      zap: Zap,
      shield: Shield,
      'trending-up': TrendingUp,
      user: User,
      mail: Mail,
      building: Building,
      phone: Phone,
      heart: Heart,
      award: Award,
      'check-circle': CheckCircle,
      'message-square': MessageSquare,
    };
    const IconComponent = icons[iconName] || User;
    return <IconComponent className={size} />;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const renderHeroSection = () => {
    const hero = content.hero || {};
    const background = hero.background || {};

    let backgroundStyle: React.CSSProperties = {};
    
    // Determinar tipo de fondo automáticamente
    if (background.url && background.url.trim()) {
      // Si hay una URL de imagen configurada, usar imagen de fondo
      backgroundStyle.backgroundImage = `url(${background.url})`;
      backgroundStyle.backgroundSize = 'cover';
      backgroundStyle.backgroundPosition = 'center';
      backgroundStyle.backgroundRepeat = 'no-repeat';
    } else if (background.type === 'gradient') {
      // Usar colores del template en lugar de colores fijos
      const gradientColors = background.colors || [colors.primary, colors.secondary];
      backgroundStyle.background = `linear-gradient(${background.direction || '135deg'}, ${gradientColors.join(', ')})`;
    } else if (background.type === 'particle_animation') {
      // Usar colores del template para particle animation
      backgroundStyle.background = `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`;
    } else {
      // Default: usar gradient con colores del template
      backgroundStyle.background = `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`;
    }

    return (
      <section 
        className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
        style={backgroundStyle}
      >
        {/* Particle animation simulation with CSS */}
        {background.type === 'particle_animation' && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute animate-pulse w-2 h-2 rounded-full opacity-30" style={{ top: '20%', left: '10%', animationDelay: '0s', backgroundColor: colors.accent }}></div>
            <div className="absolute animate-pulse w-1 h-1 rounded-full opacity-40" style={{ top: '60%', left: '80%', animationDelay: '1s', backgroundColor: colors.accent }}></div>
            <div className="absolute animate-pulse w-3 h-3 rounded-full opacity-20" style={{ top: '40%', left: '60%', animationDelay: '2s', backgroundColor: colors.accent }}></div>
            <div className="absolute animate-pulse w-1 h-1 rounded-full opacity-50" style={{ top: '80%', left: '20%', animationDelay: '1.5s', backgroundColor: colors.accent }}></div>
            <div className="absolute animate-pulse w-2 h-2 rounded-full opacity-30" style={{ top: '30%', left: '90%', animationDelay: '0.5s', backgroundColor: colors.accent }}></div>
          </div>
        )}

        {/* Overlay para imagen de fondo o gradiente */}
        {background.overlay && (
          <div 
            className="absolute inset-0" 
            style={{ backgroundColor: background.overlay }}
          />
        )}
        
        <div className="relative z-10 max-w-6xl mx-auto text-center text-white">
          <AnimatedSection animation={animations.hero?.type} delay={animations.hero?.delay}>
            <h1 
              className="text-5xl md:text-7xl font-extrabold mb-6"
              style={{ fontFamily: fonts.heading }}
            >
              {hero.title}
              {animations.typing_effect?.enabled && (
                <div className="mt-4">
                  <TypingEffect 
                    texts={animations.typing_effect.texts} 
                    speed={animations.typing_effect.speed}
                  />
                </div>
              )}
            </h1>
            
            {hero.subtitle && (
              <h2 
                className="text-2xl md:text-3xl mb-6 opacity-90"
                style={{ fontFamily: fonts.heading }}
              >
                {hero.subtitle}
              </h2>
            )}
            
            {hero.description && (
              <p 
                className="text-xl mb-8 max-w-3xl mx-auto opacity-80"
                style={{ fontFamily: fonts.body }}
              >
                {hero.description}
              </p>
            )}
            
            <AnimatedSection animation={animations.cta?.type} delay={animations.cta?.delay}>
              <a
                href="#form"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg transition-all hover:scale-105"
                style={{
                  backgroundColor: colors.accent,
                  color: '#ffffff',
                  fontFamily: fonts.body
                }}
              >
                {hero.cta_text || 'Comenzar Ahora'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </AnimatedSection>
          </AnimatedSection>
        </div>
        
        {/* Video de fondo */}
        {hero.video?.enabled && (
          <div className="absolute inset-0">
            <video
              autoPlay={hero.video.autoplay}
              loop={hero.video.loop}
              muted
              className="w-full h-full object-cover opacity-30"
            >
              <source src={hero.video.url} type="video/mp4" />
            </video>
          </div>
        )}
      </section>
    );
  };

  const renderFeaturesSection = () => {
    const features = content.features || {};
    
    if (!features.items) return null;

    return (
      <section className="py-20 px-4" style={{ backgroundColor: colors.background }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 
                className="text-4xl md:text-5xl font-bold mb-6" 
                style={{ 
                  color: colors.text,
                  fontFamily: fonts.heading
                }}
              >
                {features.title}
              </h2>
              {features.subtitle && (
                <p 
                  className="text-xl text-gray-600 max-w-3xl mx-auto"
                  style={{ fontFamily: fonts.body }}
                >
                  {features.subtitle}
                </p>
              )}
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.items?.map((feature: any, index: number) => (
              <AnimatedSection
                key={index}
                animation={feature.animation || animations.features?.type || 'fadeInUp'}
                delay={index * 0.2}
              >
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  {feature.image && (
                    <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center mb-4">
                    <div 
                      className="p-3 rounded-lg mr-4"
                      style={{ backgroundColor: `${colors.primary}20` }}
                    >
                      <div style={{ color: colors.primary }}>
                        {getIcon(feature.icon, 'h-6 w-6')}
                      </div>
                    </div>
                    <h3 
                      className="text-xl font-bold" 
                      style={{ 
                        color: colors.text,
                        fontFamily: fonts.heading
                      }}
                    >
                      {feature.title}
                    </h3>
                  </div>
                  
                  <p 
                    className="text-gray-600 leading-relaxed"
                    style={{ fontFamily: fonts.body }}
                  >
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderStatsSection = () => {
    const stats = content.stats || {};
    
    if (!stats.items) return null;

    return (
      <section className="py-20 px-4" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                {stats.title}
              </h2>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {stats.items.map((stat: any, index: number) => (
              <AnimatedSection
                key={index}
                delay={index * 0.3}
                className="text-center text-white"
              >
                <div className="mb-6 flex justify-center">
                  <div 
                    className="p-4 rounded-full"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    <div style={{ color: colors.accent }}>
                      {getIcon(stat.icon, 'h-8 w-8')}
                    </div>
                  </div>
                </div>
                <AnimatedCounter 
                  end={stat.number} 
                  suffix={stat.suffix}
                  duration={animations.counter?.duration || 2}
                />
                <p className="text-lg mt-2 opacity-90">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderTestimonialsSection = () => {
    const testimonials = content.testimonials || {};
    
    if (!testimonials.items) return null;

    return (
      <section className="py-20 px-4" style={{ backgroundColor: colors.background }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.text }}>
                {testimonials.title}
              </h2>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.items.map((testimonial: any, index: number) => (
              <AnimatedSection
                key={index}
                delay={index * 0.2}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 text-lg italic">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <div className="relative w-12 h-12 mr-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: colors.text }}>
                      {testimonial.name}
                    </p>
                    <p className="text-gray-600 text-sm">{testimonial.position}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderFormSection = () => {
    const form = content.form || {};
    
    return (
      <section id="form" className="py-20 px-4" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-2xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              style={{ fontFamily: fonts.heading }}
            >
              {form.title || 'Contáctanos'}
            </h2>
            {form.subtitle && (
              <p 
                className="text-xl text-white opacity-90"
                style={{ fontFamily: fonts.body }}
              >
                {form.subtitle}
              </p>
            )}
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-2xl">
              <div className="grid gap-6">
                {form.fields?.map((field: any, index: number) => (
                  <div key={index}>
                    <label 
                      className="block text-sm font-medium mb-2" 
                      style={{ 
                        color: colors.text,
                        fontFamily: fonts.body
                      }}
                    >
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: colors.primary }}>
                        {getIcon(field.icon, 'h-6 w-6')}
                      </div>
                      {field.type === 'textarea' ? (
                        <textarea
                          name={field.name}
                          required={field.required}
                          value={formData[field.name] || ''}
                          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={4}
                        />
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          required={field.required}
                          value={formData[field.name] || ''}
                          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-8 py-4 px-6 rounded-lg font-semibold text-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: colors.accent,
                  color: '#ffffff',
                  fontFamily: fonts.body
                }}
              >
                {isSubmitting ? 'Enviando...' : (form.cta_text || 'Enviar')}
              </button>

              {form.privacy_text && (
                <p className="text-sm text-gray-600 mt-4 text-center">
                  {form.privacy_text}
                </p>
              )}
            </form>
          </AnimatedSection>
        </div>
      </section>
    );
  };

  const renderPricingSection = () => {
    const pricing = content.pricing || {};
    
    if (!pricing.plans) return null;

    return (
      <section className="py-20 px-4" style={{ backgroundColor: colors.background }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.text }}>
                {pricing.title}
              </h2>
              {pricing.subtitle && (
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {pricing.subtitle}
                </p>
              )}
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricing.plans.map((plan: any, index: number) => (
              <AnimatedSection
                key={index}
                delay={index * 0.2}
                className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow ${
                  plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Más Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold" style={{ color: colors.primary }}>
                      ${plan.price}
                    </span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features?.map((feature: string, featureIndex: number) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all hover:scale-105 ${
                    plan.popular 
                      ? 'text-white shadow-lg' 
                      : 'border-2 hover:shadow-md'
                  }`}
                  style={{
                    backgroundColor: plan.popular ? colors.primary : 'transparent',
                    borderColor: plan.popular ? colors.primary : colors.primary,
                    color: plan.popular ? 'white' : colors.primary
                  }}
                >
                  {plan.cta_text}
                </button>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderProductShowcase = () => {
    // Buscar productos en content.products (nuestro template) o content.product_showcase (otros templates)
    const products = content.products || content.product_showcase || {};
    
    if (!products.items || !Array.isArray(products.items)) return null;

    return (
      <section className="py-20 px-4" style={{ backgroundColor: colors.background }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.text }}>
                {products.title || 'Nuestros Productos'}
              </h2>
              {products.subtitle && (
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {products.subtitle}
                </p>
              )}
            </AnimatedSection>
          </div>

          {/* Grid responsivo inteligente basado en cantidad de productos */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${
            products.items.length <= 3 ? 'lg:grid-cols-3' :
            products.items.length <= 4 ? 'lg:grid-cols-2 xl:grid-cols-4' :
            products.items.length <= 6 ? 'lg:grid-cols-3' :
            products.items.length <= 9 ? 'lg:grid-cols-3 xl:grid-cols-4' :
            'lg:grid-cols-4'
          }`}>
            {products.items.map((product: any, index: number) => (
              <AnimatedSection
                key={product.id || index}
                delay={index * 0.1}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Imagen del producto */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.image || product.images?.[0] || '/placeholder-product.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                  {product.stock && product.stock !== 'Disponible' && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {product.stock}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Información del producto */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>
                    {product.name}
                  </h3>
                  
                  {product.category && (
                    <p className="text-sm text-gray-500 mb-2">
                      {product.category}
                    </p>
                  )}
                  
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                    {product.description}
                  </p>
                  
                  {/* Precio */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold" style={{ color: colors.primary }}>
                      ${product.price}
                      {product.currency && product.currency !== 'USD' && (
                        <span className="text-sm ml-1">{product.currency}</span>
                      )}
                    </span>
                  </div>
                  
                  {/* Botón "Lo Quiero" */}
                  <button
                    className="w-full py-3 px-4 rounded-lg font-semibold transition-all hover:scale-105 hover:shadow-md"
                    style={{
                      backgroundColor: colors.accent,
                      color: 'white'
                    }}
                    onClick={async () => {
                      // 🔥 TRACKING: Registrar clic en producto
                      try {
                        const trackingData = getProductTrackingData(product, product.cta_button || 'Lo Quiero');
                        await trackProductClick(trackingData);
                        console.log('✅ Producto clickeado registrado:', trackingData.productName);
                      } catch (error) {
                        console.error('❌ Error tracking producto:', error);
                      }
                      
                      // Scroll al formulario cuando hagan clic en "Lo Quiero"
                      const formSection = document.querySelector('form');
                      if (formSection) {
                        formSection.scrollIntoView({ behavior: 'smooth' });
                        // Opcional: rellenar el campo de mensaje con el producto seleccionado
                        const messageField = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
                        if (messageField) {
                          messageField.value = `Hola! Me interesa la ${product.name} de $${product.price}. ¿Podrían darme más información?`;
                        }
                      }
                    }}
                  >
                    {product.cta_button || 'Lo Quiero'}
                  </button>
                  
                  {/* Características del producto (si existen) */}
                  {product.features && product.features.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex flex-wrap gap-1">
                        {product.features.slice(0, 3).map((feature: string, idx: number) => (
                          <span 
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderVideoSection = () => {
    const video = content.video_section || {};
    
    if (!video.video_url) return null;

    return (
      <section className="py-20 px-4" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                {video.title}
              </h2>
              {video.subtitle && (
                <p className="text-xl text-white opacity-90">
                  {video.subtitle}
                </p>
              )}
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.3}>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center group cursor-pointer">
                <div className="relative w-full h-full">
                  <Image
                    src={video.thumbnail}
                    alt="Video thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white bg-opacity-20 rounded-full p-6 group-hover:scale-110 transition-transform">
                    <Play className="h-16 w-16 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    );
  };

  const renderInteractiveDemo = () => {
    const demo = content.interactive_demo || {};
    
    if (!demo.enabled) return null;

    return (
      <section className="py-20 px-4" style={{ backgroundColor: colors.background }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.text }}>
                {demo.title}
              </h2>
              {demo.subtitle && (
                <p className="text-xl text-gray-600">
                  {demo.subtitle}
                </p>
              )}
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.3}>
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              {demo.iframe_url && !demo.iframe_url.includes('example.com') ? (
                <iframe
                  src={demo.iframe_url}
                  className="w-full h-96 rounded-lg border"
                  frameBorder="0"
                  allowFullScreen
                />
              ) : (
                <div className="bg-gray-100 rounded-lg h-96 flex flex-col items-center justify-center text-center p-8">
                  <div className="mb-6">
                    <div className="w-24 h-24 mx-auto bg-gray-300 rounded-lg flex items-center justify-center mb-4">
                      <Play className="h-12 w-12 text-gray-500" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-700">
                    Demo Interactivo Próximamente
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md">
                    Estamos preparando una experiencia interactiva increíble para que puedas probar nuestra plataforma en tiempo real.
                  </p>
                  <button
                    className="px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
                    style={{
                      backgroundColor: colors.primary,
                      color: 'white'
                    }}
                  >
                    Solicitar Acceso Beta
                  </button>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: fonts.body }}>
      {/* CSS para fuentes personalizadas */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&family=Lato:wght@300;400;700;900&family=Montserrat:wght@400;500;600;700;800;900&family=Roboto:wght@400;500;700;900&family=Poppins:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;500;600;700;800&family=Source+Sans+Pro:wght@400;600;700;900&family=Nunito:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      {renderHeroSection()}
      {renderFeaturesSection()}
      {renderStatsSection()}
      {renderProductShowcase()}
      {renderVideoSection()}
      {renderTestimonialsSection()}
      {renderPricingSection()}
      {renderInteractiveDemo()}
      {renderFormSection()}
      
      {/* Social Proof Section */}
      {content.social_proof && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto text-center">
            <AnimatedSection>
              <h3 className="text-lg font-medium text-gray-600 mb-8">
                {content.social_proof.title}
              </h3>
              <div className="flex justify-center items-center space-x-8 opacity-60">
                {content.social_proof.logos?.map((logo: string, index: number) => (
                  <div key={index} className="relative h-12 w-32">
                    <Image
                      src={logo}
                      alt={`Logo ${index + 1}`}
                      fill
                      className="object-contain grayscale hover:grayscale-0 transition-all"
                    />
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}
    </div>
  );
};

export default LandingRenderer; 