// Utilidad para analytics y tracking de productos

// Función para generar un ID de sesión único
export const generateSessionId = (): string => {
  const stored = localStorage.getItem('landing_session_id');
  if (stored) return stored;
  
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  localStorage.setItem('landing_session_id', sessionId);
  return sessionId;
};

// Interface para datos del producto
export interface ProductClickData {
  landingSlug: string;
  productName: string;
  productPrice?: number;
  productCategory?: string;
  productSku?: string;
  buttonText?: string;
  sessionId?: string;
  productData?: any;
}

// Función principal para trackear clics en productos
export const trackProductClick = async (data: ProductClickData): Promise<boolean> => {
  try {
    // Obtener URL del API - ajustar según configuración
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    
    // Preparar datos del tracking
    const trackingData = {
      landing_slug: data.landingSlug,
      product_name: data.productName,
      product_price: data.productPrice,
      product_category: data.productCategory,
      product_sku: data.productSku,
      button_text: data.buttonText || 'Comprar',
      session_id: data.sessionId || generateSessionId(),
      product_data: data.productData
    };

    console.log('🔄 Enviando tracking de producto:', trackingData);

    // Enviar request al backend
    const response = await fetch(`${apiUrl}/track-product-click`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(trackingData)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Clic de producto registrado:', result.data);
      return true;
    } else {
      console.error('❌ Error en respuesta del servidor:', result.message);
      return false;
    }

  } catch (error) {
    console.error('❌ Error tracking producto:', error);
    
    // En caso de error, guardar en localStorage para reintento posterior
    try {
      const failedTracking = JSON.parse(localStorage.getItem('failed_product_clicks') || '[]');
      failedTracking.push({
        ...data,
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      localStorage.setItem('failed_product_clicks', JSON.stringify(failedTracking));
      console.log('💾 Tracking guardado para reintento posterior');
    } catch (storageError) {
      console.error('❌ Error guardando tracking fallido:', storageError);
    }
    
    return false;
  }
};

// Función para reintento de trackings fallidos
export const retryFailedTracking = async (): Promise<void> => {
  try {
    const failedTracking = JSON.parse(localStorage.getItem('failed_product_clicks') || '[]');
    
    if (failedTracking.length === 0) return;
    
    console.log(`🔄 Reintentando ${failedTracking.length} trackings fallidos...`);
    
    const successful: number[] = [];
    
    for (let i = 0; i < failedTracking.length; i++) {
      const tracking = failedTracking[i];
      const success = await trackProductClick(tracking);
      if (success) {
        successful.push(i);
      }
    }
    
    // Remover trackings exitosos
    if (successful.length > 0) {
      const remaining = failedTracking.filter((_: any, index: number) => !successful.includes(index));
      localStorage.setItem('failed_product_clicks', JSON.stringify(remaining));
      console.log(`✅ ${successful.length} trackings recuperados exitosamente`);
    }
    
  } catch (error) {
    console.error('❌ Error en reintento de tracking:', error);
  }
};

// Función para obtener el slug de la landing actual
export const getCurrentLandingSlug = (): string => {
  if (typeof window === 'undefined') return '';
  
  const path = window.location.pathname;
  const match = path.match(/\/l\/([^\/]+)/);
  return match ? match[1] : '';
};

// Función helper para obtener datos completos del producto
export const getProductTrackingData = (product: any, buttonText?: string): ProductClickData => {
  return {
    landingSlug: getCurrentLandingSlug(),
    productName: product.name || 'Producto sin nombre',
    productPrice: parseFloat(product.price) || undefined,
    productCategory: product.category || undefined,
    productSku: product.sku || product.id?.toString() || undefined,
    buttonText: buttonText || product.cta_button || 'Comprar',
    sessionId: generateSessionId(),
    productData: {
      ...product,
      // Información adicional del contexto
      clickedAt: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      pageUrl: window.location.href
    }
  };
};

// Auto-reintento al cargar la página
if (typeof window !== 'undefined') {
  // Reintento automático después de 2 segundos
  setTimeout(() => {
    retryFailedTracking();
  }, 2000);
  
  // Reintento periódico cada 5 minutos
  setInterval(() => {
    retryFailedTracking();
  }, 5 * 60 * 1000);
} 