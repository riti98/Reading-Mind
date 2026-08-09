# Reading Mind

A personal digital bookshelf for tracking the books you've read — author,
page count, themes, and your own reflections — plus a way to spot
connections between books (shared author, overlapping themes).

## What it does

- Displays your books as a shelf of spines you can click or tab into.
- Selecting a book opens a detail panel with its stats (author, pages,
  date read, rating) and your written reflections.
- The detail panel also lists **connections**: other books in your
  collection that share the same author or overlapping themes.

## Tech stack

Plain HTML, CSS, and vanilla JavaScript (ES modules). No build step,
no framework, no dependencies — just open it in a browser (via a local
server, see below).

## Project structure

```
Reading-Mind/
├── index.html            # Page shell: bookshelf container + detail panel
├── css/
│   ├── style.css          # Global layout, typography, colors
│   └── bookshelf.css      # Bookshelf grid, book spines, detail panel styling
├── js/
│   ├── app.js              # Entry point: loads books.json, boots the shelf
│   ├── bookshelf.js         # Renders the shelf and the detail panel
│   ├── bookCard.js           # Single book "spine" component (click/hover/keyboard)
│   └── connections.js        # Finds shared-author / shared-theme connections
├── data/
│   └── books.json          # Your book data — this is what you edit to add books
└── assets/
    └── covers/              # Optional cover images referenced from books.json
```

## Running it

Because `app.js` fetches `data/books.json`, you need to serve the files
over HTTP rather than opening `index.html` directly (browsers block
`fetch` on the `file://` protocol). From the project root, run any
simple static server, for example:

```bash
python3 -m http.server 8000
# or
npx serve .
```

Then open `http://localhost:8000` in your browser.

## How to add a new book

Open `data/books.json` and add a new object to the array:

```json
{
  "id": "unique-slug-for-this-book",
  "title": "Book Title",
  "author": "Author Name",
  "pages": 320,
  "genre": "Genre",
  "themes": ["theme1", "theme2"],
  "dateRead": "YYYY-MM-DD",
  "rating": 4,
  "coverImage": "assets/covers/your-cover.jpg",
  "reflections": "Your thoughts on the book."
}
```

Notes:

- `id` should be unique across all books (used internally, not shown in the UI).
- `themes` is a list of free-text tags — reuse the same wording across books
  (e.g. always `"coming of age"`, not sometimes `"coming-of-age"`) so the
  connections feature can match them.
- `coverImage` is optional; drop the image file into `assets/covers/` and
  point to it. If omitted, the book still displays fine (cover art isn't
  wired into the UI yet — see Next steps).
- Save the file and refresh the page — no build step required.

## Next steps (not yet implemented)

- Render `coverImage` on the book spine/card instead of just the title.
- Filtering/sorting the shelf (by author, genre, rating, date read).
- Persisting edits from the UI itself instead of hand-editing JSON.
