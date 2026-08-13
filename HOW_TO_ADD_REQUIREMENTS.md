# How to Add Requirements (for Non-Technical Users)

A quick guide for **project managers, product owners, and business users** to add
**requirement documents** for any project, section, or page — **without writing any code**.

---

## What is this?

Your docs site now has **two kinds of content** for the same project:

| Type | What it shows | Who writes it |
|------|---------------|---------------|
| **Docs** | How things work, installation guides, API reference | Developers |
| **Requirement** | What the feature *should do* (objective, acceptance criteria) | Managers / business users |

You switch between them with the **Docs / Requirement** toggle in the top bar.

> A requirement document answers: *"What should this do, and how do we know it's done?"*

---

## The Big Rule (only one thing to remember)

> **A requirement file lives in the SAME place as its page, but inside a
> `requirements` folder — and it has the SAME name as the page.**

The side bar already tells you every page's location. You just mirror it.

---

## Step-by-step (plain English)

### Step 1 — Find the page's "address"

Open the page you want to write requirements for and look at the URL.

Example URL:
```
/rokko/getting-started/bom-product/overview/finished-unit
```

Break it into parts:
```
/ {project} / {section} / {page...}
```

### Step 2 — Create a file at the same address, under `requirements`

Inside your project folder, create a mirror folder called `requirements`.

So for the page `finished-unit` above, create the folder:
```
public/content/requirements/rokko/getting-started/bom-product/overview/
```
and put a file named exactly like the page:
```
finished-unit.md
```

Full path:
```
public/content/requirements/rokko/getting-started/bom-product/overview/finished-unit.md
```

### Step 3 — Write the requirement in plain text

Open the file in any text editor (Notepad, VS Code) and write your requirement using
plain text with simple "heading" lines (a `#` at the start of a line makes a heading).
There's a ready-to-use template below.

### Step 4 — Refresh the site

Toggle to **Requirement** in the top bar and open the page — your text appears.

---

## ✍️ Ready-to-use template

Copy this into your new `.md` file and fill it in:

```markdown
# Requirement: <Page Title>

## Objective
...
What does this feature/page need to achieve? (one or two sentences)

## Stakeholders
- Who is affected? (which team / roles)

## Acceptance Criteria
- How do we verify it works?
- Each point should be checkable (yes/no).
- Example: "Assigning more parts than required is blocked with a message."

## Out of Scope
- What is intentionally NOT included right now?

## Notes
- Anything else the team should know, links, or open questions.
```

---

## 📝 Short example

```markdown
# Requirement: Finished Unit Component Management Flow

## Objective
Let operators manage which parts are on each finished unit: assign, replace,
mark faulty, and remove parts — and keep stock accurate.

## Stakeholders
- Production / assembly operators
- Warehouse / inventory team
- Developers

## Acceptance Criteria
- A finished unit shows its current parts and status.
- An operator can assign a part up to the required quantity.
- Assigning more than required is blocked with a clear message.
- Replacing a faulty part updates stock and keeps a history record.

## Out of Scope
- Warranty tracking per part
- Rolling back an entire manufacturing batch

## Notes
- Part status is stored per finished unit, not globally.
- See docs page for technical details.
```

---

## 🗂️ Folder cheat-sheet

```
public/content/
├── rokko/                       ← project folder (docs)
│   └── getting-started/
│       └── bom-product/
│           └── overview/
│               └── finished-unit.md      ← the DOC page
└── requirements/                ← requirements live here
    └── rokko/
        └── getting-started/
            └── bom-product/
                └── overview/
                    └── finished-unit.md  ← the REQUIREMENT page
```

**The name and folder path must match the page exactly** so the toggle finds it.

---

## ❓ Common questions

**Q: What if a page has no requirement file yet?**
The site shows a friendly "No requirement document yet" message with a suggestion — nothing breaks.

**Q: Do I need to write a requirement for EVERY page?**
No. Only create files for pages that need requirements.

**Q: How do I share a requirement with someone?**
Open the page in **Requirement** mode, copy the URL (it will contain
`?mode=requirements`), and send it. They'll see the requirement directly.

**Q: I only want a requirement for a whole section, not each page.**
That's fine — you can put main points on the first page of that section, or add
requirements to each page under the section. Choose what fits your team.

---

## 💡 Tips

- Use `##` for each main heading inside your requirement (Objective, Acceptance Criteria…).
- Keep each acceptance criterion **one sentence and verifiable**.
- Bullet lists: start a line with `- ` (dash + space).
- Bold text: wrap words in `**` like `**Objective**`.
- You can edit requirement files any time — just save and refresh.

---

That's it! No code, no setup — create a `.md` file in the right mirror folder and it appears.
