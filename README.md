# 🎨 Landing Page Builder - Frontend App

Aplicación frontend construida con **Next.js 15** y **TypeScript** para el sistema de Landing Page Builder. Proporciona autenticación, dashboard completo, creación de landing pages y visualización de analytics.

## 📋 **Tabla de Contenidos**

- [Instalación](#instalación)
- [Configuración](#configuración)
- [Arquitectura](#arquitectura)
- [Estructura de Rutas](#estructura-de-rutas)
- [Componentes](#componentes)
- [Servicios API](#servicios-api)
- [Autenticación](#autenticación)
- [TypeScript](#typescript)
- [Funcionalidades](#funcionalidades)
- [Próximos Pasos](#próximos-pasos)

## 🛠️ **Instalación**

### Prerrequisitos
- Node.js 18+
- npm o yarn
- Backend API funcionando en `localhost:8000`

### Pasos de instalación

```bash
# 1. Ir al directorio del frontend
cd landing-page-builder-app

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local

# 4. Iniciar servidor de desarrollo
npm run dev

# 5. Abrir en navegador
# http://localhost:3000
```

## ⚙️ **Configuración**

### Variables de entorno (.env.local)

```env
# API Backend
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# App Configuration
NEXT_PUBLIC_APP_NAME="Landing Page Builder"
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Analytics (para futuro)
# NEXT_PUBLIC_GA_ID=GA_MEASUREMENT_ID
# NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_pixel_id
```

### Configuración Next.js

```javascript
// next.config.ts
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    domains: ['localhost'],
  },
};
```

## 🏗️ **Arquitectura**

### Estructura del proyecto

```
landing-page-builder-app/
├── src/
│   ├── app/                              # App Router (Next.js 13+)
│   │   ├── (auth)/                       # Grupo de rutas de autenticación
│   │   │   ├── login/
│   │   │   │   └── page.tsx              # Página de login
│   │   │   └── register/
│   │   │       └── page.tsx              # Página de registro
│   │   ├── (dashboard)/                  # Grupo de rutas protegidas
│   │   │   └── dashboard/
│   │   │       ├── create/
│   │   │       │   └── page.tsx          # Crear landing page
│   │   │       ├── landing/
│   │   │       │   └── [id]/
│   │   │       │       └── page.tsx      # Detalle de landing page
│   │   │       └── page.tsx              # Dashboard principal
│   │   ├── l/                            # Landing pages públicas
│   │   │   └── [slug]/
│   │   │       └── page.tsx              # Vista pública de landing page
│   │   ├── layout.tsx                    # Layout principal con AuthProvider
│   │   ├── page.tsx                      # Página de inicio
│   │   └── globals.css                   # Estilos globales
│   ├── components/
│   │   └── Loading.tsx                   # Componente de carga
│   ├── lib/
│   │   ├── api.ts                        # Servicio API principal
│   │   └── auth-context.tsx              # Context de autenticación
│   └── types/
│       └── index.ts                      # Tipos TypeScript
├── middleware.ts                         # Middleware de rutas
├── package.json
├── tsconfig.json
└── README.md
```

### Patrones de arquitectura implementados

- **App Router** (Next.js 13+) para enrutamiento moderno
- **Route Groups** para organizar rutas por funcionalidad
- **Server Components** por defecto con Client Components cuando se necesita interactividad
- **Context API** para gestión de estado de autenticación
- **Custom Hooks** para lógica reutilizable
- **Middleware** para protección de rutas

## 🛣️ **Estructura de Rutas**

### Rutas públicas (sin autenticación)
```
/                           # Página de inicio/landing
/login                      # Iniciar sesión
/register                   # Registrarse
/l/[slug]                   # Landing pages públicas
```

### Rutas protegidas (requieren autenticación)
```
/dashboard                  # Dashboard principal
/dashboard/create           # Crear nueva landing page
/dashboard/landing/[id]     # Detalle y analytics de landing page
```

### Middleware de protección

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // Rutas públicas
  const publicRoutes = ['/l/'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // Rutas protegidas
  const protectedRoutes = ['/dashboard'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // Redirecciones automáticas
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}
```

## 🧩 **Componentes**

### Componente de Loading

```typescript
// src/components/Loading.tsx
interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export default function Loading({ 
  message = "Cargando...", 
  size = "md", 
  fullScreen = false 
}: LoadingProps)
```

### Componentes por implementar (sugeridos)

```typescript
// Componentes del Dashboard
- DashboardStats           # Tarjetas de estadísticas
- LandingPageCard         # Card para lista de landing pages
- Analytics Chart         # Gráficos de analytics
- LeadsList              # Lista de leads
- TemplateSelector       # Selector de templates

// Componentes del Editor
- TemplatePreview        # Preview de templates
- FormBuilder           # Constructor de formularios
- ColorPicker           # Selector de colores
- ContentEditor         # Editor de contenido

// Componentes Comunes
- Button                # Botón reutilizable
- Input                 # Input reutilizable
- Modal                 # Modal reutilizable
- Table                 # Tabla reutilizable
- Pagination           # Paginación
- SearchBar            # Barra de búsqueda
```

## 🔗 **Servicios API**

### Clase ApiService

```typescript
// src/lib/api.ts
class ApiService {
  private api: AxiosInstance;

  // Configuración automática de headers y interceptors
  constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    this.setupInterceptors();
  }
}
```

### Métodos implementados

#### Autenticación
```typescript
- login(credentials): Promise<AuthResponse>
- register(data): Promise<ApiResponse<User>>
- logout(): Promise<void>
- getCurrentUser(): Promise<User>
- refreshToken(): Promise<AuthResponse>
```

#### Templates
```typescript
- getTemplates(): Promise<ApiResponse<Template[]>>
- getFreeTemplates(): Promise<ApiResponse<Template[]>>
- getPremiumTemplates(): Promise<ApiResponse<Template[]>>
- getTemplate(id): Promise<ApiResponse<Template>>
```

#### Landing Pages
```typescript
- getLandings(): Promise<ApiResponse<Landing[]>>
- createLanding(data): Promise<ApiResponse<Landing>>
- getLanding(id): Promise<ApiResponse<Landing>>
- updateLanding(id, data): Promise<ApiResponse<Landing>>
- deleteLanding(id): Promise<ApiResponse>
- duplicateLanding(id): Promise<ApiResponse<Landing>>
- getLandingAnalytics(id): Promise<ApiResponse<LandingAnalytics>>
- getLandingBySlug(slug): Promise<ApiResponse<Landing>>
```

#### Leads
```typescript
- getLeads(): Promise<ApiResponse<Lead[]>>
- getLead(id): Promise<ApiResponse<Lead>>
- updateLead(id, data): Promise<ApiResponse<Lead>>
- deleteLead(id): Promise<ApiResponse>
- submitLead(data): Promise<ApiResponse<Lead>>
- getLeadsStats(): Promise<ApiResponse>
- exportLeads(): Promise<Blob>
```

#### Dashboard
```typescript
- getDashboardStats(userId?): Promise<ApiResponse<DashboardStats>>
```

#### Utilidades
```typescript
- checkSlugAvailability(slug): Promise<ApiResponse<{available: boolean}>>
- generateSlug(title): Promise<ApiResponse<{slug: string}>>
- isAuthenticated(): boolean
- getToken(): string | undefined
```

## 🔐 **Autenticación**

### Context de Autenticación

```typescript
// src/lib/auth-context.tsx
interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }>
export const useAuth = () => useContext(AuthContext)
```

### Funcionalidades de autenticación

- **JWT Token Management** - Almacenamiento automático en cookies
- **Auto-refresh** - Renovación automática de tokens expirados
- **Persistent Session** - Mantiene sesión al recargar página
- **Automatic Logout** - Logout automático en errores 401
- **Loading States** - Estados de carga durante autenticación

### Uso en componentes

```typescript
// En cualquier componente
const { user, login, logout, loading } = useAuth();

// Login programático
const handleLogin = async (credentials) => {
  try {
    await login(credentials);
    router.push('/dashboard');
  } catch (error) {
    setError('Credenciales inválidas');
  }
};
```

## 📝 **TypeScript**

### Tipos principales implementados

```typescript
// src/types/index.ts

// Autenticación
interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

// Templates
interface Template {
  id: number;
  name: string;
  description: string;
  content: TemplateContent;
  preview_image?: string;
  is_active: boolean;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
}

// Landing Pages
interface Landing {
  id: number;
  user_id: number;
  template_id: number;
  title: string;
  slug: string;
  description?: string;
  content: any;
  custom_domain?: string;
  is_active: boolean;
  views_count: number;
  leads_count: number;
  created_at: string;
  updated_at: string;
  user?: User;
  template?: Template;
  leads?: Lead[];
}

// Leads
interface Lead {
  id: number;
  landing_id: number;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  source?: string;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  updated_at: string;
  landing?: Landing;
}

// Analytics
interface DashboardStats {
  total_landings: number;
  total_leads: number;
  total_views: number;
  conversion_rate: number;
  recent_leads: Lead[];
  top_performing_landings: Array<{
    landing: Landing;
    views: number;
    leads: number;
    conversion_rate: number;
  }>;
}

// API Responses
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}
```

## ✅ **Funcionalidades Implementadas**

### ✅ Sistema de Autenticación
- [x] Login con validación
- [x] Registro con confirmación de password
- [x] Logout automático
- [x] Persistencia de sesión
- [x] Redirecciones automáticas
- [x] Manejo de errores

### ✅ Dashboard
- [x] Estadísticas en tiempo real
- [x] Lista de landing pages
- [x] Actividad reciente
- [x] Métricas de conversión
- [x] Navegación intuitiva

### ✅ Gestión de Landing Pages
- [x] Creación con selección de template
- [x] Vista detallada con analytics
- [x] Acciones (duplicar, eliminar)
- [x] Lista paginada y filtrable
- [x] Estados de activación

### ✅ Landing Pages Públicas
- [x] Renderizado por slug
- [x] Formulario funcional de captura
- [x] Diseño responsive
- [x] Colores personalizables
- [x] Confirmación de envío

### ✅ Interfaz de Usuario
- [x] Diseño moderno con Tailwind CSS
- [x] Iconografía con Lucide React
- [x] Estados de carga
- [x] Responsive design
- [x] Modo claro (dark mode pendiente)

### ✅ Gestión de Estado
- [x] Context API para autenticación
- [x] Estado local con useState
- [x] Manejo de errores
- [x] Loading states

## 🎨 **Estilos y UI**

### Tecnologías utilizadas

- **Tailwind CSS** - Framework de CSS utility-first
- **Lucide React** - Librería de iconos
- **CSS Grid & Flexbox** - Layout moderno
- **Custom Properties** - Variables CSS para temas

### Paleta de colores

```css
/* Colores principales */
--color-primary: #3b82f6;      /* Blue-500 */
--color-secondary: #1e40af;    /* Blue-700 */
--color-success: #10b981;      /* Green-500 */
--color-warning: #f59e0b;      /* Yellow-500 */
--color-error: #ef4444;        /* Red-500 */

/* Grises */
--color-gray-50: #f9fafb;
--color-gray-100: #f3f4f6;
--color-gray-900: #111827;
```

### Componentes de UI (por implementar)

```typescript
// Design System recomendado
- Button variants: primary, secondary, outline, ghost
- Input types: text, email, password, textarea, select
- Card: shadow levels, hover states
- Badge: status colors
- Alert: info, success, warning, error
- Modal: overlay, animation, focus trap
- Tooltip: hover states, positioning
```

## 📦 **Dependencias**

### Principales
```json
{
  "next": "15.0.3",
  "react": "18.0.0",
  "typescript": "5.0.0",
  "tailwindcss": "3.4.0",
  "axios": "1.6.0",
  "js-cookie": "3.0.5",
  "lucide-react": "0.400.0"
}
```

### DevDependencies
```json
{
  "@types/js-cookie": "3.0.6",
  "@types/node": "20.0.0",
  "@types/react": "18.0.0",
  "eslint": "8.0.0",
  "eslint-config-next": "15.0.3",
  "postcss": "8.4.0"
}
```

## 🚧 **Próximos Pasos Sugeridos**

### 🎯 Prioridad Alta

1. **Dashboard Analytics Avanzados**
   ```typescript
   // Gráficos interactivos
   - Chart.js o Recharts para gráficos
   - Filtros por fecha
   - Comparativas período anterior
   - Métricas en tiempo real
   ```

2. **Editor Visual de Landing Pages**
   ```typescript
   // Drag & Drop Builder
   - React DnD o dnd-kit
   - Componentes arrastrables
   - Preview en tiempo real
   - Customización visual
   ```

3. **Gestión de Leads Avanzada**
   ```typescript
   // CRM básico
   - Filtros avanzados
   - Exportación CSV/Excel
   - Tags y categorización
   - Notas y seguimiento
   ```

### 🔧 Prioridad Media

1. **Sistema de Notificaciones**
   ```typescript
   // Toast notifications
   - React Hot Toast
   - Notificaciones push
   - Email notifications
   - Configuración de alertas
   ```

2. **Internacionalización**
   ```typescript
   // Multi-idioma
   - next-i18next
   - Español/Inglés
   - Detección automática
   - Textos configurables
   ```

3. **Testing**
   ```typescript
   // Testing setup
   - Jest + React Testing Library
   - E2E con Playwright
   - Unit tests para componentes
   - API mocking
   ```

### 🚀 Prioridad Baja

1. **PWA (Progressive Web App)**
   ```typescript
   // App instalable
   - Service Worker
   - Offline functionality
   - App manifest
   - Push notifications
   ```

2. **Dark Mode**
   ```typescript
   // Tema oscuro
   - Toggle theme
   - Persistencia de preferencia
   - Detección sistema
   - Animaciones de transición
   ```

3. **Performance Optimization**
   ```typescript
   // Optimizaciones
   - Image optimization
   - Code splitting
   - Lazy loading
   - Bundle analysis
   ```

## 🧪 **Scripts Disponibles**

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo
npm run build           # Build de producción
npm run start           # Servidor de producción
npm run lint            # Linter ESLint
npm run type-check      # Verificación TypeScript

# Por implementar
npm run test            # Tests unitarios
npm run test:e2e        # Tests E2E
npm run analyze         # Análisis de bundle
npm run storybook       # Storybook UI
```

## 🔧 **Comandos Útiles**

```bash
# Limpiar cache y reinstalar
rm -rf .next node_modules package-lock.json
npm install

# Verificar tipos TypeScript
npx tsc --noEmit

# Análisis de bundle
npm run build && npx @next/bundle-analyzer

# Generar componente
npx create-next-component ComponentName

# Actualizar dependencias
npx npm-check-updates -u && npm install
```

## 🤝 **Contribución**

### Estructura de commits
```bash
git commit -m "feat: agregar componente de analytics"
git commit -m "fix: corregir error en autenticación"
git commit -m "docs: actualizar README"
git commit -m "style: mejorar responsive design"
```

### Proceso de desarrollo
1. **Fork** y crear feature branch
2. **Desarrollar** con TypeScript estricto
3. **Testing** unitario e integración
4. **Lint** y format code
5. **Pull Request** con descripción detallada

## 📞 **Soporte y Debugging**

### Logs y debugging
```bash
# Logs del servidor
npm run dev -- --verbose

# Debug en browser
console.log en desarrollo
React DevTools
Network tab para API calls

# Verificar API calls
localStorage.getItem('auth_token')
document.cookie
```

### Problemas comunes
- **CORS errors**: Verificar backend CORS config
- **Auth loops**: Limpiar cookies y localStorage
- **Build errors**: Verificar TypeScript types
- **API errors**: Comprobar backend status

---

## 🎯 **Objetivos del MVP**

### ✅ Completado
- [x] Autenticación completa
- [x] Dashboard funcional
- [x] Creación de landing pages
- [x] Vista pública de landing pages
- [x] Captura de leads
- [x] Analytics básicos

### 🎯 Próximo MVP Sprint
- [ ] Editor visual básico
- [ ] Analytics avanzados
- [ ] Notificaciones
- [ ] Más templates
- [ ] Sistema de planes

**¡El frontend está listo para escalar! 🚀**
