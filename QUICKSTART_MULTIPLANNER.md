# 🎯 QUICK REFERENCE & PERSONNALISATION MULTIPLANNER

---

## 📊 Vue d'ensemble visuelle

```
EvenoPro Architecture
├─ 60+ Écrans
├─ 40+ Composants
├─ 1 Thème (Light/Dark)
├─ 1 API (à connecter)
└─ 1 Database (à connecter)

Arborescence fichiers :
 app/              → Écrans (file-based routing Expo Router)
 components/       → Composants réutilisables
 constants/        → Couleurs, fonts, icônes, images
 theme/           → Gestion du mode clair/sombre
 data/            → Données statiques (maps styles)
 utils/           → Fonctions utilitaires (validation, API)
 assets/          → Icônes, images, fonts
 styles/          → Styles communs
 tabs/            → Composants de sections (optionnel)
```

---

## 🔄 Flux utilisateur typique

```
┌─────────────┐
│   Welcome   │ ← Splash screen
└──────┬──────┘
       ↓
┌─────────────┐
│   Login     │ ← Authentification
└──────┬──────┘
       ↓
┌──────────────────────────────────┐
│         Tabs Navigation           │
├──────────────────────────────────┤
│ Home │ Explore │ Fav │ Profile   │
├──────────────────────────────────┤
│  ↓    ↓         ↓      ↓         │
│ Actus Events  Saved   My Account │
│  ↓    ↓         ↓      ↓         │
│ ...  EventDtl  ...    Settings   │
│      ↓                           │
│    ▶ Book ──→ Payment ──→ Receipt│
└──────────────────────────────────┘
```

---

## ⚡ Technos clés à connaître

| Techno | Comment l'utiliser | Où en trouver |
|---|---|---|
| **Expo Router** | `navigation.navigate('page')` | `app.json` plugins |
| **ThemeProvider** | `const { dark, colors } = useTheme()` | `theme/ThemeProvider.tsx` |
| **TypeScript** | Tous les types stricts | `tsconfig.json` |
| **React Hooks** | `useState`, `useEffect`, `useReducer` | React docs |
| **StyleSheet** | `const styles = StyleSheet.create({})` | React Native docs |

---

## 📋 CHECKLIST: Personnaliser pour MultiPlanner

### ✅ PHASE 1: Branding (2-3h)

- [ ] **Logo**
  - Remplacer `assets/images/logo.png`
  - Remplacer `assets/images/icon.png` (iOS/Android icon)
  - Remplacer `assets/images/splash.png` (splash screen)

- [ ] **Couleurs**
  - Modifier `constants/theme.ts` : `COLORS.primary = '#3B82F6'` (ex: bleu)
  - Tester light & dark mode
  - Vérifier contrast (WCAG AA min)

- [ ] **Polices**
  - Option A: Garder "Urbanist" (déjà chargée)
  - Option B: Changer tous les TTF dans `assets/fonts/` + mettre à jour `constants/fonts.ts`

- [ ] **Assets**
  - Remplacer illustrations dans `assets/illustrations/`
  - Remplacer événements d'exemple dans `assets/images/events/`
  - Remplacer utilisateurs d'exemple dans `assets/images/users/`

**Vérifier:** `npx expo start -c` → app s'ouvre en thème clair & sombre

---

### ✅ PHASE 2: Navigation & Flux (4-6h)

- [ ] **Approuver la structure navigation**
  - ✅ Garder : (tabs) avec Home, Explore, Favs, Profile, Tickets
  - ✅ Garder : Événement, Booking, Payment
  - ❌ Supprimer : KYC, Verification (face recognition, ID card, etc.)
  - ❌ Supprimer : Onboarding spécifique EvenoPro
  - ❓ Ajouter : ? (Event creation? Artist dashboard? ...)

- [ ] **Supprimer écrans inutiles**
  - Créer branche : `git checkout -b cleanup/remove-unused-screens`
  - Supprimer fichiers : `app/facerecognition*.tsx`, `app/verification*.tsx`, etc.
  - Nettoyer imports dans `app/_layout.tsx`
  - Commit : `git commit -m "cleanup: remove KYC/verification screens"`

