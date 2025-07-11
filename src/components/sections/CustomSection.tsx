'use client';

import React from 'react';
import { AnimatedSection } from '../LandingRenderer';

interface CustomSectionProps {
  content: {
    title?: string;
    subtitle?: string;
    items?: Array<{
      icon?: string;
      title: string;
      description: string;
      image?: string;
      link?: string;
    }>;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
  };
  animations?: {
    type?: string;
    delay?: number;
    duration?: number;
  };
}

/**
 * Ejemplo: Sección personalizada completamente nueva
 * Muestra cómo crear componentes únicos para templates
 */
export const CustomPortfolioSection: React.FC<CustomSectionProps> = ({ 
  content, 
  colors, 
  animations 
}) => {
  return (
    <section className="py-20 px-4" style={{ backgroundColor: colors.background || '#ffffff' }}>
      <div className="max-w-6xl mx-auto">
        
        {/* Header de la sección */}
        <AnimatedSection animation={animations?.type || 'fadeInUp'} delay={animations?.delay || 0.2}>
          <div className="text-center mb-16">
            {content.title && (
              <h2 
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ color: colors.text }}
              >
                {content.title}
              </h2>
            )}
            {content.subtitle && (
              <p 
                className="text-xl opacity-80 max-w-3xl mx-auto"
                style={{ color: colors.text }}
              >
                {content.subtitle}
              </p>
            )}
          </div>
        </AnimatedSection>

        {/* Grid de proyectos/items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.items?.map((item, index) => (
            <AnimatedSection 
              key={index}
              animation="fadeInUp" 
              delay={(index + 1) * 0.1}
            >
              <div className="group cursor-pointer">
                {/* Imagen del proyecto */}
                {item.image && (
                  <div className="relative overflow-hidden rounded-xl mb-6">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Overlay con información */}
                    <div 
                      className="absolute inset-0 bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <div className="text-center text-white p-6">
                        <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                        <p className="text-sm opacity-90 mb-4">{item.description}</p>
                        {item.link && (
                          <a 
                            href={item.link}
                            className="inline-block px-6 py-2 rounded-full border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-colors"
                          >
                            Ver Proyecto
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Información del proyecto */}
                <div className="text-center">
                  <h3 
                    className="text-xl font-semibold mb-2"
                    style={{ color: colors.text }}
                  >
                    {item.title}
                  </h3>
                  <p 
                    className="opacity-70"
                    style={{ color: colors.text }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA final */}
        <AnimatedSection animation="fadeInUp" delay={0.5}>
          <div className="text-center mt-16">
            <button 
              className="px-8 py-4 rounded-full text-white font-semibold text-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: colors.accent }}
            >
              Ver Todos los Proyectos
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

/**
 * Sección de Process/Timeline personalizada
 */
export const CustomProcessSection: React.FC<CustomSectionProps> = ({ 
  content, 
  colors, 
  animations 
}) => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        
        <AnimatedSection animation="fadeInUp" delay={0.2}>
          <div className="text-center mb-16">
            <h2 
              className="text-4xl font-bold mb-6"
              style={{ color: colors.text }}
            >
              {content.title || 'Nuestro Proceso'}
            </h2>
            <p 
              className="text-xl opacity-70"
              style={{ color: colors.text }}
            >
              {content.subtitle || 'Así trabajamos para lograr resultados extraordinarios'}
            </p>
          </div>
        </AnimatedSection>

        {/* Timeline vertical */}
        <div className="relative">
          {/* Línea central */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 rounded-full"
            style={{ backgroundColor: colors.primary }}
          ></div>

          {content.items?.map((step, index) => (
            <AnimatedSection 
              key={index}
              animation="slideInLeft" 
              delay={index * 0.2}
            >
              <div className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}>
                
                {/* Número del paso */}
                <div 
                  className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg z-10"
                  style={{ backgroundColor: colors.accent }}
                >
                  {index + 1}
                </div>

                {/* Contenido del paso */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 
                      className="text-xl font-semibold mb-3"
                      style={{ color: colors.text }}
                    >
                      {step.title}
                    </h3>
                    <p 
                      className="opacity-70"
                      style={{ color: colors.text }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// Exportar todos los componentes personalizados
export default {
  CustomPortfolioSection,
  CustomProcessSection
}; 