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

## The three design options

The original proposal was to shift the homepage from **"show everything"** to
**"help people take their next step."** Each direction uses fewer photos,
shorter text, clearer actions, and an events section near the top.
These descriptions preserve the original design suggestions; the live previews
show how each direction was developed.

### 1. Warm welcome

**Best for attracting first-time visitors.**

- One strong church photo with the headline **"There's room for you here."**
- Service time and location directly below.
- Two main actions: **Plan Your Visit** and **Watch Worship**.
- Three upcoming events, each with a date, short description, and clear action.
- A brief welcome statement instead of the original long introduction.

**Style:** Warm ivory, deep plum, dark text, and generous spacing. Elegant
headings and simple, readable body text.

[Explore Warm welcome](https://arniebradfo.github.io/emory-presbyterian-preview/?design=warm)

### 2. Community in action

**Best for showing an active church and encouraging participation.**

- A compact welcome area with one small photo, or no photo.
- **"Coming up at Emory"** becomes the main feature.
- One featured event with a prominent button, followed by two smaller events.
- Three simple next steps: **Worship With Us**, **Find Community**, and
  **Serve a Neighbor**.
- A short statement about inclusion and faith.

**Style:** White backgrounds, teal and plum accents, bold headings, and clean
event cards with large date markers. The live version develops this direction
with teal and soft green tones and no photos.

[Explore Community in action](https://arniebradfo.github.io/emory-presbyterian-preview/?design=community)

### 3. Quiet and confident

**Best for the cleanest, least cluttered design.**

- A text-led opening: **"Faith. Community. Room for everybody."**
- Service details and **Join Us Sunday** as the main action.
- A compact upcoming-events list rather than image-heavy cards.
- One photo farther down, paired with a short introduction.
- A simpler footer with contact details and a **Get Directions** link instead
  of a large map.

**Style:** Soft cream, charcoal, restrained plum accents, fine dividers, and
large typography.

[Explore Quiet & confident](https://arniebradfo.github.io/emory-presbyterian-preview/?design=quiet)

### Original recommendation

**Option 1, with Option 2's event layout.** This combination welcomes new
visitors while making church activity easy to find.

For all three directions:

- Replace event graphics with readable text and dates.
- Use specific actions such as **View Details**, **Volunteer**, or **Register**,
  where appropriate and supported by the event.
- Show only the next three events, plus **View All Events**.
- Remove repeated photos and oversized sections.
- Keep worship time visible without scrolling.

These are design goals, not a live event schedule. The previews use source-site
information and link to the church calendar to confirm event details.

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
