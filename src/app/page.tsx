import Link from 'next/link';
import { Rocket, Zap, BarChart3, Palette } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Rocket className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Landing Page Builder
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/register"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Comenzar Gratis
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8">
            Crea Landing Pages
            <span className="text-indigo-600"> Profesionales</span>
            <br />
            en Minutos
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Diseña, personaliza y publica landing pages de alta conversión sin conocimientos técnicos. 
            Captura leads, analiza métricas y haz crecer tu negocio.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/register"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center"
            >
              <Rocket className="mr-2 h-5 w-5" />
              Empezar Gratis
            </Link>
            <Link
              href="/login"
              className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-lg text-lg font-semibold"
            >
              Ver Demo
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Palette className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Diseño Profesional</h3>
            <p className="text-gray-600">
              Templates modernos y responsive. Personaliza colores, fuentes y contenido con nuestro editor visual.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Captura de Leads</h3>
            <p className="text-gray-600">
              Formularios optimizados para conversión. Captura contactos automáticamente y exporta tus leads.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Analytics Avanzados</h3>
            <p className="text-gray-600">
              Métricas en tiempo real. Monitorea visitas, conversiones y optimiza tu tasa de éxito.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-20">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-indigo-600">10k+</div>
              <div className="text-gray-600">Landing Pages Creadas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">85%</div>
              <div className="text-gray-600">Tasa de Conversión Promedio</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">50k+</div>
              <div className="text-gray-600">Leads Capturados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">24/7</div>
              <div className="text-gray-600">Soporte Técnico</div>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¿Listo para impulsar tu negocio?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Únete a miles de emprendedores que ya están convirtiendo más con nuestras landing pages.
          </p>
          <Link
            href="/register"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-4 rounded-lg text-xl font-semibold inline-flex items-center"
          >
            <Rocket className="mr-3 h-6 w-6" />
            Crear Mi Primera Landing Page
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Rocket className="h-6 w-6 text-indigo-400" />
            <span className="ml-2 text-lg font-semibold">Landing Page Builder</span>
          </div>
          <p className="text-gray-400">
            © 2025 Landing Page Builder. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
