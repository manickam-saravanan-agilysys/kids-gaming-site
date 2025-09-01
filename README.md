# Kids Gaming Site

This is a lightweight, accessible scaffold for a kids-friendly games site (ages 10–15).

Setup
- Open the folder: code kids-gaming-site
- Serve with a static server (recommended) or open index.html in a browser.

Quick serve (Python 3):
```
python3 -m http.server 8000
```

Project structure
- `index.html` – main page
- `styles.css` – design tokens & responsive layout
- `scripts.js` – loads `data/*.json` and injects content
- `data/branding.json`, `data/theme.json`, `data/games.json` – site data

Student exercises (TODOs)
- Change CSS variables to create a new color theme.
- Add a new game to `data/games.json` and update `scripts.js` to support categories.
- Implement keyboard navigation for game cards and an accessible modal for game details.
