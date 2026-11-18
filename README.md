# A Little World Made Just For Gudul

A lightweight, static birthday experience built with HTML, CSS, and vanilla JavaScript. It is ready for GitHub Pages and does not require a build step.

## Customize

Edit [`js/config.js`](js/config.js) to change the nickname, sender, dates, letter, captions, photo paths, and optional music path. Add your own files under:

- `assets/images/her-photos/`
- `assets/images/memories/`
- `assets/audio/`

Missing photos automatically use a tasteful placeholder, and missing music never interrupts the experience.

## Run locally

Run the included npm development server:

```bash
npm run dev
```

Then open `http://localhost:5173`.

You can also open `index.html` directly or serve the folder with another static server. For GitHub Pages, publish the repository as-is.