'use client';

import React, { useState } from 'react';
import { Eye, Download, Palette, Type, Image, Zap } from 'lucide-react';
import LandingRenderer from './LandingRenderer';

interface TemplateCustomizerProps {
  initialTemplate: any;
  onSave?: (customizedTemplate: any) => void;
}

const TemplateCustomizer: React.FC<TemplateCustomizerProps> = ({ initialTemplate, onSave }) => {
  // Asegurar que el template inicial tenga una estructura básica
  const [template, setTemplate] = useState(() => {
    const defaultTemplate = {
      colors: {
        primary: '#3b82f6',
        secondary: '#1e40af',
        accent: '#fbbf24',
        background: '#ffffff',
        text: '#1f2937'
      },
      fonts: {
        heading: 'Inter',
        body: 'Inter'
      },
      animations: {
        hero: { type: 'fadeInUp', duration: 1.0 },
        features: { type: 'fadeInUp', duration: 1.0 }
      },
      hero: {
        title: 'Tu Título Aquí',
        subtitle: 'Subtítulo explicativo',
        description: 'Descripción detallada de tu propuesta de valor',
        cta_text: 'Comenzar Ahora'
      },
      ...initialTemplate
    };
    return defaultTemplate;
  });
  
  const [activeTab, setActiveTab] = useState('colors');

  const updateTemplate = (path: string, value: any) => {
    const keys = path.split('.');
    const updated = JSON.parse(JSON.stringify(template));
    
    let current = updated;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    setTemplate(updated);
  };

  const updateColorPalette = (preset: { primary: string; secondary: string; accent: string }) => {
    const updated = JSON.parse(JSON.stringify(template));
    if (!updated.colors) updated.colors = {};
    updated.colors.primary = preset.primary;
    updated.colors.secondary = preset.secondary;
    updated.colors.accent = preset.accent;
    setTemplate(updated);
  };

  const updateFontPair = (pair: { heading: string; body: string }) => {
    const updated = JSON.parse(JSON.stringify(template));
    if (!updated.fonts) updated.fonts = {};
    updated.fonts.heading = pair.heading;
    updated.fonts.body = pair.body;
    setTemplate(updated);
  };

  const colorPresets = [
    { name: 'Tech Blue', primary: '#3b82f6', secondary: '#1e40af', accent: '#fbbf24' },
    { name: 'Elegant Black', primary: '#1f2937', secondary: '#111827', accent: '#d4af37' },
    { name: 'Nature Green', primary: '#10b981', secondary: '#047857', accent: '#f59e0b' },
    { name: 'Passion Red', primary: '#ef4444', secondary: '#dc2626', accent: '#fbbf24' },
    { name: 'Royal Purple', primary: '#8b5cf6', secondary: '#7c3aed', accent: '#f59e0b' },
  ];

  const fontPairs = [
    { name: 'Modern', heading: 'Inter', body: 'Inter' },
    { name: 'Elegant', heading: 'Playfair Display', body: 'Lato' },
    { name: 'Clean', heading: 'Montserrat', body: 'Open Sans' },
    { name: 'Classic', heading: 'Roboto', body: 'Source Sans Pro' },
    { name: 'Creative', heading: 'Poppins', body: 'Nunito' },
  ];

  const animationOptions = [
    { name: 'Suave', type: 'fadeInUp', duration: 0.8 },
    { name: 'Dinámico', type: 'slideInLeft', duration: 0.6 },
    { name: 'Energético', type: 'bounceIn', duration: 1.0 },
    { name: 'Elegante', type: 'staggeredFadeIn', duration: 1.2 },
  ];

  const renderColorTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Paletas Predefinidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {colorPresets.map((preset, index) => (
            <button
              key={index}
              onClick={() => updateColorPalette(preset)}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div 
                  className="w-6 h-6 rounded-full" 
                  style={{ backgroundColor: preset.primary }}
                />
                <div 
                  className="w-6 h-6 rounded-full" 
                  style={{ backgroundColor: preset.secondary }}
                />
                <div 
                  className="w-6 h-6 rounded-full" 
                  style={{ backgroundColor: preset.accent }}
                />
              </div>
              <p className="text-sm font-medium">{preset.name}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Personalización Manual</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Color Primario</label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={template.colors?.primary || '#3b82f6'}
                onChange={(e) => updateTemplate('colors.primary', e.target.value)}
                className="w-12 h-10 border rounded"
              />
              <input
                type="text"
                value={template.colors?.primary || '#3b82f6'}
                onChange={(e) => updateTemplate('colors.primary', e.target.value)}
                className="flex-1 px-3 py-2 border rounded-md"
                placeholder="#3b82f6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Color Secundario</label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={template.colors?.secondary || '#1e40af'}
                onChange={(e) => updateTemplate('colors.secondary', e.target.value)}
                className="w-12 h-10 border rounded"
              />
              <input
                type="text"
                value={template.colors?.secondary || '#1e40af'}
                onChange={(e) => updateTemplate('colors.secondary', e.target.value)}
                className="flex-1 px-3 py-2 border rounded-md"
                placeholder="#1e40af"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Color de Acento</label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={template.colors?.accent || '#fbbf24'}
                onChange={(e) => updateTemplate('colors.accent', e.target.value)}
                className="w-12 h-10 border rounded"
              />
              <input
                type="text"
                value={template.colors?.accent || '#fbbf24'}
                onChange={(e) => updateTemplate('colors.accent', e.target.value)}
                className="flex-1 px-3 py-2 border rounded-md"
                placeholder="#fbbf24"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFontsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Combinaciones de Fuentes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fontPairs.map((pair, index) => (
            <button
              key={index}
              onClick={() => updateFontPair(pair)}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow text-left"
            >
              <div className="mb-2">
                <p 
                  className="text-lg font-bold"
                  style={{ fontFamily: pair.heading }}
                >
                  Título Principal
                </p>
                <p 
                  className="text-sm text-gray-600"
                  style={{ fontFamily: pair.body }}
                >
                  Este es el texto del cuerpo que explica el contenido.
                </p>
              </div>
              <p className="text-xs font-medium text-gray-500">{pair.name}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Fuentes Personalizadas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Fuente para Títulos</label>
            <select
              value={template.fonts?.heading || 'Inter'}
              onChange={(e) => updateTemplate('fonts.heading', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="Inter">Inter</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Playfair Display">Playfair Display</option>
              <option value="Roboto">Roboto</option>
              <option value="Poppins">Poppins</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Fuente para Texto</label>
            <select
              value={template.fonts?.body || 'Inter'}
              onChange={(e) => updateTemplate('fonts.body', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="Inter">Inter</option>
              <option value="Lato">Lato</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Source Sans Pro">Source Sans Pro</option>
              <option value="Nunito">Nunito</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnimationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Estilo de Animaciones</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {animationOptions.map((anim, index) => (
            <button
              key={index}
              onClick={() => {
                updateTemplate('animations.hero.type', anim.type);
                updateTemplate('animations.hero.duration', anim.duration);
                updateTemplate('animations.features.type', anim.type);
                updateTemplate('animations.features.duration', anim.duration);
              }}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-5 w-5 text-indigo-600" />
                <span className="font-medium">{anim.name}</span>
              </div>
              <p className="text-sm text-gray-600">
                {anim.type} - {anim.duration}s
              </p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Configuración Avanzada</h3>
        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={template.animations?.typing_effect?.enabled || false}
                onChange={(e) => updateTemplate('animations.typing_effect.enabled', e.target.checked)}
                className="rounded"
              />
              <span>Efecto de escritura en el título</span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={template.animations?.counter?.enabled || false}
                onChange={(e) => updateTemplate('animations.counter.enabled', e.target.checked)}
                className="rounded"
              />
              <span>Contadores animados</span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={template.animations?.parallax?.enabled || false}
                onChange={(e) => updateTemplate('animations.parallax.enabled', e.target.checked)}
                className="rounded"
              />
              <span>Efecto parallax en imágenes</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContentTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Contenido Principal</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Título Principal</label>
            <input
              type="text"
              value={template.hero?.title || ''}
              onChange={(e) => updateTemplate('hero.title', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Tu título impactante aquí"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subtítulo</label>
            <input
              type="text"
              value={template.hero?.subtitle || ''}
              onChange={(e) => updateTemplate('hero.subtitle', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Subtítulo explicativo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Descripción</label>
            <textarea
              value={template.hero?.description || ''}
              onChange={(e) => updateTemplate('hero.description', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
              placeholder="Descripción detallada de tu propuesta de valor"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Texto del Botón</label>
            <input
              type="text"
              value={template.hero?.cta_text || ''}
              onChange={(e) => updateTemplate('hero.cta_text', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Comenzar Ahora"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Imagen de Fondo</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">URL de la Imagen</label>
            <input
              type="url"
              value={template.hero?.background?.url || ''}
              onChange={(e) => updateTemplate('hero.background.url', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="https://images.unsplash.com/photo-..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Overlay (Transparencia)</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={parseFloat(template.hero?.background?.overlay?.replace('rgba(0,0,0,', '').replace(')', '') || '0.4')}
              onChange={(e) => updateTemplate('hero.background.overlay', `rgba(0,0,0,${e.target.value})`)}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'colors', name: 'Colores', icon: Palette },
    { id: 'fonts', name: 'Fuentes', icon: Type },
    { id: 'animations', name: 'Animaciones', icon: Zap },
    { id: 'content', name: 'Contenido', icon: Image },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="border-b bg-gray-50 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Personalizar Template
            </h2>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  // Abrir vista previa en modal o nueva pestaña
                  const previewWindow = window.open('', '_blank');
                  if (previewWindow) {
                    previewWindow.document.write(`
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <title>Vista Previa - Template</title>
                          <script src="https://cdn.tailwindcss.com"></script>
                          <style>
                            body { margin: 0; padding: 0; font-family: ${template.fonts?.body || 'Inter'}, sans-serif; }
                            h1, h2, h3, h4, h5, h6 { font-family: ${template.fonts?.heading || 'Inter'}, sans-serif; }
                          </style>
                        </head>
                        <body>
                          <div id="preview-container"></div>
                          <script>
                            // Aquí se renderizaría el template
                            document.getElementById('preview-container').innerHTML = 
                              '<div style="min-height: 100vh; background: linear-gradient(135deg, ${template.colors?.primary || '#3b82f6'}, ${template.colors?.secondary || '#1e40af'}); display: flex; align-items: center; justify-content: center; text-align: center; color: white; padding: 2rem;"><div><h1 style="font-size: 3rem; margin-bottom: 1rem;">${template.hero?.title || 'Tu Título Aquí'}</h1><p style="font-size: 1.2rem; margin-bottom: 2rem;">${template.hero?.description || 'Descripción'}</p><button style="background: ${template.colors?.accent || '#fbbf24'}; color: white; padding: 1rem 2rem; border: none; border-radius: 0.5rem; font-size: 1.1rem; cursor: pointer;">${template.hero?.cta_text || 'Comenzar Ahora'}</button></div></div>';
                          </script>
                        </body>
                      </html>
                    `);
                    previewWindow.document.close();
                  }
                }}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                <Eye className="h-4 w-4 mr-2" />
                Vista Previa
              </button>
              <button
                onClick={() => onSave?.(template)}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Guardar
              </button>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar con tabs */}
          <div className="w-64 bg-gray-50 border-r">
            <nav className="p-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 rounded-md text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-3" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Contenido principal */}
          <div className="flex-1 p-6">
            {activeTab === 'colors' && renderColorTab()}
            {activeTab === 'fonts' && renderFontsTab()}
            {activeTab === 'animations' && renderAnimationsTab()}
            {activeTab === 'content' && renderContentTab()}
          </div>
        </div>
      </div>

      {/* Preview en tiempo real */}
      <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">Vista Previa en Tiempo Real</h3>
          <div className="flex items-center space-x-3">
            <div className="text-sm text-gray-600">
              Scroll para ver más contenido
            </div>
            <div className="text-xs text-gray-500">
              Colores: {template.colors?.primary || 'N/A'}
            </div>
          </div>
        </div>
        <div className="bg-gray-100">
          <div className="max-h-[600px] overflow-y-auto border-4 border-gray-300 rounded-lg m-4">
            <div className="transform scale-75 origin-top-left" style={{ width: '133.33%' }}>
              <div key={`${template.colors?.primary}-${template.colors?.secondary}-${template.colors?.accent}`}>
                <LandingRenderer content={template} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCustomizer; 