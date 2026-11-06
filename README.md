# Emory Presbyterian homepage preview

Three editable homepage design directions for <https://emorypresbyterian.org/>.
Use **Menu & designs** to switch between Warm welcome, Community in action,
and Quiet & confident. Selection is stored in the URL, so each option can be
bookmarked and browser Back/Forward works.

## Live preview

<https://arniebradfo.github.io/emory-presbyterian-preview/>

- [Warm welcome](https://arniebradfo.github.io/emory-presbyterian-preview/?design=warm)
- [Community in action](https://arniebradfo.github.io/emory-presbyterian-preview/?design=community)
- [Quiet & confident](https://arniebradfo.github.io/emory-presbyterian-preview/?design=quiet)

This is an unofficial design exploration, not the church's live website.
GitHub Pages publishes the root of the `main` branch.

## Run locally

From this directory, run:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open <http://127.0.0.1:8000>.

## Edit

- `index.html`: all three homepage layout templates and shared navigation.
- `designs.css`: responsive styles for the three directions.
- `designs.js`: shared event content and accessible design-switching dialog.
- `original.html`: preserved source-site snapshot.
- `preview.css`, `preview.js`, `assets/css/`: preserved snapshot styles and behavior.

The new designs load photos from the original church website and fonts from
Google Fonts. They do not load WordPress scripts, analytics, or forms.
Internet access is required for remote photos and fonts; system fonts are
available as a fallback. Destination links open the original website.
The event content is an editorial preview, not a live calendar feed.
The shelter's old July date is intentionally omitted: its action links to the
church calendar to confirm the next meal. No registration availability is implied.
The original snapshot still loads its remote theme scripts and map.

`python import_homepage.py` refreshes the source snapshot and stylesheets.
**Refreshing overwrites `original.html` and the downloaded source stylesheets.**
It does not overwrite any of the three new designs or the preview CSS/JavaScript.

Source content and assets remain the property of their respective owners.
