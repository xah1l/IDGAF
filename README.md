# Highto

Highto is a personal wellbeing, safety, family and smart-living platform with one AI companion: **JORDAN**.

## Develop in GitHub Codespaces

```bash
npm install
npm run dev -- --host 0.0.0.0
```

Open the forwarded Vite port. The marketing site is at `/`; the interactive product workspace is at `/app.html`.

## Deploy free with GitHub Pages

The repository includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml`.

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Push to `main` or manually run **Deploy Highto to GitHub Pages** from the Actions tab.
4. Once the workflow succeeds, the site will be available at:
   `https://xah1l.github.io/IDGAF/`

## Included

- Responsive Highto marketing site
- Single JORDAN companion identity
- Five product domains
- Interactive workspace at `/app.html`
- Local health journal and medication list
- Local emergency details form
- Local trusted contacts manager
- Smart-home demo switches
- Local profile preferences
- Responsive mobile navigation

## Prototype boundaries

The workspace stores demo entries in browser local storage only. Authentication, cloud database, live JORDAN AI responses, health-provider APIs, wearable sync, physical smart-home controls, family sharing, push notifications and emergency dispatch are not connected. Demo controls are not live integrations.
