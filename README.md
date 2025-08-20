# 🧮 Carrera de Cálculos - Juego Matemático

Un juego educativo interactivo para mejorar las habilidades de cálculo mental con números positivos y negativos.

## 🎯 Descripción

"Carrera de Cálculos" es un juego matemático que desafía a los jugadores a realizar cálculos mentales rápidos. El juego presenta una secuencia de números (positivos y negativos) que aparecen en pantalla, y el jugador debe calcular la suma total correctamente.

## ✨ Características

- **Número inicial**: Comienza con un número positivo aleatorio como punto de partida
- **Secuencia de 15 números**: 9 positivos y 6 negativos distribuidos aleatoriamente
- **Sistema de colores**: 
  - 🟢 Números positivos en verde
  - 🔴 Números negativos en rojo
  - ⚫ Número inicial en negro
- **Temporización**: Los números cambian cada 1.5 segundos
- **Sin repeticiones**: No hay números iguales consecutivos
- **Verificación automática**: Comprueba la respuesta del usuario
- **Interfaz responsiva**: Diseño adaptativo para diferentes pantallas

## 🎮 Cómo Jugar

1. **Inicio**: Se muestra un número inicial (positivo) en el display principal
2. **Secuencia**: Presiona "START" para comenzar la secuencia de 15 números
3. **Cálculo**: Observa cada número que aparece y calcula mentalmente la suma acumulativa
4. **Respuesta**: Al final, ingresa tu respuesta en el campo de texto
5. **Resultado**: El juego verifica si tu respuesta es correcta
6. **Reinicio**: Presiona "REINICIAR" para jugar una nueva partida

## 🏗️ Estructura del Proyecto

```
carrera-de-calculos/
├── index.html                    # Página principal del juego
├── src/
│   ├── css/
│   │   └── styles.css           # Estilos CSS
│   ├── js/
│   │   └── script.js            # Lógica del juego
│   └── assets/
│       └── images/
│           └── logo_color.png   # Logo de la empresa
├── docs/
│   ├── CONTRIBUTING.md          # Guía de contribución
│   └── CHANGELOG.md             # Historial de cambios
├── package.json                 # Configuración del proyecto
├── LICENSE                      # Licencia MIT
├── .gitignore                   # Archivos a ignorar en Git
└── README.md                    # Documentación del proyecto
```

## 🚀 Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- No requiere instalación de software adicional

### Instalación
1. Descarga o clona este repositorio
2. Abre el archivo `index.html` en tu navegador web
3. ¡Comienza a jugar!

### Uso Local
```bash
# Opción 1: Abrir directamente
open index.html

# Opción 2: Servidor local (recomendado)
python -m http.server 8000
# Luego visita http://localhost:8000
```

## 🎨 Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con animaciones y diseño responsivo
- **JavaScript (ES6+)**: Lógica del juego y interactividad
- **Diseño Responsivo**: Adaptable a diferentes tamaños de pantalla

## 🔧 Funcionalidades Técnicas

### Generación de Números
- **Distribución garantizada**: 9 números positivos y 6 negativos por juego
- **Aleatoriedad**: Orden completamente aleatorio
- **Sin repeticiones**: Algoritmo que evita números iguales consecutivos
- **Rango**: Números del -9 al -1 y del +1 al +9

### Sistema de Colores
```javascript
// Verde para números positivos
color: '#2E7D32'

// Rojo para números negativos  
color: '#C62828'

// Negro para número inicial
color: '#000'
```

### Temporización
- **Intervalo**: 1.5 segundos entre números
- **Duración total**: ~22.5 segundos por juego
- **Contador visual**: Muestra el progreso (1/15, 2/15, etc.)

## 🎯 Objetivos Educativos

- **Cálculo mental**: Mejora la capacidad de realizar operaciones mentales
- **Números negativos**: Familiariza con operaciones con números negativos
- **Velocidad**: Desarrolla rapidez en el cálculo
- **Concentración**: Mejora la atención y memoria de trabajo
- **Precisión**: Enfatiza la importancia de la exactitud en matemáticas

## 🔄 Flujo del Juego

```
1. Carga de página
   ↓
2. Generación de número inicial
   ↓
3. Usuario presiona START
   ↓
4. Secuencia de 15 números (1.5s cada uno)
   ↓
5. Input de respuesta del usuario
   ↓
6. Verificación automática
   ↓
7. Mostrar resultado
   ↓
8. Opción de reiniciar
```

## 🎨 Personalización

### Cambiar Colores
Edita las variables de color en `src/css/styles.css`:
```css
/* Números positivos */
color: #2E7D32;

/* Números negativos */
color: #C62828;

/* Número inicial */
color: #000;
```

### Modificar Temporización
Cambia el intervalo en `src/js/script.js`:
```javascript
// Cambiar de 1500ms a otro valor
gameInterval = setInterval(updateNumber, 1500);
```

### Ajustar Distribución
Modifica las constantes en `src/js/script.js`:
```javascript
const TOTAL_NUMBERS = 15;
const NEGATIVE_COUNT = 6;
const POSITIVE_COUNT = 9;
```

## 🐛 Solución de Problemas

### El juego no inicia
- Verifica que todos los archivos estén en la misma carpeta
- Asegúrate de que el navegador soporte JavaScript
- Revisa la consola del navegador para errores

### Los números no cambian
- Verifica que el archivo `src/js/script.js` esté correctamente vinculado
- Asegúrate de que no haya errores de JavaScript

### Problemas de visualización
- Verifica que el archivo `src/css/styles.css` esté correctamente vinculado
- Prueba en diferentes navegadores

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Carrera de Cálculos** - Juego educativo para mejorar habilidades matemáticas

## 🙏 Agradecimientos

- Inspirado en juegos educativos tradicionales de cálculo mental
- Diseño optimizado para aprendizaje efectivo
- Interfaz intuitiva para usuarios de todas las edades

---

**¡Disfruta mejorando tus habilidades matemáticas con Carrera de Cálculos!** 🧮✨
