# bt-docs

A scalable, content-driven **documentation site** built with **Vue 3 + Vite**. It hosts documentation for multiple projects in one place — the sidebar, breadcrumbs, landing cards, and routes are all **auto-generated** from a single config file, so adding a new project takes just a couple of minutes.

> **New developer?** Read [HOW_TO_ADD_PROJECT.md](./HOW_TO_ADD_PROJECT.md) to learn how to add content and new projects.

> **Writing requirements?** See [HOW_TO_ADD_REQUIREMENTS.md](./HOW_TO_ADD_REQUIREMENTS.md) for how any user can add requirement documents for each page (Docs / Requirement toggle).

---

## ✨ Features

- 🧩 **Multi-project docs** — document several projects from one site
- ⚙️ **Config-driven** — everything (nav, routes, landing cards) is generated from `src/data/projects.js`
- 📝 **Markdown content** — just drop `.md` files into `public/content/`
- 🌗 **Dark / light mode** — follows system preference, toggle included
- 📱 **Responsive** — collapsible sidebar on mobile, works on any screen
- 🔎 **Search UI** — search bar in the header (ready to wire to a search engine)
- 🚀 **Fast & static-ready** — buildable static output in `dist/`

---

## 🧰 Tech Stack

| Layer | Tool |
|-------|------|
| Framework | [Vue 3](https://vuejs.org/) |
| Build tool | [Vite 4](https://vitejs.dev/) |
| Routing | [Vue Router 4](https://router.vuejs.org/) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) |

---

## ✅ Prerequisites

- **Node.js** `>= 14.18` (this project is pinned to **Vite 4** so it works on older Node versions)
- **npm** (or your package manager of choice)

> 💡 **Note:** The latest Nuxt/Vite versions require Node 18+. This project intentionally uses **Vite 4** so it runs on Node 14.18+. If you're on Node 18+, you can bump the versions if you wish.

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:3000)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The dev server has **hot reload** — save a file and see the change instantly.

---

## 📦 Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Build a production-ready static site into `dist/` |
| `npm run preview` | Preview the production build locally |

---

## 📁 Project Structure

```
bt-docs/
├── index.html                      # HTML entry point
├── package.json                    # Dependencies & scripts
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind / theme configuration
├── postcss.config.js               # PostCSS / Tailwind pipeline
├── HOW_TO_ADD_PROJECT.md           # 📖 Guide: add a new project
├── public/
│   ├── favicon.svg                 # Site icon
│   └── content/                    # 📝 Markdown docs
│       └── {project-slug}/
│           └── {section-slug}/
│               └── {page-slug}.md
└── src/
    ├── main.js                     # Vue app bootstrap
    ├── App.vue                     # Root component
    ├── router/index.js             # Routes (dynamic, cover all projects)
    ├── data/projects.js            # ⚙️ THE config — register projects here
    ├── composables/useDocs.js      # Shared docs data helpers
    ├── layouts/DefaultLayout.vue   # Layout: sidebar + header + content
    ├── components/
    │   ├── Sidebar.vue             # Auto-generated project navigation
    │   └── TopHeader.vue           # Breadcrumb, search, dark-mode toggle
    ├── pages/
    │   ├── index.vue               # Home (auto-lists all projects)
    │   └── project/index.vue       # Generic doc page (dynamic route)
    └── assets/css/main.css         # Global styles + markdown (prose) styles
```

---

## 🧠 How It Works

The whole site is driven by **one config file**:

```
src/data/projects.js  →  Sidebar navigation (auto-generated)
                       →  Home page cards (auto-generated)
                       →  Breadcrumb trail (auto-generated)
                       →  Project landing cards (auto-generated)

public/content/...    →  Page content (fetched at runtime as markdown)
```

The router uses dynamic params (`/:project/:section/:page`), so **no route setup is needed** when you add content — it just works.

---

## ➕ Adding a New Project

Follow the guide in **[HOW_TO_ADD_PROJECT.md](./HOW_TO_ADD_PROJECT.md)**.

In short, it's **2 steps**:

1. **Register** the project in `src/data/projects.js` (name, icon, sections, pages).
2. **Add content** — create matching `.md` files under `public/content/{project-slug}/{section-slug}/{page-slug}.md`.

That's it. The sidebar, home cards, and routes update automatically.

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm install` fails | Make sure Node.js is `>= 14.18` |
| Port 3000 is already in use | Change `server.port` in `vite.config.js`, or stop the other process |
| Content not showing | Confirm the `.md` file path matches the slugs in `projects.js` |
| Changes not appearing | Hard-refresh the browser (`Ctrl + Shift + R`) |

---

## 📄 License

MIT — free to use and modify.