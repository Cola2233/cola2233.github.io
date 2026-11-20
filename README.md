# Zhilin Xue / 薛知林 — Academic Homepage

A lightweight, responsive **English / 中文 academic homepage** for GitHub Pages.

**Intended address:** https://cola2233.github.io/  
**GitHub account:** https://github.com/Cola2233

## Contents

- `index.html` — bilingual research homepage (about, interests, research, academic activities, skills and contact).
- `cv.html` — bilingual academic CV, designed for browser printing / Save as PDF.
- `assets/styles.css` — styles, responsive layout and print formatting.
- `assets/translations.js` — all English / Chinese copy. Edit text here.
- `assets/main.js` — language switching, persistent preference, mobile navigation and print action.
- `assets/favicon.svg` — `ZX` site icon.
- `.nojekyll` — disable unnecessary Jekyll processing on GitHub Pages.

## Publishing to your personal GitHub Pages address

The GitHub repository has **not yet been created or published**. To use the exact address `https://cola2233.github.io/`, the GitHub account **Cola2233** must own a public repository named **`cola2233.github.io`** (lowercase is recommended).

1. Open <https://github.com/new?name=cola2233.github.io> and confirm the owner is `Cola2233`.
2. Enter repository name **`cola2233.github.io`**, set **Public**, and click **Create repository**. Create it empty; do not initialize with a README if uploading by Git.
3. Upload the files at the **root** of the new repository, preserving `assets/` and `.nojekyll` (GitHub web upload does not reliably include hidden files; `.nojekyll` is optional for this site).
4. Open **Settings → Pages → Build and deployment**. Select **Deploy from a branch**, branch **`main`**, folder **`/(root)`**, then **Save**.
5. After GitHub completes the deployment, visit <https://cola2233.github.io/>.

You may also publish from a local terminal:

```bash
# Run inside the extracted site directory, after creating the empty repository
 git init
 git branch -M main
 git add .
 git commit -m "Launch bilingual academic homepage"
 git remote add origin https://github.com/Cola2233/cola2233.github.io.git
 git push -u origin main
```

If you already created a repository with an initial commit, prefer uploading the files in GitHub's web UI rather than pushing an unrelated history without merging.

## Personalization before sharing with faculty

- **No personal email is published by default**, because the account's private email should not be disclosed automatically. Add a public academic contact address only after deciding which one to share.
- Review the exact status of the **Jilin Geographical Society 2026** oral presentation. The current wording is *invited*, not a claim that the talk was delivered.
- Verify the GeoSus conference description and optionally link official evidence.
- Add project screenshots only if you own the rights to publish them and the figures are appropriate for public release.
- Add publication links, code or research artifacts *when publicly available*. This draft makes no claims about peer-reviewed full-paper publications or prior embodied-AI experiments.
- Optionally use a headshot and custom domain later.

### Editing both languages

Open `assets/translations.js`; change the text under `en` and `zh` for matching keys. You should not need to edit HTML for most text changes. The switch is accessible by keyboard, stores the language choice locally, and keeps language selection when moving between the homepage and CV.

## Local preview

Open `index.html` in a browser or run:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000/>. No build tools or backend are required.

---

Site designed as an academic research portfolio; illustrative map motifs are **not empirical outputs**.
