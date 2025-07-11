# 🎨 **Guía Completa: Crear Templates Personalizados**

## 🚀 **Método Paso a Paso (Recomendado)**

### **Paso 1: Definir la Estructura**

```json
{
  "layout": "mi-template-unico",
  "colors": {
    "primary": "#tu-color-principal",
    "secondary": "#tu-color-secundario", 
    "accent": "#tu-color-acento",
    "text": "#tu-color-texto",
    "background": "#ffffff"
  },
  "fonts": {
    "heading": "Tu-Fuente-Titulos",
    "body": "Tu-Fuente-Cuerpo"
  },
  "animations": {
    "hero": { "type": "fadeInUp", "duration": 1.0 },
    "features": { "type": "staggeredFadeIn", "delay": 0.1 },
    "typing_effect": { "enabled": true, "texts": ["Texto 1", "Texto 2"] },
    "counter": { "enabled": true, "duration": 2.0 },
    "parallax": { "enabled": false }
  }
}
```

### **Paso 2: Diseñar las Secciones**

#### **Hero Section (Obligatoria)**
```json
{
  "hero": {
    "title": "Tu Título Principal",
    "subtitle": "Tu Subtítulo",
    "description": "Descripción de valor",
    "cta_text": "Tu Botón Principal",
    "secondary_cta": "Botón Secundario (opcional)",
    "background": {
      "type": "gradient|image|video|particle_animation",
      "colors": ["#color1", "#color2"], // Para gradient
      "url": "https://tu-imagen.com", // Para image/video
      "overlay": "rgba(0,0,0,0.4)" // Overlay opcional
    }
  }
}
```

#### **Features Section (Opcional)**
```json
{
  "features": {
    "title": "Título de Características",
    "subtitle": "Subtítulo explicativo",
    "layout": "grid|list|carousel", // Tipo de diseño
    "items": [
      {
        "icon": "nombre-icono", // Lucide icons
        "title": "Característica 1",
        "description": "Descripción detallada",
        "image": "https://imagen.com", // Opcional
        "link": "https://enlace.com" // Opcional
      }
    ]
  }
}
```

#### **Statistics Section (Opcional)**
```json
{
  "stats": {
    "title": "Números que Impresionan",
    "background": "transparent|primary|secondary",
    "items": [
      {
        "number": "150",
        "label": "Clientes Felices", 
        "suffix": "+",
        "prefix": "$" // Opcional para monedas
      }
    ]
  }
}
```

#### **Testimonials Section (Opcional)**
```json
{
  "testimonials": {
    "title": "Lo Que Dicen Nuestros Clientes",
    "layout": "grid|carousel|single",
    "items": [
      {
        "name": "Nombre Cliente",
        "role": "Cargo, Empresa",
        "content": "Testimonio completo...",
        "avatar": "https://avatar.com",
        "rating": 5, // 1-5 estrellas
        "company_logo": "https://logo.com" // Opcional
      }
    ]
  }
}
```

#### **Pricing Section (Opcional)**
```json
{
  "pricing": {
    "title": "Nuestros Planes",
    "subtitle": "Elige el que mejor se adapte",
    "currency": "USD|EUR|MXN",
    "billing_cycle": "monthly|yearly|one-time",
    "plans": [
      {
        "name": "Plan Básico",
        "price": 29,
        "period": "mes",
        "popular": false, // Destacar plan
        "features": [
          "Característica 1",
          "Característica 2"
        ],
        "cta_text": "Comenzar Ahora",
        "cta_link": "https://enlace-pago.com"
      }
    ]
  }
}
```

#### **Form Section (Obligatoria)**
```json
{
  "form": {
    "title": "Título del Formulario",
    "subtitle": "Subtítulo motivacional",
    "cta_text": "Texto del Botón",
    "success_message": "¡Gracias! Te contactaremos pronto",
    "fields": [
      {
        "name": "name",
        "type": "text|email|tel|select|textarea",
        "label": "Nombre Completo",
        "placeholder": "Escribe tu nombre",
        "required": true,
        "icon": "user", // Lucide icon
        "validation": "required|email|min:3|max:50",
        "options": ["Opción 1", "Opción 2"] // Solo para select
      }
    ],
    "privacy_text": "Tus datos están seguros...",
    "thank_you_redirect": "https://gracias.com" // Opcional
  }
}
```

### **Paso 3: Configurar Animaciones Avanzadas**

