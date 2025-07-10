'use client';

import React, { useEffect, useState, useRef } from 'react';
import { 
  ChevronDown, 
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
  MessageSquare
} from 'lucide-react';
import Image from 'next/image';

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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 1000);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const animationClasses: Record<string, string> = {
    fadeInUp: `transform transition-all duration-1000 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
    }`,
    slideInLeft: `transform transition-all duration-1000 ${
      isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
    }`,
    slideInRight: `transform transition-all duration-1000 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
    }`,
    bounceIn: `transform transition-all duration-1000 ${
      isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
    }`,
    staggeredFadeIn: `transform transition-all duration-800 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
    }`
  };

  return (
    <div ref={ref} className={`${animationClasses[animation] || animationClasses.fadeInUp} ${className}`}>
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

  const colors = content.colors || {};
  const animations = content.animations || {};

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
    
    if (background.type === 'gradient') {
      backgroundStyle.background = `linear-gradient(${background.direction || '45deg'}, ${background.colors?.join(', ') || '#667eea, #764ba2'})`;
    } else if (background.type === 'image') {
      backgroundStyle.backgroundImage = `url(${background.url})`;
      backgroundStyle.backgroundSize = 'cover';
      backgroundStyle.backgroundPosition = 'center';
    } else if (background.type === 'particle_animation') {
      // Fallback to dark gradient for particle animation
      backgroundStyle.background = `linear-gradient(135deg, #1f2937, #111827)`;
    } else {
      // Default dark background
      backgroundStyle.backgroundColor = '#1f2937';
    }

    return (
      <section 
        className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
        style={backgroundStyle}
      >
        {/* Particle animation simulation with CSS */}
        {background.type === 'particle_animation' && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute animate-pulse bg-blue-500 w-2 h-2 rounded-full opacity-30" style={{ top: '20%', left: '10%', animationDelay: '0s' }}></div>
            <div className="absolute animate-pulse bg-blue-400 w-1 h-1 rounded-full opacity-40" style={{ top: '60%', left: '80%', animationDelay: '1s' }}></div>
            <div className="absolute animate-pulse bg-blue-300 w-3 h-3 rounded-full opacity-20" style={{ top: '40%', left: '60%', animationDelay: '2s' }}></div>
            <div className="absolute animate-pulse bg-blue-500 w-1 h-1 rounded-full opacity-50" style={{ top: '80%', left: '20%', animationDelay: '1.5s' }}></div>
            <div className="absolute animate-pulse bg-blue-400 w-2 h-2 rounded-full opacity-30" style={{ top: '30%', left: '90%', animationDelay: '0.5s' }}></div>
          </div>
        )}

        {background.overlay && (
          <div 
            className="absolute inset-0" 
            style={{ backgroundColor: background.overlay }}
          />
        )}
        
        <div className="relative z-10 max-w-6xl mx-auto text-center text-white">
          <AnimatedSection animation={animations.hero?.type} delay={animations.hero?.delay}>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
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
              <h2 className="text-2xl md:text-3xl mb-6 opacity-90">
                {hero.subtitle}
              </h2>
            )}
            
            {hero.description && (
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-80">
                {hero.description}
              </p>
            )}
            
            <AnimatedSection animation={animations.cta?.type} delay={animations.cta?.delay}>
              <a
                href="#form"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg transition-all hover:scale-105"
                style={{
                  backgroundColor: colors.accent || '#fbbf24',
                  color: colors.text || '#1f2937'
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.text }}>
                {features.title}
              </h2>
              {features.subtitle && (
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {features.subtitle}
                </p>
              )}
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.items?.map((feature: any, index: number) => (
              <AnimatedSection
                key={index}
                animation={feature.animation || 'fadeInUp'}
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
                    <h3 className="text-xl font-bold" style={{ color: colors.text }}>
                      {feature.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {form.title || 'Contáctanos'}
            </h2>
            {form.subtitle && (
              <p className="text-xl text-white opacity-90">
                {form.subtitle}
              </p>
            )}
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-2xl">
              <div className="grid gap-6">
                {form.fields?.map((field: any, index: number) => (
                  <div key={index}>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
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
                  backgroundColor: colors.accent || '#fbbf24',
                  color: colors.text || '#1f2937'
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
    const products = content.product_showcase || {};
    
    if (!products.items) return null;

    return (
      <section className="py-20 px-4" style={{ backgroundColor: colors.background }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.text }}>
                {products.title}
              </h2>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {products.items.map((product: any, index: number) => (
              <AnimatedSection
                key={index}
                delay={index * 0.3}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-80">
                  {product.gallery && product.gallery.length > 1 ? (
                    <ImageGallery images={product.gallery} alt={product.name} />
                  ) : (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3" style={{ color: colors.text }}>
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold" style={{ color: colors.primary }}>
                      ${product.price} {product.currency}
                    </span>
                    <button
                      className="px-6 py-2 rounded-lg font-semibold transition-all hover:scale-105"
                      style={{
                        backgroundColor: colors.accent,
                        color: colors.text
                      }}
                    >
                      Ver Detalles
                    </button>
                  </div>
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
    <div className="min-h-screen" style={{ fontFamily: content.fonts?.body || 'Inter, sans-serif' }}>
      {/* CSS para fuentes personalizadas */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&family=Lato:wght@300;400;700;900&display=swap');
        
        h1, h2, h3, h4, h5, h6 {
          font-family: ${content.fonts?.heading || 'Inter'}, sans-serif;
        }
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