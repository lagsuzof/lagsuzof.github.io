# LAGSUZ — sitio oficial
Sitio editorial estático de Luis Gutiérrez Zamora. Proyecto terminado para edición y despliegue en GitHub Pages; no se ha publicado ni se ha creado un repositorio remoto.

## Tecnologías y arquitectura
Astro 7.4.2, TypeScript estricto, Tailwind CSS v4 con CSS editorial propio, Vite y Sharp. Sin React, backend, CMS, servicios de pago ni scripts de terceros en ejecución. Inter y Barlow Condensed se sirven desde el propio sitio; las fuentes de Fontsource son gratuitas. El lockfile fija las versiones instaladas.

La portada cuenta una historia continua y enlaza a un media kit independiente, que puede compartirse y posicionarse con metadatos propios. Las fotos originales se conservan en assets/originals; no se publican automáticamente.

```text
src/
  components/Photo.astro       Picture AVIF/WebP responsive
  layouts/Layout.astro        Navegación, footer, SEO y motion
  data/site.ts                Identidad, redes, métricas, imágenes, hitos y SEO
  lib/urls.ts                 Rutas compatibles con base path
  styles/global.css           Diseño, responsive y movimiento reducido
  pages/
    index.astro               Home, About, Journey, Discipline, Content, Connect
    media-kit.astro           Biografías, datos y descargas
    404.astro                 Página de error
    media-kit.txt.ts          Biografía descargable generada
    sitemap.xml.ts            Sitemap generado con la URL configurada
    robots.txt.ts             Robots generado
assets/originals/             Las cinco fotos originales
public/images/               Variantes optimizadas
scripts/images.mjs           Generador incremental de imágenes
.github/workflows/deploy.yml  Build y despliegue Pages
```

## Desarrollo
Instala Node.js 24 LTS (incluye npm). Dentro de esta carpeta:

```sh
npm ci
npm run dev
```

Abre la URL que imprime Astro, normalmente http://127.0.0.1:4321/.
Para comprobar y generar producción:

```sh
npm run check
npm run build
npm run preview
```

El resultado se genera en dist/. No abras index.html con file://: usa el servidor de preview para resolver las rutas desde la raíz.

En entornos restringidos donde Astro no pueda escribir su configuración de telemetría, en PowerShell ejecuta primero:
```powershell
$env:ASTRO_TELEMETRY_DISABLED='1'
```

## Personalizar
- Edita src/data/site.ts para nombre, biografías, correo, redes, métricas, metadatos, navegación y selección de imágenes.
- Los campos url vacíos se muestran como Próximamente. Añade URLs completas y verificadas; se incorporan automáticamente a los enlaces y sameAs de Person.
- El correo vacío no genera un formulario ni una dirección ficticia.
- Añade hitos confirmados al arreglo milestones con date, title y text. No se inventaron fechas ni logros.
- Edita los textos editoriales de portada en src/pages/index.astro y los estilos en src/styles/global.css.
- Al actualizar métricas, indica plataforma, fecha/periodo y fuente en metrics.note. Actualmente son cifras históricas aportadas por el propietario, sin atribución inventada a una plataforma.
- Para destacar publicaciones concretas, incorpora sus enlaces reales cuando estén disponibles. Actualmente las tarjetas son accesos preparados a perfiles, no publicaciones inventadas.
- Conserva los nombres de las fotografías para reemplazarlas sin cambiar componentes. Si cambia el formato, actualiza scripts/images.mjs.
- Ejecuta npm run images tras cambiar fotos. Se generan tres anchos (480, 900, 1400) en AVIF y WebP, más una imagen social JPEG.
- El generador recorta únicamente las barras negras de las dos fotos originales de teléfono. Si sustituyes esas fotos por otras dimensiones, modifica o elimina el extract correspondiente.
- No hay retoque corporal ni personas generadas. Los tratamientos visuales se aplican por CSS.
- Un futuro blog puede agregarse en src/pages/blog y al sitemap; no se incluyeron entradas vacías.

