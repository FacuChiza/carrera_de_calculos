# 📁 Estructura del Proyecto

Este documento describe la organización de archivos y carpetas del proyecto **Carrera de Cálculos**.

## 🏗️ Estructura General

```
carrera-de-calculos/
├── 📄 index.html                    # Página principal del juego
├── 📁 src/                          # Código fuente del proyecto
│   ├── 📁 css/                      # Estilos CSS
│   │   └── 📄 styles.css           # Estilos principales
│   ├── 📁 js/                       # Lógica JavaScript
│   │   └── 📄 script.js            # Lógica del juego
│   └── 📁 assets/                   # Recursos multimedia
│       └── 📁 images/              # Imágenes
│           └── 📄 logo_color.png   # Logo de la empresa
├── 📁 docs/                         # Documentación
│   ├── 📄 CONTRIBUTING.md          # Guía de contribución
│   ├── 📄 CHANGELOG.md             # Historial de cambios
│   └── 📄 ESTRUCTURA.md            # Este archivo
├── 📄 package.json                  # Configuración del proyecto
├── 📄 LICENSE                       # Licencia MIT
├── 📄 .gitignore                    # Archivos a ignorar en Git
└── 📄 README.md                     # Documentación principal
```

## 📂 Descripción de Carpetas

### `/src/` - Código Fuente
Contiene todo el código fuente del proyecto organizado por tipo:

#### `/src/css/`
- **styles.css**: Estilos CSS principales del juego
  - Diseño responsivo
  - Animaciones y transiciones
  - Sistema de colores
  - Layout y componentes

#### `/src/js/`
- **script.js**: Lógica principal del juego
  - Generación de números aleatorios
  - Manejo de estados del juego
  - Eventos y interactividad
  - Validación de respuestas

#### `/src/assets/images/`
- **logo_color.png**: Logo corporativo
  - Posicionado en la esquina superior izquierda
  - Tamaño optimizado para web

### `/docs/` - Documentación
Contiene toda la documentación del proyecto:

- **CONTRIBUTING.md**: Guía para contribuir al proyecto
- **CHANGELOG.md**: Historial de cambios y versiones
- **ESTRUCTURA.md**: Este archivo de documentación

## 📄 Archivos Principales

### `index.html`
- Punto de entrada de la aplicación
- Estructura HTML semántica
- Referencias a archivos CSS y JS
- Meta tags para SEO y responsividad

### `package.json`
- Metadatos del proyecto
- Scripts de desarrollo
- Dependencias (si se agregaran)
- Información de licencia y autor

### `README.md`
- Documentación principal
- Instrucciones de instalación
- Guía de uso
- Características del proyecto

## 🔧 Convenciones de Nomenclatura

### Archivos
- **HTML**: `index.html` (punto de entrada)
- **CSS**: `styles.css` (estilos principales)
- **JavaScript**: `script.js` (lógica principal)
- **Imágenes**: `logo_color.png` (descriptivo)

### Carpetas
- **src/**: Código fuente
- **css/**: Estilos
- **js/**: JavaScript
- **assets/**: Recursos multimedia
- **images/**: Imágenes
- **docs/**: Documentación

## 🚀 Flujo de Desarrollo

### Estructura de Trabajo
1. **index.html** → Punto de entrada
2. **src/css/styles.css** → Estilos y diseño
3. **src/js/script.js** → Lógica y funcionalidad
4. **src/assets/images/** → Recursos visuales

### Rutas Relativas
- CSS: `src/css/styles.css`
- JavaScript: `src/js/script.js`
- Imágenes: `src/assets/images/logo_color.png`

## 📋 Mantenimiento

### Agregar Nuevos Archivos
- **CSS**: Colocar en `/src/css/`
- **JavaScript**: Colocar en `/src/js/`
- **Imágenes**: Colocar en `/src/assets/images/`
- **Documentación**: Colocar en `/docs/`

### Organización
- Mantener separación clara entre código y recursos
- Usar nombres descriptivos para archivos
- Documentar cambios en CHANGELOG.md
- Seguir convenciones de nomenclatura

## 🎯 Beneficios de esta Estructura

### Para Desarrolladores
- **Organización clara**: Fácil navegación del código
- **Separación de responsabilidades**: CSS, JS y recursos separados
- **Escalabilidad**: Fácil agregar nuevos archivos
- **Mantenimiento**: Estructura predecible

### Para Usuarios
- **Rendimiento**: Archivos organizados para carga eficiente
- **Claridad**: Estructura lógica y comprensible
- **Documentación**: Guías completas de uso

---

**Esta estructura sigue las mejores prácticas de desarrollo web y facilita el mantenimiento y escalabilidad del proyecto.**
