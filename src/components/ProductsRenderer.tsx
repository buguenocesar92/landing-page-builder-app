'use client';

import React from 'react';
import Image from 'next/image';
import { trackProductClick, getProductTrackingData } from '@/lib/analytics';

interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
  description: string;
  image: string;
  category?: string;
  stock?: string;
  cta_button?: string;
  features?: string[];
}

interface ProductsRendererProps {
  products: {
    title?: string;
    subtitle?: string;
    items: Product[];
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
  };
}

const ProductsRenderer: React.FC<ProductsRendererProps> = ({ products, colors }) => {
  if (!products.items || !Array.isArray(products.items)) return null;

  return (
    <section className="py-20 px-4" style={{ backgroundColor: colors.background }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.text }}>
            {products.title || 'Nuestros Productos'}
          </h2>
          {products.subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {products.subtitle}
            </p>
          )}
        </div>

        {/* Grid responsivo: 1 columna en móvil, 2 en tablet, 4 en desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.items.map((product: Product, index: number) => (
            <div
              key={product.id || index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 opacity-0 animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              {/* Imagen del producto */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.image || '/placeholder-product.jpg'}
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
                      // Rellenar el campo de mensaje con el producto seleccionado
                      setTimeout(() => {
                        const messageField = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
                        if (messageField) {
                          messageField.value = `Hola! Me interesa la ${product.name} de $${product.price}. ¿Podrían darme más información?`;
                          messageField.focus();
                        }
                      }, 500);
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
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default ProductsRenderer; 