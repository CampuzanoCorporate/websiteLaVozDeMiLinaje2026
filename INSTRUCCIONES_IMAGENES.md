# Instrucciones para Agregar Imágenes

## Imágenes Necesarias

Para completar el diseño del sitio web, necesitas agregar las siguientes imágenes en la carpeta `images/`:

### 1. Foto de Perfil Principal (Hero Section)
- **Nombre de archivo sugerido**: `maria-profile.jpg`
- **Descripción**: Foto profesional de María R García
- **Dimensiones recomendadas**: 600x600 px (cuadrada)
- **Formato**: JPG o PNG
- **Ubicación en HTML**: `index.html` línea ~61 (hero-image section)

### 2. Imagen Decorativa (About Section)
- **Nombre de archivo sugerido**: `decorative-small.jpg`
- **Descripción**: Imagen decorativa (plantas, objetos simbólicos, etc.)
- **Dimensiones recomendadas**: 400x500 px (vertical)
- **Formato**: JPG o PNG
- **Ubicación en HTML**: `index.html` línea ~165 (about-images section)

### 3. Imagen de María en Meditación (About Section)
- **Nombre de archivo sugerido**: `maria-meditation.jpg`
- **Descripción**: Foto de María en meditación o momento reflexivo
- **Dimensiones recomendadas**: 300x400 px (vertical)
- **Formato**: JPG o PNG
- **Ubicación en HTML**: `index.html` línea ~168 (about-images section)

## Cómo Agregar las Imágenes

1. Coloca tus imágenes en la carpeta `images/`
2. Abre `index.html`
3. Busca los placeholders (elementos con clase `*-placeholder`)
4. Reemplázalos con tags `<img>`:

### Ejemplo para Hero Section (línea ~61):

**Antes:**
```html
<div class="profile-image-placeholder">
    <p>Foto Profesional de María R García</p>
</div>
```

**Después:**
```html
<img src="images/maria-profile.jpg" alt="María R García" class="profile-image">
```

### Ejemplo para About Section (líneas ~165-168):

**Antes:**
```html
<div class="about-img-placeholder about-img-small-placeholder">
    <p>Imagen decorativa</p>
</div>
<div class="about-img-placeholder about-img-large-placeholder">
    <p>María en meditación</p>
</div>
```

**Después:**
```html
<img src="images/decorative-small.jpg" alt="Decorative" class="about-img-small">
<img src="images/maria-meditation.jpg" alt="María en meditación" class="about-img-large">
```

## Optimización de Imágenes

Para un mejor rendimiento del sitio web:
- Comprime las imágenes antes de subirlas
- Usa formatos modernos como WebP cuando sea posible
- Mantén el tamaño de archivo bajo (idealmente < 200KB por imagen)

## Herramientas Recomendadas

- **Compresión**: TinyPNG (https://tinypng.com/)
- **Redimensionar**: Photopea (https://www.photopea.com/) - editor gratuito online
- **Conversión a WebP**: Squoosh (https://squoosh.app/)
