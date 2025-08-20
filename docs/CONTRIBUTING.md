# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a **Carrera de Cálculos**! Este documento proporciona las pautas para contribuir al proyecto.

## 📋 Tabla de Contenidos

- [Cómo Contribuir](#cómo-contribuir)
- [Reportar Bugs](#reportar-bugs)
- [Solicitar Funcionalidades](#solicitar-funcionalidades)
- [Configuración del Entorno](#configuración-del-entorno)
- [Pautas de Código](#pautas-de-código)
- [Proceso de Pull Request](#proceso-de-pull-request)

## 🚀 Cómo Contribuir

### Tipos de Contribuciones

Aceptamos los siguientes tipos de contribuciones:

- 🐛 **Reporte de bugs**
- 💡 **Solicitudes de nuevas funcionalidades**
- 📝 **Mejoras en la documentación**
- 🎨 **Mejoras en la interfaz de usuario**
- ⚡ **Optimizaciones de rendimiento**
- 🧪 **Pruebas y validaciones**

## 🐛 Reportar Bugs

### Antes de Reportar

1. Verifica que el bug no haya sido reportado ya
2. Asegúrate de que estés usando la versión más reciente
3. Intenta reproducir el bug en diferentes navegadores

### Información Requerida

Al reportar un bug, incluye:

- **Descripción clara** del problema
- **Pasos para reproducir** el bug
- **Comportamiento esperado** vs **comportamiento actual**
- **Navegador y versión** donde ocurre
- **Sistema operativo**
- **Capturas de pantalla** (si aplica)

### Ejemplo de Reporte

```markdown
**Descripción del Bug:**
Los números no cambian después de presionar START

**Pasos para Reproducir:**
1. Abrir el juego
2. Presionar START
3. Observar que los números permanecen en 0

**Comportamiento Esperado:**
Los números deberían cambiar cada 1.5 segundos

**Comportamiento Actual:**
Los números permanecen estáticos

**Navegador:** Chrome 120.0.6099.109
**Sistema Operativo:** Windows 11
```

## 💡 Solicitar Funcionalidades

### Antes de Solicitar

1. Verifica que la funcionalidad no exista ya
2. Considera si la funcionalidad es apropiada para el proyecto
3. Piensa en cómo beneficiaría a los usuarios

### Información Requerida

Al solicitar una nueva funcionalidad, incluye:

- **Descripción detallada** de la funcionalidad
- **Justificación** de por qué es necesaria
- **Casos de uso** específicos
- **Propuesta de implementación** (opcional)

## ⚙️ Configuración del Entorno

### Requisitos

- Navegador web moderno
- Editor de código (VS Code, Sublime Text, etc.)
- Git

### Configuración Local

1. **Fork** el repositorio
2. **Clone** tu fork localmente:
   ```bash
   git clone https://github.com/tu-usuario/carrera-de-calculos.git
   cd carrera-de-calculos
   ```

3. **Ejecuta** el proyecto:
   ```bash
   # Opción 1: Abrir directamente
   open index.html
   
   # Opción 2: Servidor local
   python -m http.server 8000
   ```

## 📝 Pautas de Código

### Estilo de Código

- **HTML**: Usar indentación de 2 espacios
- **CSS**: Usar indentación de 2 espacios
- **JavaScript**: Usar indentación de 2 espacios, punto y coma al final

### Convenciones de Nomenclatura

- **Archivos**: kebab-case (`mi-archivo.html`)
- **Clases CSS**: kebab-case (`.mi-clase`)
- **IDs**: camelCase (`miId`)
- **Variables JavaScript**: camelCase (`miVariable`)
- **Funciones JavaScript**: camelCase (`miFuncion`)

### Comentarios

- Comenta código complejo
- Usa comentarios descriptivos
- Mantén los comentarios actualizados

### Ejemplo de Código

```javascript
// Función para generar números aleatorios
function generateRandomNumber() {
    const random = Math.random();
    
    // 60% de probabilidad de números negativos
    if (random < 0.6) {
        return -(Math.floor(Math.random() * 9) + 1);
    } else {
        return Math.floor(Math.random() * 9) + 1;
    }
}
```

## 🔄 Proceso de Pull Request

### Antes de Crear un PR

1. **Asegúrate** de que tu código funcione correctamente
2. **Prueba** en diferentes navegadores
3. **Verifica** que no haya errores de consola
4. **Actualiza** la documentación si es necesario

### Crear un Pull Request

1. **Crea una rama** para tu feature:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

2. **Haz tus cambios** y commit:
   ```bash
   git add .
   git commit -m "feat: agregar nueva funcionalidad"
   ```

3. **Push** a tu fork:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```

4. **Crea el Pull Request** en GitHub

### Estructura del PR

- **Título descriptivo** del cambio
- **Descripción detallada** de los cambios
- **Capturas de pantalla** (si aplica)
- **Referencia** a issues relacionados

### Ejemplo de PR

```markdown
## Descripción
Agrega funcionalidad para mostrar estadísticas del juego

## Cambios Realizados
- Agregado contador de partidas ganadas
- Implementado sistema de puntuación
- Mejorada la interfaz de resultados

## Capturas de Pantalla
[Incluir capturas si aplica]

## Pruebas Realizadas
- [x] Funciona en Chrome
- [x] Funciona en Firefox
- [x] Funciona en Safari
- [x] Responsive design verificado

Closes #123
```

## 📋 Checklist de PR

Antes de enviar tu PR, verifica:

- [ ] El código sigue las pautas de estilo
- [ ] Los cambios están probados
- [ ] La documentación está actualizada
- [ ] No hay errores de consola
- [ ] El juego funciona correctamente
- [ ] Los cambios son apropiados para el proyecto

## 🎯 Áreas de Mejora

### Prioridad Alta
- Optimización de rendimiento
- Mejoras en accesibilidad
- Corrección de bugs críticos

### Prioridad Media
- Nuevas funcionalidades educativas
- Mejoras en la interfaz
- Documentación adicional

### Prioridad Baja
- Cambios cosméticos menores
- Refactoring de código
- Mejoras en la experiencia de usuario

## 📞 Contacto

Si tienes preguntas sobre cómo contribuir:

- Abre un issue en GitHub
- Revisa la documentación existente
- Consulta los issues existentes

---

**¡Gracias por contribuir a hacer Carrera de Cálculos mejor!** 🧮✨