```json
{
  "animations": {
    // Animaciones básicas
    "hero": { 
      "type": "fadeInUp|slideInLeft|slideInRight|bounceIn|staggeredFadeIn",
      "duration": 1.0, // Duración en segundos
      "delay": 0.2 // Retraso en segundos
    },
    
    // Efectos especiales
    "typing_effect": {
      "enabled": true,
      "target": "hero.title", // Dónde aplicar
      "texts": ["Texto 1", "Texto 2", "Texto 3"],
      "speed": 100, // Velocidad de escritura (ms)
      "pause": 2000 // Pausa entre textos (ms)
    },
    
    "counter": {
      "enabled": true,
      "duration": 2.5, // Duración de la animación
      "ease": "easeOutQuart" // Tipo de easing
    },
    
    "parallax": {
      "enabled": true,
      "speed": 0.5, // Velocidad del parallax (0-1)
      "elements": ["hero.background", "section.image"] // Elementos afectados
    },
    
    // Micro-interacciones
    "hover_effects": {
      "buttons": "lift|glow|scale|none",
      "cards": "float|tilt|shadow|none",
      "images": "zoom|brightness|none"
    }
  }
}
```

### **Paso 4: Crear el Template via API**

```javascript
// Función completa para crear template personalizado
const createMyCustomTemplate = async () => {
  const templateData = {
    name: "Mi Template Único",
    description: "Template personalizado para mi industria específica",
    content: {
      // Todo tu JSON personalizado aquí
      layout: "mi-layout-unico",
      colors: { /* tus colores */ },
      fonts: { /* tus fuentes */ },
      animations: { /* tus animaciones */ },
      hero: { /* tu hero */ },
      features: { /* tus features */ },
      // ... todas las secciones
    },
    preview_image: "https://mi-imagen-preview.com",
    is_premium: false, // true si es premium
    is_active: true
  };

  try {
    const response = await fetch('/api/templates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(templateData)
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('Template creado:', result.data);
      // Redirigir o mostrar éxito
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### **Paso 5: Probar y Refinar**

1. **Crear landing de prueba** con tu template
2. **Verificar responsive** en móvil/tablet/desktop
3. **Probar animaciones** en diferentes navegadores
4. **Optimizar performance** (imágenes, carga)
5. **Testear conversión** con usuarios reales

## 🎯 **Templates por Industria**

### **Para Restaurantes**
```json
{
  "colors": { "primary": "#d97706", "secondary": "#92400e", "accent": "#fbbf24" },
  "fonts": { "heading": "Playfair Display", "body": "Source Sans Pro" },
  "sections": ["hero", "menu", "gallery", "location", "reservations"],
  "special_features": ["menu_showcase", "table_booking", "chef_bio"]
}
```

### **Para Fitness/Gimnasios**
```json
{
  "colors": { "primary": "#dc2626", "secondary": "#991b1b", "accent": "#fbbf24" },
  "fonts": { "heading": "Montserrat", "body": "Open Sans" },
  "sections": ["hero", "programs", "trainers", "results", "membership"],
  "special_features": ["workout_videos", "progress_tracker", "class_schedule"]
}
```

### **Para Inmobiliarias**
```json
{
  "colors": { "primary": "#1e40af", "secondary": "#1e3a8a", "accent": "#fbbf24" },
  "fonts": { "heading": "Inter", "body": "Inter" },
  "sections": ["hero", "properties", "services", "agents", "contact"],
  "special_features": ["property_gallery", "mortgage_calculator", "virtual_tour"]
}
```

## 🔧 **Herramientas Recomendadas**

### **Diseño**
- **Figma**: Para prototipos y mockups
- **Unsplash**: Imágenes de alta calidad gratuitas
- **Coolors.co**: Generador de paletas de colores
- **Google Fonts**: Tipografías web optimizadas

### **Desarrollo**
- **VS Code**: Editor recomendado
- **React DevTools**: Para debugging
- **Lighthouse**: Para performance
- **BrowserStack**: Para testing cross-browser

### **Assets**
- **Lucide Icons**: Iconos incluidos en el sistema
- **Hero Patterns**: Patrones SVG para backgrounds
- **Lottie**: Animaciones complejas (próximamente)

## 📈 **Mejores Prácticas**

### **Performance**
- ✅ Imágenes optimizadas (WebP, lazy loading)
- ✅ Fuentes preloadedas 
- ✅ Animaciones CSS vs JavaScript
- ✅ Critical CSS inline

### **UX/UI**
- ✅ Jerarquía visual clara
- ✅ CTA contrastante y visible
- ✅ Formularios simples (máx 5 campos)
- ✅ Navegación intuitiva

### **Conversión**
- ✅ Propuesta de valor en hero
- ✅ Social proof prominente
- ✅ Urgencia/escasez cuando aplique
- ✅ A/B testing de elementos clave

### **SEO**
- ✅ Títulos descriptivos (H1, H2)
- ✅ Alt text en imágenes
- ✅ Meta description personalizada
- ✅ Schema markup para rich snippets

## 🚀 **Próximos Pasos**

1. **Elige tu método** (API, Seeder, o Editor Visual)
2. **Define tu estructura** JSON completa
3. **Crea el template** usando la herramienta elegida
4. **Prueba y optimiza** con datos reales
5. **Comparte tu template** con la comunidad

¿Listo para crear tu template único? ¡Comienza con el método que mejor se adapte a tu nivel técnico! 