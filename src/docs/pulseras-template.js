/**
 * 💎 TEMPLATE PERSONALIZADO: PULSERAS DE LUJO
 * 
 * Script listo para crear un template específico para vender pulseras
 * Incluye: Hero con imagen, 8 productos, formulario simple
 */

const createPulserasTemplate = async () => {
  const pulserasTemplateData = {
    name: "Pulseras de Lujo - Boutique",
    description: "Template elegante para venta de pulseras y joyería artesanal",
    content: {
      // 🎨 Colores elegantes para joyería
      colors: {
        primary: "#d4af37",       // Dorado elegante
        secondary: "#8b4513",     // Marrón cálido
        accent: "#ff69b4",        // Rosa vibrante 
        text: "#2c1810",          // Marrón oscuro
        background: "#fdf6e3"     // Crema suave
      },
      
      // 📝 Fuentes elegantes
      fonts: {
        heading: "Playfair Display",  // Serif elegante para títulos
        body: "Lato"                  // Sans-serif legible para texto
      },
      
      // ✨ Animaciones suaves para joyería
      animations: {
        hero: { type: "fadeInUp", duration: 1.2, delay: 0.3 },
        features: { type: "staggeredFadeIn", duration: 0.8, delay: 0.2 },
        typing_effect: { 
          enabled: true, 
          texts: [
            "Pulseras Únicas",
            "Diseños Exclusivos", 
            "Calidad Premium"
          ],
          speed: 120
        },
        parallax: { enabled: true, speed: 0.3 }
      },
      
      // 💎 Hero Section con pulsera destacada
      hero: {
        title: "Pulseras que Cuentan tu Historia",
        subtitle: "Joyería Artesanal de Lujo",
        description: "Descubre nuestra colección exclusiva de pulseras hechas a mano con materiales premium. Cada pieza es única y cuenta una historia especial.",
        cta_text: "Ver Colección",
        background: {
          type: "image",
          url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&h=1080&fit=crop",
          overlay: "rgba(212, 175, 55, 0.3)" // Overlay dorado suave
        }
      },
      
      // ⭐ Características de las pulseras
      features: {
        title: "¿Por Qué Elegir Nuestras Pulseras?",
        subtitle: "Calidad y exclusividad en cada detalle",
        items: [
          {
            icon: "gem",
            title: "Materiales Premium",
            description: "Plata 925, oro 18k y piedras naturales seleccionadas"
          },
          {
            icon: "award",
            title: "Diseño Exclusivo", 
            description: "Creaciones únicas que no encontrarás en otro lugar"
          },
          {
            icon: "heart",
            title: "Hecho con Amor",
            description: "Cada pulsera es elaborada artesanalmente con dedicación"
          },
          {
            icon: "shield",
            title: "Garantía de por Vida",
            description: "Respaldamos la calidad de nuestros productos"
          }
        ]
      },
      
      // 🛍️ Catálogo de 8 pulseras
      products: {
        title: "Nuestra Colección Exclusiva",
        subtitle: "Encuentra la pulsera perfecta para ti",
        layout: "grid",
        items: [
          {
            id: 1,
            name: "Pulsera Celestial",
            price: 89,
            currency: "USD",
            description: "Elegante pulsera de plata 925 con circonitas que brillan como las estrellas. Perfecta para ocasiones especiales.",
            images: [
              "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1611652022408-a03f2b3cb42c?w=400&h=400&fit=crop"
            ],
            category: "Plata",
            stock: "Disponible",
            features: ["Plata 925", "Circonitas AAA", "Cierre de seguridad"]
          },
          {
            id: 2,
            name: "Pulsera Bohemia",
            price: 65,
            currency: "USD", 
            description: "Pulsera artesanal con cuentas de turquesa natural y detalles en plata. Estilo bohemio único.",
            images: [
              "https://images.unsplash.com/photo-1611694946775-bbd55c04d157?w=400&h=400&fit=crop"
            ],
            category: "Piedras Naturales",
            stock: "Pocas Unidades",
            features: ["Turquesa natural", "Hilo encerado", "Ajustable"]
          },
          {
            id: 3,
            name: "Pulsera Dorada Elegance",
            price: 149,
            currency: "USD",
            description: "Sofisticada pulsera bañada en oro 18k con eslabones pulidos. El complemento perfecto para cualquier outfit.",
            images: [
              "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop"
            ],
            category: "Oro",
            stock: "Disponible",
            features: ["Baño oro 18k", "Eslabones pulidos", "Cierre italiano"]
          },
          {
            id: 4,
            name: "Pulsera Infinity Love",
            price: 75,
            currency: "USD",
            description: "Pulsera de plata con símbolo del infinito y corazón. Símbolo del amor eterno.",
            images: [
              "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop"
            ],
            category: "Romántica",
            stock: "Disponible", 
            features: ["Plata 925", "Símbolo infinito", "Grabado personalizable"]
          },
          {
            id: 5,
            name: "Pulsera Perlas Clásica",
            price: 95,
            currency: "USD",
            description: "Elegante pulsera con perlas cultivadas y cierre de plata. Clásica y atemporal.",
            images: [
              "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop"
            ],
            category: "Perlas",
            stock: "Disponible",
            features: ["Perlas cultivadas", "Cierre plata", "Enhebrado profesional"]
          },
          {
            id: 6,
            name: "Pulsera Cristal Rosa",
            price: 55,
            currency: "USD",
            description: "Delicada pulsera con cristales rosas y cadena de plata. Perfecta para el día a día.",
            images: [
              "https://images.unsplash.com/photo-1594736797933-d0c7d20f80a5?w=400&h=400&fit=crop"
            ],
            category: "Cristales",
            stock: "Disponible",
            features: ["Cristales rosa", "Cadena plata", "Diseño minimalista"]
          },
          {
            id: 7,
            name: "Pulsera Vintage Charm",
            price: 120,
            currency: "USD",
            description: "Pulsera estilo vintage con charms únicos y acabado envejecido. Para personalidades auténticas.",
            images: [
              "https://images.unsplash.com/photo-1588444650784-7c94d6e41c6c?w=400&h=400&fit=crop"
            ],
            category: "Vintage",
            stock: "Edición Limitada",
            features: ["Charms únicos", "Acabado vintage", "Coleccionable"]
          },
          {
            id: 8,
            name: "Pulsera Tennis Premium",
            price: 199,
            currency: "USD",
            description: "Lujosa pulsera tennis con circonitas de máxima calidad engarzadas en plata rhodiada.",
            images: [
              "https://images.unsplash.com/photo-1630019852942-f89202989694?w=400&h=400&fit=crop"
            ],
            category: "Lujo",
            stock: "Pocas Unidades", 
            features: ["Circonitas AAA+", "Plata rhodiada", "Engarzado perfecto"]
          }
        ]
      },
      
      // 📊 Estadísticas del negocio
      stats: {
        title: "Números que Nos Respaldan",
        items: [
          { number: "2500", label: "Clientes Felices", suffix: "+" },
          { number: "5", label: "Años de Experiencia", suffix: "+" },
          { number: "100", label: "Diseños Únicos", suffix: "+" },
          { number: "99", label: "Satisfacción", suffix: "%" }
        ]
      },
      
      // 💬 Testimoniales de clientas
      testimonials: {
        title: "Lo Que Dicen Nuestras Clientas",
        items: [
          {
            name: "Sofia Martinez",
            role: "Cliente VIP",
            content: "¡Increíble calidad! Mi pulsera Celestial es perfecta, recibo cumplidos todo el tiempo. Definitivamente volveré a comprar.",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
            rating: 5
          },
          {
            name: "Ana Rodriguez", 
            role: "Coleccionista",
            content: "Tengo 5 pulseras de esta tienda y todas son hermosas. La atención al cliente es excepcional.",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
            rating: 5
          },
          {
            name: "Carmen Lopez",
            role: "Influencer",
            content: "La calidad es impresionante, parecen más caras de lo que cuestan. Mi audiencia siempre pregunta dónde las compro.",
            avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100", 
            rating: 5
          }
        ]
      },
      
      // 📝 Formulario simple con solo nombre, correo y WhatsApp
      form: {
        title: "¿Te Gustó Alguna Pulsera?",
        subtitle: "Contáctanos y te ayudaremos a elegir la perfecta para ti",
        cta_text: "Enviar Consulta",
        success_message: "¡Gracias! Te contactaremos por WhatsApp muy pronto 💎",
        fields: [
          { 
            name: "name", 
            label: "Nombre Completo", 
            type: "text", 
            required: true,
            icon: "user",
            placeholder: "¿Cómo te llamas?"
          },
          { 
            name: "email", 
            label: "Correo Electrónico", 
            type: "email", 
            required: true,
            icon: "mail",
            placeholder: "tu@email.com"
          },
          { 
            name: "whatsapp", 
            label: "WhatsApp", 
            type: "tel", 
            required: true,
            icon: "phone",
            placeholder: "+1 234 567 8900"
          }
        ],
        privacy_text: "Tus datos están seguros. Solo los usamos para contactarte sobre nuestras pulseras.",
        whatsapp_integration: {
          enabled: true,
          number: "+1234567890", // Cambia por tu número
          message_template: "Hola! Me interesa información sobre las pulseras que vi en su página web."
        }
      },
      
      // 🔗 Social proof
      social_proof: {
        title: "Síguenos en Redes Sociales",
        subtitle: "Para ver más diseños y ofertas exclusivas",
        links: [
          { platform: "instagram", url: "https://instagram.com/tupulseras", followers: "10K" },
          { platform: "facebook", url: "https://facebook.com/tupulseras", followers: "5K" },
          { platform: "whatsapp", url: "https://wa.me/1234567890", text: "WhatsApp Directo" }
        ]
      }
    },
    preview_image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop",
    is_premium: false,
    is_active: true
  };

  // 🚀 Crear el template
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('❌ Necesitas estar logueado. Ve a /login primero.');
      return;
    }
    
    console.log('🚀 Creando template de pulseras...');
    
    const response = await fetch('/api/templates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(pulserasTemplateData)
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Template de pulseras creado exitosamente:', result.data);
      alert(`🎉 ¡Template "${pulserasTemplateData.name}" creado con éxito!\n\nID: ${result.data.id}\n\n¿Quieres crear una landing page ahora?`);
      
      // Crear landing page automáticamente
      if (confirm('¿Crear landing page con este template ahora?')) {
        await createPulserasLanding(result.data.id, token);
      }
      
    } else {
      console.error('❌ Error:', result);
      alert(`❌ Error al crear template: ${result.message || 'Error desconocido'}`);
    }
    
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    alert('❌ Error de conexión. Verifica:\n1. Que estés logueado\n2. Que el backend esté funcionando\n3. Tu conexión a internet');
  }
};

