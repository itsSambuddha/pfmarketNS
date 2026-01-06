# PWA Implementation TODO

- [x] Create `public/manifest.json` with complete manifest content including "start_url": "/", "scope": "/", "id": "/"
- [x] Update `app/layout.tsx`: Change viewport themeColor to "#15579d", add top bar component for app name and tagline, include PWA service worker registration component
- [x] Create `components/PwaServiceWorkerRegister.tsx` (client component) for service worker registration
- [x] Create `public/service-worker.js` with install, activate, fetch handlers for caching strategies
- [x] Update `app/page.tsx` to home page with explanation bullets and CTA button
- [x] Create `app/offline/page.tsx` for offline fallback
- [x] Create `app/deck/new/page.tsx` as placeholder for new deck
- [x] Create `app/deck/[id]/page.tsx` as placeholder for deck view/edit
