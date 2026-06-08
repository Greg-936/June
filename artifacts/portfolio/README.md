# Gregory Muna — Portfolio Website

A clean, professional multi-page portfolio website built with plain **HTML**, **CSS**, and **Vanilla JavaScript**. No frameworks, no libraries — just the fundamentals.

Live on Replit · [GitHub](https://github.com/Greg-936/june)

---

## File & Folder Structure

```
artifacts/portfolio/
│
├── index.html          ← Home page (hero, skills, featured projects)
├── about.html          ← About page (bio, skill bars, timeline)
├── projects.html       ← Projects page (filterable card grid)
├── contact.html        ← Contact page (validated form + contact info)
├── dashboard.html      ← Dashboard (view contact form submissions)
│
├── src/
│   ├── style.css       ← ALL styles for every page (one file)
│   └── script.js       ← ALL JavaScript for every page (one file)
│
├── vite.config.ts      ← Dev server configuration (Vite)
├── package.json        ← Project dependencies and scripts
└── README.md           ← This file
```

### Where is each language?

| Language   | File(s)              | What it does |
|------------|----------------------|--------------|
| HTML       | `*.html` (5 files)   | Structure and content of each page |
| CSS        | `src/style.css`      | All colors, layout, spacing, animations |
| JavaScript | `src/script.js`      | Mobile menu, project filter, form validation, dashboard |

---

## Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Hero section, skills grid, featured project cards |
| About | `/about.html` | Bio text, skill progress bars, experience timeline |
| Projects | `/projects.html` | Filterable project cards (Web Apps, Websites, Tools) |
| Contact | `/contact.html` | Contact form with validation, social links |
| Dashboard | `/dashboard.html` | Private view of all form submissions (localStorage) |

---

## How Client Messages Work

When a visitor fills out the **Contact form** and clicks "Send Message":

1. JavaScript validates the form fields (name, email, subject, message)
2. On success, the data is saved to **`localStorage`** — storage built into the visitor's browser
3. You can view all submissions by navigating to `/dashboard.html`

> **Important limitation:** `localStorage` is browser-based. This means:
> - Submissions are stored in **your** browser when you test it yourself
> - Messages submitted by visitors on **their** device are stored in **their** browser — you cannot see them
> - There is **no email notification** and no server storing the data centrally
>
> To actually receive messages from clients, you have two options:
> - **Option A (easiest):** Replace the form with a [Formspree](https://formspree.io) form — free, sends submissions directly to your email, no backend needed
> - **Option B:** Add a backend server (Node.js + a database) to store and forward submissions

---

## How to Run Locally (on your own computer)

### Prerequisites
- [Node.js](https://nodejs.org) installed (version 18 or higher)
- [pnpm](https://pnpm.io) package manager (`npm install -g pnpm`)

### Steps

```bash
# 1. Clone your GitHub repo
git clone https://github.com/Greg-936/june.git
cd june/artifacts/portfolio

# 2. Install dependencies
pnpm install

# 3. Start the development server
PORT=5173 pnpm run dev

# 4. Open in your browser
# Visit: http://localhost:5173
```

The site will hot-reload automatically when you save any file.

---

## Deployment

### Option 1 — Deploy on Replit (simplest)

1. Open your project on [replit.com](https://replit.com)
2. Click the **"Deploy"** button in the top-right corner
3. Choose **"Autoscale"** deployment
4. Click **"Deploy"** — Replit builds and hosts the site automatically
5. Your site gets a live URL like `https://june.yourname.replit.app`

No server configuration required. Replit handles everything.

---

### Option 2 — Deploy on GitHub Pages (free, static hosting)

GitHub Pages hosts static HTML/CSS/JS sites for free directly from your repo.

#### Setup steps

```bash
# 1. In your repo, go to Settings → Pages
# 2. Under "Source", select "Deploy from a branch"
# 3. Choose branch: main  |  folder: / (root)  or /docs
# 4. Click Save
```

Because this project uses Vite, you need to build first:

```bash
cd artifacts/portfolio
PORT=5173 BASE_PATH=/ pnpm run build
# Output goes to: artifacts/portfolio/dist/public/
```

Copy the contents of `dist/public/` to your repo root (or a `/docs` folder), push, and GitHub Pages will serve it.

Your live URL will be: `https://greg-936.github.io/june`

---

### Option 3 — Deploy on Netlify (recommended for simplicity)

1. Go to [netlify.com](https://netlify.com) and sign up with your GitHub account
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your GitHub and select `Greg-936/june`
4. Set build settings:
   - **Base directory:** `artifacts/portfolio`
   - **Build command:** `PORT=5173 BASE_PATH=/ pnpm run build`
   - **Publish directory:** `artifacts/portfolio/dist/public`
5. Click **"Deploy site"**

Netlify automatically redeploys every time you push new code to GitHub.

---

## Making Changes & Pushing to GitHub

Every time you update the site, push your changes to keep GitHub in sync:

```bash
# From inside artifacts/portfolio
git add .
git commit -m "Describe what you changed"
git push
```

---

## Key Concepts Used

| Concept | Where used | Why |
|---------|-----------|-----|
| CSS Custom Properties | Top of `style.css` | Change colors/spacing in one place |
| CSS Grid `auto-fill` | Cards layout | Responsive columns with no media queries |
| CSS Flexbox | Navbar, hero, footer | Horizontal alignment and spacing |
| `DOMContentLoaded` | `script.js` | Ensures JS runs after HTML is ready |
| `dataset.*` | Project filter | Reads `data-filter` / `data-category` from HTML |
| `localStorage` | Contact form + dashboard | Saves form data in the browser |
| Inline SVG | Footer social icons | Sharp icons at any size, no image files needed |
| `textContent` (not `innerHTML`) | Dashboard table | Prevents XSS / code injection from user input |
| `event.preventDefault()` | Contact form | Stops page reload on form submit |

---

## Contact

- **Email:** gregorymuna2018@gmail.com
- **GitHub:** [github.com/Greg-936](https://github.com/Greg-936)
- **LinkedIn:** [linkedin.com/in/gregory-muna-a2872b23a](https://www.linkedin.com/in/gregory-muna-a2872b23a)
