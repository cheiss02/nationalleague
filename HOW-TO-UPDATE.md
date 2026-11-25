# How to update the site / Cómo actualizar el sitio

*(English below; español más abajo.)*

---

## English

### Information the league must decide before launch

These aren't website tasks — they're decisions only the league can make. Until they're made, the relevant part of the site stays a clear placeholder (see `PRE-LAUNCH-CHECKLIST.md` for the full list):

- Registration fee amounts
- The refund window (how many days before the season starts)
- Cancellation and weather rules
- How families should request a refund
- The league's legal entity name and mailing address

### Adding a news post

1. On GitHub, go to `content/news/` and click **Add file → Create new file**.
2. Name it `YYYY-MM-DD-a-short-slug.md` (e.g. `2027-01-15-tryout-dates-announced.md`) — the date becomes the sort order, and the slug becomes the post's web address.
3. Paste this template and fill it in:

   ```
   ---
   title_es: Título en español
   title_en: Title in English
   slug_en: a-short-english-slug
   date: 2027-01-15
   category: torneo
   ---
   Texto en español del cuerpo de la noticia.

   <!--en-->
   English body text here.
   ```

   `category` is one of `bienvenida` (Welcome), `torneo`, `convocatoria`, `resultados`, or `general`. Every post shows its category as a small label on its card, on the homepage and the News page. `slug_en` is optional but recommended — without it, the English post page uses the same (Spanish) slug as the filename. With it, the English post publishes at `news/<slug_en>.html` while the Spanish version stays at `es/news/<the-filename-slug>.html` — e.g. `slug_en: tryout-dates-announced` with a file named `2027-01-15-fechas-de-pruebas.md` publishes English at `news/tryout-dates-announced.html` and Spanish at `es/news/fechas-de-pruebas.html`.

   Keep both `title_es` and `title_en` to roughly **60 characters or fewer** — that's what shows as the browser tab title and in Google search results; a longer title just gets truncated there.
4. To add a photo: upload it to `assets/images/news/` (in the same Add file screen, or a separate commit) and add two more lines inside the `---` block: `image: your-filename.jpg`, `image_alt_es: ...`, `image_alt_en: ...`.
5. Scroll down and click **Commit changes**. The site rebuilds itself automatically within a few minutes (the "Build" GitHub Action does this — nothing else to do).

Inside the post text, a line starting with `## ` becomes a subheading, and a line starting with `> ` becomes a large closing line (like "¡Bienvenidos a la National League Official Academies!").

### Welcoming a newly enrolled academy

Each academy that enrolls gets a welcome post. The post also puts the academy on the **welcome wall** on the homepage and the News page: the newest one in the spotlight, with its crest, the "Give them a welcome" button, and the open "Is your academy next?" spot, and the earlier ones in a row underneath. `content/news/2026-11-25-nido-aguila-hesperia-se-incorpora.md` is a complete example to copy.

1. Upload the academy's crest to `assets/images/clubs/` (a PNG with a transparent background, about 300–500px square).
2. Create the post as above with `category: bienvenida`, and add these lines inside the `---` block:

   ```
   team: Name of the Academy
   team_note_es: Academia oficial del Club ...
   team_note_en: Official ... academy
   team_crest: the-crest-file.png
   ```

   Without `team_crest` the wall shows the academy's initials in a circle instead.
3. A welcome banner goes in `image:` like any post photo. For a wide banner with text on it, the phone version of the page reads better with a closer crop: on a computer, put the original in `_source-assets/`, add it to the list at the top of `scripts/process-news-images.mjs` (with the crop for phones), and run `node scripts/process-news-images.mjs`. It makes the sizes and the phone crop, and the post uses them automatically.

### Changing a key date

Open `content/key-dates.json`, click the pencil (edit) icon, and add or edit an entry:

```
{ "date": "2027-02-01", "label_en": "Season starts", "label_es": "Inicio de temporada" }
```

Commit the change the same way. Only add real, confirmed dates — the site doesn't invent dates on its own.

### Uploading a document (rules, a call for registration, a calendar)

1. Go to the matching folder under `assets/documents/`: `reglamentos`, `convocatorias`, `calendarios`, or `formatos`.
2. Click **Add file → Upload files**, drag in the PDF, and commit.
3. That's it — the Documents page picks it up automatically on the next build, with its file size and the date you uploaded it.

To remove a document, open it in GitHub and click the trash icon, then commit.

---

## Español

### Información que la liga debe decidir antes del lanzamiento

Esto no son tareas del sitio web — son decisiones que solo la liga puede tomar. Hasta que se tomen, la parte correspondiente del sitio se queda como un marcador claro (ver la lista completa en `PRE-LAUNCH-CHECKLIST.md`):

