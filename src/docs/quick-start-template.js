/**
 * 🚀 QUICK START: Crear Template Personalizado
 * 
 * Copia este script, modifica los valores y ejecútalo en la consola
 * del navegador en tu dashboard (/dashboard/create)
 */

const createMyTemplate = async () => {
  // ✏️ PERSONALIZA ESTOS VALORES
  const myTemplateData = {
    name: "Mi Negocio - Template Único",
    description: "Template personalizado para mi empresa",
    content: {
      // 🎨 Colores de tu marca
      colors: {
        primary: "#ff6b6b",     // Tu color principal
        secondary: "#4ecdc4",   // Tu color secundario
        accent: "#45b7d1",      // Color de acentos/botones
        text: "#2c3e50",        // Color de texto
        background: "#ffffff"   // Color de fondo
      },
      
      // 📝 Fuentes
      fonts: {
        heading: "Montserrat",  // Fuente para títulos
        body: "Open Sans"       // Fuente para texto
      },
      
      // ✨ Animaciones
      animations: {
        hero: { type: "fadeInUp", duration: 1.0, delay: 0.2 },
        features: { type: "staggeredFadeIn", duration: 0.8, delay: 0.1 },
        typing_effect: { 
          enabled: true, 
          texts: [
            "Tu Texto 1",
            "Tu Texto 2", 
            "Tu Texto 3"
          ]
        },
        counter: { enabled: true, duration: 2.0 }
      },
      
      // 🦸‍♂️ Sección Hero
      hero: {
        title: "Tu Título Principal Aquí",
        subtitle: "Tu Subtítulo Impactante",
        description: "Descripción de tu propuesta de valor única que convence a tus visitantes de tomar acción inmediatamente.",
        cta_text: "Comenzar Ahora",
        background: {
          type: "gradient",
          colors: ["#ff6b6b", "#4ecdc4"]
        }
      },
      
      // ⭐ Características
      features: {
        title: "¿Por Qué Elegir [Tu Empresa]?",
        subtitle: "Las razones que nos hacen únicos",
        items: [
          {
            icon: "zap",
            title: "Rapidez",
            description: "Resultados en tiempo récord"
          },
          {
            icon: "shield",
            title: "Confiabilidad", 
            description: "Garantía total en nuestro trabajo"
          },
          {
            icon: "heart",
            title: "Atención Personal",
            description: "Trato cercano y personalizado"
          }
        ]
      },
      
      // 📊 Estadísticas
      stats: {
        title: "Números que Nos Respaldan",
        items: [
          { number: "500", label: "Clientes Satisfechos", suffix: "+" },
          { number: "99", label: "Satisfacción", suffix: "%" },
          { number: "5", label: "Años de Experiencia", suffix: "+" },
          { number: "24", label: "Soporte", suffix: "/7" }
        ]
      },
      
      // 💬 Testimoniales
      testimonials: {
        title: "Lo Que Dicen Nuestros Clientes",
        items: [
          {
            name: "Ana García",
            role: "CEO, MiEmpresa",
            content: "Excelente servicio, superaron todas mis expectativas. Totalmente recomendados.",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
            rating: 5
          },
          {
            name: "Carlos López",
            role: "Director, InnovaCorp",
            content: "Profesionales excepcionales. Los resultados hablan por sí solos.",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", 
            rating: 5
          }
        ]
      },
      
      // 💰 Precios
      pricing: {
        title: "Nuestros Planes",
        subtitle: "Elige el que mejor se adapte a ti",
        plans: [
          {
            name: "Básico",
            price: 99,
            period: "mes",
            popular: false,
            features: [
              "Característica 1",
              "Característica 2",
              "Soporte por email"
            ],
            cta_text: "Empezar"
          },
          {
            name: "Pro",
            price: 199,
            period: "mes", 
            popular: true,
            features: [
              "Todo lo del Básico",
              "Característica Premium 1",
              "Característica Premium 2",
              "Soporte prioritario"
            ],
            cta_text: "Elegir Pro"
          }
        ]
      },
      
      // 📝 Formulario
      form: {
        title: "¿Listo para Comenzar?",
        subtitle: "Contáctanos y te ayudaremos a alcanzar tus objetivos",
        cta_text: "Enviar Mensaje",
        fields: [
          { name: "name", label: "Nombre", type: "text", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "phone", label: "Teléfono", type: "tel", required: false },
          { name: "company", label: "Empresa", type: "text", required: false },
          { name: "message", label: "¿Cómo podemos ayudarte?", type: "textarea", required: true }
        ],
        privacy_text: "Tus datos están seguros. No compartimos información con terceros."
      }
    },
    preview_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    is_premium: false,
    is_active: true
  };

  // 🚀 Crear el template
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch('/api/templates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(myTemplateData)
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Template creado exitosamente:', result.data);
      alert(`¡Template "${myTemplateData.name}" creado con éxito! ID: ${result.data.id}`);
      
      // Opcional: Crear landing page inmediatamente
      if (confirm('¿Quieres crear una landing page con este template ahora?')) {
        const landingResponse = await fetch('/api/landings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            title: `Landing de ${myTemplateData.name}`,
            template_id: result.data.id,
            user_id: JSON.parse(atob(token.split('.')[1])).sub, // Extraer user_id del JWT
            content: myTemplateData.content
          })
        });
        
        const landingResult = await landingResponse.json();
        if (landingResult.success) {
          console.log('✅ Landing page creada:', landingResult.data);
          window.location.href = `/dashboard/landing/${landingResult.data.id}`;
        }
      }
      
    } else {
      console.error('❌ Error:', result.message);
      alert('Error al crear template: ' + result.message);
    }
    
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    alert('Error de conexión. Verifica que estés logueado.');
  }
};

// 🎯 INSTRUCCIONES DE USO:
console.log(`
🚀 CÓMO USAR ESTE SCRIPT:

1. Ve a tu dashboard: ${window.location.origin}/dashboard/create
2. Abre la consola del navegador (F12)
3. Modifica los valores en myTemplateData arriba
4. Pega este script completo en la consola
5. Ejecuta: createMyTemplate()
6. ¡Tu template se creará automáticamente!

✨ TIP: Puedes modificar cualquier valor del objeto myTemplateData
antes de ejecutar la función.
`);

// También exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createMyTemplate };
} 