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

   `category` is one of `torneo`, `convocatoria`, `resultados`, or `general`. `slug_en` is optional but recommended — without it, the English post page uses the same (Spanish) slug as the filename. With it, the English post publishes at `news/<slug_en>.html` while the Spanish version stays at `es/news/<the-filename-slug>.html` — e.g. `slug_en: tryout-dates-announced` with a file named `2027-01-15-fechas-de-pruebas.md` publishes English at `news/tryout-dates-announced.html` and Spanish at `es/news/fechas-de-pruebas.html`.

   Keep both `title_es` and `title_en` to roughly **60 characters or fewer** — that's what shows as the browser tab title and in Google search results; a longer title just gets truncated there.
4. To add a photo: upload it to `assets/images/news/` (in the same Add file screen, or a separate commit) and add two more lines inside the `---` block: `image: your-filename.jpg`, `image_alt_es: ...`, `image_alt_en: ...`.
5. Scroll down and click **Commit changes**. The site rebuilds itself automatically within a few minutes (the "Build" GitHub Action does this — nothing else to do).

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

   `category` puede ser `torneo`, `convocatoria`, `resultados` o `general`. `slug_en` es opcional pero recomendado — sin él, la página en inglés usa el mismo nombre (en español) que el archivo. Con él, la versión en inglés se publica en `news/<slug_en>.html` mientras que la versión en español sigue en `es/news/<nombre-del-archivo>.html` — por ejemplo, `slug_en: tryout-dates-announced` con un archivo llamado `2027-01-15-fechas-de-pruebas.md` publica el inglés en `news/tryout-dates-announced.html` y el español en `es/news/fechas-de-pruebas.html`.

   Mantén `title_es` y `title_en` en **60 caracteres o menos** — eso es lo que se muestra en la pestaña del navegador y en los resultados de Google; un título más largo simplemente se corta ahí.
4. Para agregar una foto: súbela a `assets/images/news/` y agrega estas líneas dentro del bloque `---`: `image: tu-archivo.jpg`, `image_alt_es: ...`, `image_alt_en: ...`.
5. Baja y haz clic en **Commit changes**. El sitio se reconstruye automáticamente en unos minutos — no hay que hacer nada más.

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