- Montos de las cuotas de registro
- La ventana de reembolso (cuántos días antes de que inicie la temporada)
- Reglas de cancelación y clima
- Cómo deben solicitar un reembolso las familias
- El nombre de la entidad legal de la liga y su dirección postal

### Agregar una noticia

1. En GitHub, ve a `content/news/` y haz clic en **Add file → Create new file**.
2. Nómbralo `AAAA-MM-DD-un-nombre-corto.md` (ejemplo: `2027-01-15-fechas-de-pruebas.md`) — la fecha define el orden, y el nombre se convierte en la dirección web de la noticia.
3. Pega esta plantilla y complétala:

   ```
   ---
   title_es: Título en español
   title_en: Title in English
   slug_en: a-short-english-slug
   date: 2027-01-15
   category: torneo
   ---
   Texto en español del cuerpo de la noticia.

   <!--en-->
   English body text here.
   ```

   `category` puede ser `bienvenida`, `torneo`, `convocatoria`, `resultados` o `general`. Cada noticia muestra su categoría como una etiqueta pequeña en su tarjeta, en la página de inicio y en Noticias. `slug_en` es opcional pero recomendado — sin él, la página en inglés usa el mismo nombre (en español) que el archivo. Con él, la versión en inglés se publica en `news/<slug_en>.html` mientras que la versión en español sigue en `es/news/<nombre-del-archivo>.html` — por ejemplo, `slug_en: tryout-dates-announced` con un archivo llamado `2027-01-15-fechas-de-pruebas.md` publica el inglés en `news/tryout-dates-announced.html` y el español en `es/news/fechas-de-pruebas.html`.

   Mantén `title_es` y `title_en` en **60 caracteres o menos** — eso es lo que se muestra en la pestaña del navegador y en los resultados de Google; un título más largo simplemente se corta ahí.
4. Para agregar una foto: súbela a `assets/images/news/` y agrega estas líneas dentro del bloque `---`: `image: tu-archivo.jpg`, `image_alt_es: ...`, `image_alt_en: ...`.
5. Baja y haz clic en **Commit changes**. El sitio se reconstruye automáticamente en unos minutos — no hay que hacer nada más.

Dentro del texto, una línea que empieza con `## ` se convierte en subtítulo, y una que empieza con `> ` en una frase grande de cierre (como "¡Bienvenidos a la National League Official Academies!").

### Dar la bienvenida a una academia inscrita

Cada academia que se inscribe recibe una noticia de bienvenida. Esa noticia también la pone en el **muro de bienvenida** de la página de inicio y de Noticias: la más reciente en el centro, con su escudo, el botón "Dales la bienvenida" y el espacio "¿Tu academia es la siguiente?", y las anteriores en una fila debajo. `content/news/2026-11-25-nido-aguila-hesperia-se-incorpora.md` es un ejemplo completo para copiar.

1. Sube el escudo de la academia a `assets/images/clubs/` (un PNG con fondo transparente, de unos 300–500px por lado).
2. Crea la noticia como arriba con `category: bienvenida`, y agrega estas líneas dentro del bloque `---`:

   ```
   team: Nombre de la Academia
   team_note_es: Academia oficial del Club ...
   team_note_en: Official ... academy
   team_crest: archivo-del-escudo.png
   ```

   Sin `team_crest`, el muro muestra las iniciales de la academia en un círculo.
3. Un cartel de bienvenida va en `image:` como cualquier foto. Para un cartel ancho con texto, la versión para celular se lee mejor con un recorte más cercano: en una computadora, pon el original en `_source-assets/`, agrégalo a la lista al inicio de `scripts/process-news-images.mjs` (con el recorte para celular) y ejecuta `node scripts/process-news-images.mjs`. Genera los tamaños y el recorte, y la noticia los usa automáticamente.

### Cambiar una fecha importante

Abre `content/key-dates.json`, haz clic en el lápiz (editar), y agrega o edita una entrada:

```
{ "date": "2027-02-01", "label_en": "Season starts", "label_es": "Inicio de temporada" }
```

Guarda el cambio de la misma forma. Agrega únicamente fechas reales y confirmadas — el sitio no inventa fechas por su cuenta.

### Subir un documento (reglamento, convocatoria, calendario)

1. Ve a la carpeta correspondiente dentro de `assets/documents/`: `reglamentos`, `convocatorias`, `calendarios` o `formatos`.
2. Haz clic en **Add file → Upload files**, arrastra el PDF, y confirma el cambio.
3. Listo — la página de Documentos lo mostrará automáticamente en la siguiente reconstrucción, con su tamaño de archivo y la fecha en que lo subiste.

Para quitar un documento, ábrelo en GitHub y haz clic en el ícono de basura, luego confirma el cambio.