- [ ] **Adapter welcome/login**
  - Modifier `app/index.tsx` (splash → custom)
  - Modifier `app/login.tsx` (branding, logo)
  - Modifier `app/signup.tsx` (simplified, no KYC yet)

- [ ] **Renommer si besoin**
  - `/explore` → `/findEvents`
  - `/eventdetails` → `/eventPage`
  - (Optionnel, pour clarté)

---

### ✅ PHASE 3: Données & API (6-10h)

- [ ] **Identifier API backend**
  - URL? (ex: `https://api.multiplanner.com`)
  - Authentification? (JWT? Session?)
  - Endpoints clés?
    - `GET /events` - Liste événements
    - `GET /events/:id` - Détail
    - `POST /bookings` - Réserver
    - `POST /auth/login` - Login
    - etc.

- [ ] **Créer utilitaire API** (`utils/api.ts`)
  ```tsx
  export const api = {
      getEvents: () => fetch('...'),
      bookEvent: (eventId, count) => fetch('...'),
      // ... rest
  };
  ```

- [ ] **Connecter écrans clés**
  - `app/(tabs)/explore.tsx` : appeler `api.getEvents()`
  - `app/eventdetails.tsx` : appeler `api.getEventById(id)`
  - `app/bookevent.tsx` : appeler `api.bookEvent()`
  - `app/login.tsx` : appeler `api.login(email, pwd)`

- [ ] **Ajouter AuthContext** (optionnel mais recommandé)
  - Créer `context/AuthContext.tsx`
  - Wrapper l'app
  - Usage : `const { user, isAuthenticated } = useAuth();`

- [ ] **Tester en dev**
  - Backend local? Ou staging?
  - Vérifier tokens/cookies
  - Déboguer réseau (React Native Debugger)

---

### ✅ PHASE 4: Paiement (4-6h si tiers service)

- [ ] **Choisir provider**
  - Stripe? PayPal? Local? Autre?

- [ ] **Si Stripe:**
  - `npm install --legacy-peer-deps @stripe/stripe-react-native`
  - Créer composant `components/StripePayment.tsx`
  - Intégrer dans `app/paymentmethods.tsx`

- [ ] **Si PayPal:**
  - Intégrer SDK
  - Adapter en React Native

- [ ] **Tester**
  - Émulateur Android / iOS
  - Cartes de test du provider

---

### ✅ PHASE 5: Validation & Testing (3-5h)

- [ ] **Audit final**
  - [ ] Dark mode fonctionne everywhere
  - [ ] Pas d'erreurs console
  - [ ] Navigation fluide
  - [ ] API répond (ou mock OK)
  - [ ] Formes valident
  - [ ] Images format OK (PNG, JPEG)
  - [ ] Pas de console.logs en prod

- [ ] **Tests sur devices réels**
  - [ ] Android (phone spécifique)
  - [ ] iOS (iPhone spécifique)
  - [ ] Réseau 4G (pas WiFi)
  - [ ] A/B colorscheme

- [ ] **Google Play & App Store Checklist**
  - [ ] Politique confidentialité
  - [ ] Conditions d'utilisation
  - [ ] Support email
  - [ ] Captures d'écran
  - [ ] Description claire

---

## 🔧 Commandes essentielles

### Développement

```bash
# Installation initiale
npm install --legacy-peer-deps

# Lancer serveur
npx expo start -c

# Scannez QR avec Expo Go, ou :
npx expo start -c --android     # Émulateur Android
npx expo start -c --ios         # Simulateur iOS (macOS)
```

### Version control

```bash
# Voir état
git status

# Créer feature branch
git checkout -b feature/my-feature

# Commit
git add .
git commit -m "feat: describe what you did"

# Push
git push origin feature/my-feature

# Créer PR sur GitHub
# → Merge quand OK
```

### Build & Deploy

