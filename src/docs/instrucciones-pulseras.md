# 💎 **INSTRUCCIONES: Template de Pulseras**

## 🚀 **Pasos Para Crear Tu Template**

### **Paso 1: Preparación**
1. Ve a tu dashboard: `http://localhost:3000/dashboard`
2. Asegúrate de estar logueado
3. Abre la consola del navegador (tecla F12)

### **Paso 2: Ejecutar el Script**
1. Copia el script completo del archivo `pulseras-template.js`
2. Pégalo en la consola del navegador
3. Ejecuta: `createPulserasTemplate()`
4. ¡Espera a que se cree automáticamente!

### **Paso 3: Personalizar (Opcional)**
Antes de ejecutar, puedes modificar:

```javascript
// 🎨 Colores (línea ~20)
colors: {
  primary: "#d4af37",    // Cambia el dorado
  secondary: "#8b4513",  // Cambia el marrón
  accent: "#ff69b4",     // Cambia el rosa
}

// 📱 Tu WhatsApp (línea ~350)
whatsapp_integration: {
  number: "+1234567890", // ⚠️ CAMBIA POR TU NÚMERO
  message_template: "Hola! Me interesan las pulseras..."
}
```

## 🛍️ **Los 8 Productos Incluidos**

1. **Pulsera Celestial** - $89 (Plata 925 con circonitas)
2. **Pulsera Bohemia** - $65 (Turquesa natural)
3. **Pulsera Dorada Elegance** - $149 (Baño oro 18k)
4. **Pulsera Infinity Love** - $75 (Plata con infinito)
5. **Pulsera Perlas Clásica** - $95 (Perlas cultivadas)
6. **Pulsera Cristal Rosa** - $55 (Cristales rosas)
7. **Pulsera Vintage Charm** - $120 (Estilo vintage)
8. **Pulsera Tennis Premium** - $199 (Lujo con circonitas)

## 📝 **Formulario de Contacto**

Campos incluidos:
- ✅ Nombre Completo
- ✅ Correo Electrónico  
- ✅ WhatsApp

¡Exactamente como pediste!

## 🎨 **Personalización Rápida**

### **Cambiar Precios:**
```javascript
// Busca en products.items (línea ~80)
{
  name: "Pulsera Celestial",
  price: 89, // ← Cambia este número
  currency: "USD",
}
```

### **Cambiar Descripciones:**
```javascript
{
  name: "Pulsera Celestial", 
  description: "Tu nueva descripción aquí...", // ← Edita esto
}
```

### **Cambiar Imágenes:**
```javascript
{
  images: [
    "https://tu-nueva-imagen.com" // ← URL de tu imagen
  ]
}
```

## ✨ **Lo Que Pasará:**

1. **Se crea el template** automáticamente
2. **Se crea una landing page** lista para usar
3. **Te redirige al editor** para ajustes finales
4. **¡Tu tienda estará lista!**

## 🔧 **Personalización Avanzada**

Si quieres cambiar algo específico, dime y te ayudo:
- Agregar más productos
- Cambiar colores de marca
- Modificar textos
- Ajustar precios
- Cambiar imágenes

## 📱 **URLs Finales**

Después de ejecutar tendrás:
- **Template creado** en tu biblioteca
- **Landing page activa** en `/l/tu-slug`
- **Editor disponible** en `/dashboard/landing/ID`

¡Ejecuta el script y en 2 minutos tendrás tu tienda de pulseras funcionando! 💎 