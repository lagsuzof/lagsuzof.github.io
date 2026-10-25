# Validación — Lagsuz
Fecha: 25 de octubre de 2026.

## Comprobaciones ejecutadas
- Instalación de 283 paquetes gratuitos completada; package-lock.json incluido.
- Astro check: 13 archivos, 0 errores, 0 advertencias, 0 hints.
- Build estático final: correcto; 3 páginas (portada, media kit y 404), más sitemap, robots y biografía descargable. Compilación Astro: 0.91 s (imágenes ya generadas).
- 30 variantes AVIF/WebP generadas a partir de las 5 fotos originales, más la tarjeta social JPEG.
- HTTP 200 para portada, media kit, biografía, robots, sitemap y archivo 404.
- Navegador Chromium/Chrome local: sin errores de JavaScript.
- Sin overflow horizontal de portada en 320, 375, 390, 768, 1024, 1440, 2560 y 3840 px.
- Media kit también comprobado en 320, 390, 768, 1440 y 3840 px.
- Menú móvil: abrir/cerrar, Escape y cierre al elegir un enlace comprobados.
- Revisión visual de capturas de hero desktop/mobile, About, Journey, media kit y página completa.
- Axe (WCAG 2 A/AA, 2.1 AA y 2.2 AA): cero infracciones detectadas en portada y media kit a 390 y 1440 px.
- Build con origen de prueba https://lagsuz-test.github.io y base /official/: enlaces y assets comprobados vía HTTP, canonical correcto y meta robots index, follow. Ese dominio es una fixture de prueba, no una cuenta confirmada del propietario.
- Restaurado el build entregado a base / con URL provisional y noindex. GitHub Actions sustituye origen y base al desplegar.

## Lighthouse móvil
Lighthouse 13.5.0, servidor local, preset móvil, 25 de octubre de 2026. Build con URL configurada:
| Categoría | Resultado |
|---|---:|
| Rendimiento | 97 |
| Accesibilidad | 100 |
| Buenas prácticas | 100 |
| SEO | 100 |

LCP 2.6 s, CLS 0.002, TBT 0 ms. Son mediciones de laboratorio, no Core Web Vitals de usuarios reales. El LCP medido está ligeramente por encima del umbral de 2.5 s; se puede seguir afinando según el hosting y los dispositivos reales.

La primera prueba de la versión sin URL configurada dio 97/100/100/69. El SEO 69 correspondía al bloqueo intencional de indexación provisional. Al configurar el origen pasó a 100. No se dejó una URL de prueba indexable en el build entregado.

## Evidencia
reports/browser-report.json, axe-report.json, base-path-report.json y lighthouse-configured.json.
Los scripts de navegador usados durante esta sesión quedan en work/ del espacio de trabajo, fuera del paquete entregable.

## Límites
No se ha ejecutado el workflow en una cuenta de GitHub ni se ha publicado el sitio. Falta el repositorio/URL definitiva del propietario. No se ha registrado Search Console ni validado resultados enriquecidos en una URL pública. No se realizó una auditoría manual completa WCAG, pruebas en dispositivos físicos, Safari/Firefox ni mediciones de campo. Una auditoría automática sin incidencias no garantiza conformidad total.

