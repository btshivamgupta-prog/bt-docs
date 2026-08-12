# How to Add a New Project

Adding a new project to this documentation site takes **2 steps** and ~2 minutes.

## Step 1: Register the project

Open `src/data/projects.js` and add a new entry:

```js
export const projects = {

  // ... existing projects ...

  // ── Your New Project ──────────────────────────────────────────────────
  'my-new-project': {                        // ← URL slug (kebab-case)
    name: 'My New Project',                  // ← Display name
    description: 'What this project does.',  // ← Short description
    icon: '⭐',                               // ← Emoji icon
    repo: 'https://github.com/you/my-project', // ← GitHub repo (optional)
    sections: {
      'getting-started': {                   // ← Section slug
        title: 'Getting Started',            // ← Section display name
        pages: [
          { slug: 'introduction', title: 'Introduction' },
          { slug: 'installation', title: 'Installation' },
        ],
      },
      'api': {
        title: 'API Reference',
        pages: [
          { slug: 'overview', title: 'Overview' },
          { slug: 'endpoints', title: 'Endpoints' },
        ],
      },
    },
  },

}
```

**That's it for code changes.** The sidebar, breadcrumbs, landing cards, and routes are all auto-generated from this config.

## Step 2: Add content

Create matching folders and markdown files:

```
public/content/my-new-project/
├── getting-started/
│   ├── introduction.md         ← /my-new-project/getting-started/introduction
│   └── installation.md         ← /my-new-project/getting-started/installation
└── api/
    ├── overview.md             ← /my-new-project/api/overview
    └── endpoints.md            ← /my-new-project/api/endpoints
```

**Folder structure rule:**
```
public/content/{project-slug}/{section-slug}/{page-slug}.md
```
Must match exactly the slugs used in `projects.js`.

## How it works

```
projects.js          →  Sidebar navigation (auto-generated)
                     →  Home page cards (auto-generated)
                     →  Breadcrumb trail (auto-generated)
                     →  Project landing page cards (auto-generated)

public/content/...   →  Page content (fetched at runtime as markdown)
```

## Tips

- **Emoji icons**: Pick from https://emojipedia.org — any emoji works.
- **Markdown**: Use standard GitHub-flavored markdown in `.md` files.
- **Sections**: Group related pages under a section. Each section appears as a collapsible group in the sidebar.
- **Pages**: Each page slug becomes part of the URL. Use kebab-case for slugs.
- **No build required**: Content is loaded at runtime — just refresh the page.
- **Placeholder**: If a `.md` file is missing, the site shows a generated placeholder so navigation never breaks.