// 🏪 Función para crear landing page automáticamente
const createPulserasLanding = async (templateId, token) => {
  try {
    console.log('🏪 Creando landing page...');
    
    // Obtener user_id del token
    const tokenData = JSON.parse(atob(token.split('.')[1]));
    
    const landingData = {
      title: "Pulseras de Lujo - Mi Tienda",
      slug: `pulseras-lujo-${Date.now()}`, // Slug único
      template_id: templateId,
      user_id: tokenData.sub,
      content: pulserasTemplateData.content, // Usar el mismo contenido
      is_active: true
    };
    
    const response = await fetch('/api/landings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(landingData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Landing page creada:', result.data);
      alert(`🎉 ¡Landing page creada exitosamente!\n\nURL: ${window.location.origin}/l/${result.data.slug}\n\n¡Redirigiendo al editor...`);
      
      // Redirigir al editor
      setTimeout(() => {
        window.location.href = `/dashboard/landing/${result.data.id}`;
      }, 2000);
    } else {
      console.error('❌ Error creando landing:', result);
      alert('❌ Error al crear landing page: ' + result.message);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
    alert('❌ Error al crear landing page');
  }
};

// 📖 Instrucciones de uso
console.log(`
💎 TEMPLATE DE PULSERAS - INSTRUCCIONES:

1. 🔐 Asegúrate de estar logueado en /dashboard
2. 🌐 Abre la consola del navegador (F12)
3. 📋 Pega este script completo
4. ▶️ Ejecuta: createPulserasTemplate()
5. ✨ ¡Tu template estará listo!

🎨 PERSONALIZACIÓN RÁPIDA:
- Cambia los colores en la sección 'colors'
- Modifica los productos en 'products.items'
- Actualiza tu número de WhatsApp en 'whatsapp_integration'

🚀 El script creará automáticamente:
✅ Template optimizado para pulseras
✅ Hero section con imagen elegante
✅ 8 productos con precios y descripciones
✅ Formulario simple (nombre, email, WhatsApp)
✅ Landing page lista para usar

¡Ejecuta createPulserasTemplate() cuando estés listo!
`);

// Hacer disponible globalmente
window.createPulserasTemplate = createPulserasTemplate; 