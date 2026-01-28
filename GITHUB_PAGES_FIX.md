# GitHub Pages Path Resolution Fix

## Problem
The SaúdePG PWA was showing 404 errors when accessed on iOS via GitHub Pages, while working perfectly on desktop (localhost). This was due to GitHub Pages handling repository subdirectories differently, especially on iOS Safari which is more strict about path resolution.

## Root Cause
GitHub Pages hosts repositories in subdirectories (e.g., `https://username.github.io/SaudePG-main/`), but relative paths (`./) weren't resolving correctly on iOS Safari. Additionally:
- Manifest.json path was hardcoded as `manifest.json`
- Service Worker registration used hardcoded path `service-worker.js`
- iOS redirect to installation instructions used hardcoded path `./instalar.html`

## Solution
Implemented dynamic path detection via `base-config.js` that:

1. **Detects deployment environment:**
   - `localhost` or `127.0.0.1` → Uses `./` (root)
   - `file://` protocol → Uses `./` (local testing)
   - GitHub Pages domain → Parses URL to find repository name and constructs correct path

2. **Sets global variable:**
   - `window.APP_BASE_PATH` is set early in page load
   - Available to all subsequent scripts
   - Used to build correct paths for all resources

3. **Applied to all critical paths:**
   - Manifest link `href` attribute
   - Service Worker registration path
   - iOS installation redirect link

## Files Modified

### New File
- **[base-config.js](base-config.js)** - Dynamic path detection utility

### Updated Files
- **[index.html](index.html)**
  - Added `<script src="base-config.js"></script>` as first script
  - Changed manifest link to use dynamic path via `APP_BASE_PATH`
  - Updated Service Worker registration to use `APP_BASE_PATH`

- **[mapa.html](mapa.html)**
  - Added `<script src="base-config.js"></script>` as first script
  - Changed manifest link to use dynamic path

- **[atendimento.html](atendimento.html)**
  - Added `<script src="base-config.js"></script>` as first script
  - Changed manifest link to use dynamic path

- **[direitos.html](direitos.html)**
  - Added `<script src="base-config.js"></script>` as first script
  - Changed manifest link to use dynamic path

- **[instalar.html](instalar.html)**
  - Added `<script src="base-config.js"></script>` as first script

- **[components/install-prompt.js](components/install-prompt.js)**
  - Updated iOS redirect link to use `window.APP_BASE_PATH + 'instalar.html'`
  - Now dynamically constructs the correct path at render time

## How It Works

### On Localhost/Desktop
```javascript
// Detected path: ./
window.APP_BASE_PATH = './';
// Service Worker: ./service-worker.js
// Manifest: ./manifest.json
// Installer page: ./instalar.html
```

### On GitHub Pages
```javascript
// URL: https://user.github.io/SaudePG-main/
// Detected path: /SaudePG-main/
window.APP_BASE_PATH = '/SaudePG-main/';
// Service Worker: /SaudePG-main/service-worker.js
// Manifest: /SaudePG-main/manifest.json
// Installer page: /SaudePG-main/instalar.html
```

## Testing Checklist

- [ ] Desktop: Download and install PWA
- [ ] Desktop: Works offline, caches content
- [ ] iOS: Access via GitHub Pages URL
- [ ] iOS: See installation prompt
- [ ] iOS: Click "Ver Instruções" (should navigate correctly)
- [ ] Android: Chrome PWA prompt appears
- [ ] Android: Installation works via Google Play prompt

## Browser Console Logs

All path resolution is logged to the browser console:
```javascript
📍 Base path: ./              // On localhost
📍 Base path: /SaudePG-main/  // On GitHub Pages
📍 Registrando Service Worker de: ./service-worker.js
✓ Service Worker registrado com sucesso: ...
```

## Technical Notes

1. **Script Order Matters:** `base-config.js` must load before any other scripts that use `APP_BASE_PATH`
2. **Relative Links:** Navigation links like `href="mapa.html"` work fine without modification since browsers resolve them relative to current location
3. **External Resources:** CDN resources (Tailwind, Leaflet, etc.) don't need path prefixing since they're absolute URLs
4. **Service Worker Scope:** The scope is also set dynamically to match the base path

## GitHub Pages Setup Notes

If hosting at a custom domain (e.g., `saudepg.com`), the base path detection will still work since it checks for repository subdirectories.

For repository at: `username.github.io/SaudePG-main/`
- Set your repository name correctly in GitHub Pages settings
- The script will auto-detect `/SaudePG-main/` path
- No manual configuration needed!