## Despliegue gratuito en GitHub Pages
1. Crea un repositorio público en tu cuenta de GitHub para usar Pages sin coste de hosting inicial.
2. Sube el contenido de esta carpeta a la raíz del repositorio, incluyendo .github y package-lock.json. Excluye node_modules, .astro, .env y dist (ya están en .gitignore).
3. Usa la rama main. En Settings → Pages → Build and deployment, selecciona GitHub Actions.
4. Haz push a main o ejecuta manualmente el workflow Deploy Lagsuz to GitHub Pages.
5. El workflow instala con npm ci, ejecuta typecheck, optimiza fotos, construye y despliega.
6. Abre la URL que devuelve el job deploy y comprueba portada, media kit, descargas y 404.

El workflow obtiene origin y base_path de actions/configure-pages; soporta ambos casos:
- https://usuario.github.io/ con repositorio usuario.github.io
- https://usuario.github.io/repositorio/ con repositorio de proyecto

No debes escribir /repositorio en SITE_URL. SITE_URL es el origen; BASE_PATH lleva la subruta.

Para compilar manualmente con tu dirección, copia .env.example a .env y configura:
```dotenv
SITE_URL=https://usuario.github.io
BASE_PATH=/repositorio/
```
Para la raíz usa BASE_PATH=/.
Las variables del entorno tienen prioridad sobre .env.

## Dominio propio futuro
Un dominio es opcional y puede implicar un coste ajeno a este proyecto. Configúralo en Settings → Pages y en el DNS del proveedor siguiendo la documentación oficial de GitHub; activa HTTPS. Si administras CNAME desde archivos, añade public/CNAME con tu dominio. Reconstruye con SITE_URL=https://tu-dominio y BASE_PATH=/; el workflow toma la configuración de Pages. Verifica canonical, sitemap y tarjetas sociales después del cambio.

## SEO
Cada página tiene title, description, canonical, Open Graph y Twitter Card. El idioma es es-MX. JSON-LD conecta Person (Luis Gutiérrez Zamora / Lagsuz), ProfilePage, WebSite y WebPage; el media kit incluye BreadcrumbList. No se incluyeron cuentas no verificadas, premios, certificaciones ni prensa.

Mientras SITE_URL no esté configurado, se usa example.com y se emite noindex con robots Disallow. Esto evita presentar una URL ficticia como sitio público. El workflow configura la URL real y habilita indexación. La 404 siempre permanece noindex.

En una web de proyecto, Google consulta robots.txt en la raíz del dominio, no en /repositorio/robots.txt. El archivo generado en la subruta no sustituye al robots de usuario.github.io. Si necesitas control de rastreo a nivel de dominio, administra el repositorio raíz o un dominio propio; las directivas meta robots de cada página sí se aplican.

Después de publicar:
1. Añade la propiedad URL-prefix completa (incluida la subruta) a Google Search Console.
2. Verifica la propiedad mediante un método disponible; si usas archivo HTML, colócalo en public/ y despliega de nuevo.
3. Envía la URL completa de sitemap.xml.
4. Inspecciona la portada y el media kit y solicita indexación si corresponde.
5. Mantén el mismo nombre y los enlaces oficiales consistentes en tus perfiles.

No se promete Knowledge Panel, verificación ni posiciones en Google.

## Motion y accesibilidad
Reveal con IntersectionObserver, entrada escalonada de tarjetas, aparición de métricas, hover sutil, menú móvil, scroll suave e indicador de lectura con CSS scroll timeline donde sea compatible. View Transitions entre documentos como mejora progresiva. Sin dependencia pesada de animación ni parallax que interfiera con la lectura.
Se respeta prefers-reduced-motion y el contenido queda visible sin JavaScript. Incluye skip link, focus visible, alt descriptivo, menú con aria-expanded, Escape y cierre al seleccionar un enlace.

## Datos pendientes del propietario
URL oficial de Twitch; fechas e hitos reales; periodo/plataforma de métricas y publicaciones destacadas. No se recibió la imagen de referencia IronCoach: se siguió la dirección visual escrita y las cinco fotografías adjuntas.

## Validación
Consulta VALIDACION.md para las pruebas ejecutadas, las mediciones locales y sus límites. Las puntuaciones no garantizan resultados iguales en todos los dispositivos o en el hosting final.

Referencias oficiales: https://docs.astro.build/en/install-and-setup/ y https://docs.astro.build/en/guides/deploy/github/