```bash
# Preview web
npx expo export:web

# Build Android APK
eas build --platform android --profile preview

# Build iOS
eas build --platform ios --profile preview

# Submit to stores (si configured)
eas submit --platform android
eas submit --platform ios
```

---

## 📁 Fichiers à modifier en priorité

| Priorité | Fichier | Raison |
|---|---|---|
| 🔴 1 | `constants/theme.ts` | Couleurs globales |
| 🔴 1 | `assets/images/` | Logo, icons, splash |
| 🔴 1 | `app/_layout.tsx` | Routes principales |
| 🟡 2 | `app/(tabs)/explore.tsx` | API événements |
| 🟡 2 | `app/login.tsx` | Authentification |
| 🟡 2 | `utils/api.ts` | (créer) Endpoints |
| 🟢 3 | `components/Button.tsx` | Styling optionnel |
| 🟢 3 | `theme/ThemeProvider.tsx` | Modes supplémentaires |

---

## ⚠️ Pièges courants

### ❌ Pièges

1. **Oublier `--legacy-peer-deps`**
   ```bash
   npm install                              # ❌ Crash
   npm install --legacy-peer-deps          # ✅ OK
   ```

2. **Modifier directement `node_modules`**
   - Les changements seront perdus avec `npm install`
   - Faire les changements dans le code source

3. **Importer du bundler web dans native code**
   ```jsx
   import { MapView } from 'react-native-maps';  // ❌ Web crash
   import MapView from '@/components/MapComponents'; // ✅ Cross-platform
   ```

4. **Oublier `useTheme()` pour dark mode**
   ```tsx
   color: '#000'     // ❌ Toujours noir
   color: dark ? '#fff' : '#000'  // ✅ Dynamic
   ```

5. **Styles inline au lieu de StyleSheet**
   ```tsx
   style={{ width: 100 }}  // ❌ Refait calcul each render
   const styles = StyleSheet.create({ w: { width: 100 } })  // ✅
   ```

---

## 📞 Support & Ressources

### Docs officielles
- Expo : https://docs.expo.dev
- React Native : https://reactnative.dev
- Expo Router : https://docs.expo.dev/router/

### Tools
- React Native Debugger : https://github.com/jhen0409/react-native-debugger
- Expo CLI : `npm install -g expo-cli`
- Android Studio : Émulateur Android
- Xcode : Simulateur iOS

### Debugging
```bash
# Logs console
# Appuyez sur 'j' dans console Expo

# React DevTools
npx react-devtools

# Network
React Native Debugger → Network tab
```

---

## 📈 Timeline estimée

| Phase | Durée | Complexité |
|---|---|---|
| Branding (logo, couleurs) | 2-3h | 🟢 Facile |
| Navigation cleanup | 2-4h | 🟢 Facile |
| API backend | 6-10h | 🟡 Moyen |
| Paiement | 4-6h | 🟡 Moyen |
| Testing & refinement | 3-5h | 🟡 Moyen |
| Deployment | 2-4h | 🟡 Moyen |
| **TOTAL** | **19-32h** | |

**Extrapolatoire:** 3-4 jours pour une équipe de 1 dev temps plein.

---

## 🎉 Checklist finale avant launch

```
[ ] Branding complet (logo, couleurs, fonts)
[ ] Navigation fluide & testée
[ ] API fully connected & tested
[ ] Login/Auth working
[ ] Event list loads & displays
[ ] Booking flow end-to-end
[ ] Payment integration tested
[ ] Dark mode tested everywhere
[ ] No console errors
[ ] Android build passes
[ ] iOS build passes (if on Mac)
[ ] Privacy policy added
[ ] Support contact available
[ ] App Store listing prepared
[ ] Screenshots taken
[ ] Version bumped (1.0.0 or similar)
[ ] Git in clean state (all committed)
[ ] Final testing on real devices
[ ] Deploy to staging env
[ ] Team sign-off
[ ] SHIP IT! 🚀
```

---

**Status:** Ready for customization  
**Stack:** React Native + Expo  
**Architecture:** File-based routing + Context API  
**Next Step:** Start with PHASE 1: Branding

