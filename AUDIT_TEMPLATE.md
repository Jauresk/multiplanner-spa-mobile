# 📋 AUDIT COMPLET - EvenoPro Template
**Date:** 29 avril 2026  
**Statut:** Opérationnel ✅  
**Stack:** React Native + Expo + TypeScript  

---

## 📑 TABLE DES MATIÈRES

1. [Vue d'ensemble architecturale](#vue-densemble)
2. [Structure des dossiers](#structure)
3. [Système de routing](#routing)
4. [Système de design (Thème & Couleurs)](#design)
5. [Composants réutilisables](#composants)
6. [Écrans / Pages](#écrans)
7. [Utilitaires & Données](#utils)
8. [Dépendances critiques](#dépendances)
9. [Guide de personnalisation](#personnalisation)
10. [Process de déploiement](#déploiement)

---

## 🏗️ Vue d'ensemble  {#vue-densemble}

**EvenoPro** est une **application mobile d'événement & réservation** basée sur Expo Router v6 avec TypeScript.

### Architecture générale

```
┌─────────────────────────────────────────────────────────────────┐
│                     EXPO ROUTER (Stack + Tabs)                  │
│   ┌───────────────────────────────────────────────────────┐    │
│   │              ThemeProvider (Context)                 │    │
│   │   ┌──────┬──────┬──────────┬──────────────────────┐ │    │
│   │   │ Home │ Tabs │ Onboarding │ Event Pages ... │ │    │
│   │   └──────┴──────┴──────────┴──────────────────────┘ │    │
│   └───────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
         ↓
   [Réutilisable Components]   [Assets]   [Constants/Theme]
```

### Stack technologique

| Technologie | Version | Rôle |
|---|---|---|
| **React Native** | 0.81.5 | Framework cross-platform |
| **Expo** | ~54.0.31 | Gestion build/dev |
| **Expo Router** | ~6.0.21 | File-based routing (navigation) |
| **TypeScript** | ~5.9.2 | Typage statique |
| **React** | 19.1.0 | UI library |
| **react-native-reanimated** | 4.1.6 | Animations natives |
| **react-native-maps** | 1.20.1 | Maps natives (native seulement, shim web) |
| **react-native-gifted-chat** | 2.4.0 | Chat UI |
| **react-native-picker-select** | 9.3.1 | Dropdowns |

---

## 📂 Structure des dossiers  {#structure}

```
EvenoPro/
├── app/                           # 🔥 ROUTING & ÉCRANS (Expo Router)
│   ├── _layout.tsx               # Layout racine + Stack config
│   ├── (tabs)/                   # Groupe de tabs (onglets principaux)
│   │   ├── _layout.tsx          # Config des 5 onglets
│   │   ├── index.tsx            # Accueil (Home)
│   │   ├── explore.tsx          # Répertoire des événements
│   │   ├── favourites.tsx       # Favoris
│   │   ├── profile.tsx          # Profil utilisateur
│   │   └── tickets.tsx          # Mes billets
│   ├── index.tsx                # Splash/Welcome initial
│   ├── login.tsx                # Écran login
│   ├── signup.tsx               # Inscription
│   ├── onboarding2-4.tsx        # Onboarding (tutoriel)
│   ├── eventdetails.tsx         # Détail événement
│   ├── bookevent.tsx            # Réservation événement
│   ├── paymentmethods.tsx       # Méthodes de paiement
│   ├── address.tsx              # Gestion adresses
│   ├── addnewaddress.tsx        # Ajouter adresse (avec MapView)
│   ├── settings*.tsx            # Pages paramètres (~15)
│   ├── verification*.tsx        # Pages vérification KYC (~8)
│   └── ... (50+ autres écrans)
│
├── components/                    # 🧩 COMPOSANTS RÉUTILISABLES
│   ├── Button.tsx               # Bouton personnalisé
│   ├── Input.tsx                # Champ de saisie
│   ├── Header.tsx               # En-tête avec retour
│   ├── Card.tsx                 # Carte générique
│   ├── *EventCard.tsx           # Cartes événements (4 variantes)
│   ├── ReviewCard.tsx           # Avis utilisateur
│   ├── NotificationCard.tsx     # Notification
│   ├── MapComponents.tsx        # Wrapper maps (native)
│   ├── MapComponents.web.tsx    # Stub maps (web)
│   ├── SettingsItem.tsx         # Item paramètres
│   ├── GlobalSettingsItem.tsx   # Switch on/off
│   ├── DatePickerModal.tsx      # Sélecteur date popup
│   ├── navigation/
│   │   └── TabBarIcon.tsx      # Icônes onglets avec badges
│   └── ... (35+ autres composants)
│
├── constants/                     # ⚙️ CONFIGURATION STATIQUE
│   ├── index.ts                 # Export central
│   ├── theme.ts                 # COLORS, SIZES, FONTS
│   ├── icons.ts                 # Map {name → require(path)}
│   ├── images.ts                # Map images (avatars, splash...)
│   ├── illustrations.ts         # Illustrations (onboarding...)
│   ├── socials.ts               # Réseaux sociaux (LinkedIn, Facebook...)
│   └── fonts.ts                 # Polices Expo (Urbanist 18 poids)
│
├── theme/                         # 🎨 THÈME & STYLING
│   ├── ThemeProvider.tsx        # Context React (light/dark)
│   ├── colors.ts                # lightColors / darkColors
│   └── (useTheme hook pour accès global)
│
├── data/                          # 📊 DONNÉES STATIQUES
│   ├── mapData.ts               # Styles Google Maps (light/dark)
│   └── index.ts
│
├── styles/                        # 🎯 STYLES COMMUNS
│   ├── CommonStyles.ts          # StyleSheet réutilisables
│   └── OnboardingStyles.ts
│
├── utils/                         # 🛠️ UTILITAIRES
│   ├── actions/
│   │   └── formActions.ts       # Validation (email, phone, etc.)
│   ├── reducers/
│   │   └── formReducers.ts      # Reducer pour formulaires
│   ├── ValidationConstraints.ts # Regex patterns
│   ├── ImagePickerHelper.ts     # Helpers image picker
│   ├── date.ts                  # Formatage dates
│   └── (utilities métier)
│
├── assets/                        # 🖼️ RESSOURCES
│   ├── icons/                   # 200+ icônes PNG (~100 variantes)
│   ├── images/                  # Avatar, splash, événements...
│   ├── illustrations/           # Illustrations onboarding, KYC...
│   └── fonts/                   # Urbanist (18 fichiers TTF)
│
├── tabs/                          # 📑 COMPOSANTS DE PAGES (opcional)
│   ├── OrganizerAbout.tsx       # Détails organisateur
│   ├── Booking*.tsx             # États d'une réservation
│   ├── Economy.tsx / Vip.tsx    # Catégories de ticket
│   └── ... (composants sectionnés)
│
├── scripts/                       # 🚀 SCRIPTS
│   └── reset-project.js         # Réinitialise en app-example/
│
├── app.json                       # Expo config (icon, splash, plugins)
├── babel.config.js              # Config Babel (presets)
├── tsconfig.json                # Path aliases (@/* = ./*), strict mode
├── package.json                 # Dependencies + scripts npm
├── .gitignore                   # Ignore node_modules, .expo, etc.
└── README.md                    # Starter guide
```

---

## 🧭 Système de Routing  {#routing}

### Expo Router (File-based)

Le routing est **basé sur les noms de fichiers** dans `app/`. Chaque `.tsx` est une route.

#### Routes principales

**Stack Navigation (modal/full-screen):**
```
/                    → Welcome/Splash
/login              → Écran login
/signup             → Inscription
/onboarding2-4      → Tutoriel (3 écrans)
/(tabs)             → Accueil avec onglets
/eventdetails       → Détail événement
/bookevent          → Page réservation
/paymentmethods     → Paiement
/settings*          → Paramètres (~15 routes)
/verify*            → Vérification KYC
```

**Tabs Navigation (onglets en bas, via `app/(tabs)/_layout.tsx`):**
```
Home        → app/(tabs)/index.tsx
Explore     → app/(tabs)/explore.tsx
Favourites  → app/(tabs)/favourites.tsx
Profile     → app/(tabs)/profile.tsx
Tickets     → app/(tabs)/tickets.tsx
```

### Comment ça marche

1. **Root Layout** (`app/_layout.tsx`) :
   - Charge les polices (Urbanist)
   - Enveloppe tout dans `ThemeProvider`
   - Crée un `Stack` avec toutes les routes

2. **Navigation par `useNavigation()`** :
   ```tsx
   import { useNavigation } from 'expo-router';
   const navigation = useNavigation<NavigationProp<any>>();
   navigation.navigate('login');  // → va à /login
   ```

3. **Retour** :
   ```
   navigation.goBack()
   ```

---

## 🎨 Système de Design (Thème & Couleurs)  {#design}

### ThemeProvider (Context API)

**Fichier:** `theme/ThemeProvider.tsx`

```tsx
interface ThemeContextType {
    dark: boolean;                  // light/dark mode ?
    colors: typeof lightColors;     // palette active
    setScheme: (mode) => void;      // switcher mode
}

export const useTheme = () => useContext(ThemeContext);
```

**Usage dans les composants:**
```tsx
import { useTheme } from '@/theme/ThemeProvider';

const MyComponent = () => {
    const { dark, colors } = useTheme();
    
    return (
        <Text style={{ color: dark ? colors.text : '#000' }}>
            Hello
        </Text>
    );
};
```

### Palette de couleurs

**Fichier:** `constants/theme.ts` (constant global)

Exemples principaux :
```ts
COLORS = {
    primary: '#584CF4',         // Violet principal
    secondary: '#FF6B6B',
    white: '#FFFFFF',
    black: '#000000',
    dark1: '#0B1630',          // Background dark
    dark2: '#141B2B',
    greyscale900: '#001220',
    grayscale700: '#6B7280',
    grayTie: '#99A1AD',
    gray2: '#F5F5F5',
    ... (40+ couleurs)
}

SIZES = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    padding: 16,
    ... (breakpoints)
}

FONTS = {
    // Import "Urbanist" depuis assets/fonts/
    // 18 poids différents (Thin, Light, Regular, etc.)
    // Used par fontFamily: 'bold', 'semiBold', etc.
}
```

### Comment appliquer du styling

**Option 1 : StyleSheet (recommandé)**
```tsx
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    }
})
```

**Option 2 : Inline avec thème**
```tsx
<View style={{ backgroundColor: dark ? COLORS.dark1 : COLORS.white }} />
```

---

## 🧩 Composants Réutilisables  {#composants}

### Composants clés

#### 1. **Button.tsx**
```tsx
interface ButtonProps {
    title: string;
    filled?: boolean;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

// Usage:
<Button filled title="Continue" onPress={() => {}} />
```

#### 2. **Input.tsx**
```tsx
interface InputProps {
    id: string;
    onInputChanged: (id, value) => void;
    errorText?: string | boolean;
    placeholder?: string;
    placeholderTextColor?: string;
}

// Usage:
<Input 
    id="email" 
    placeholder="john@example.com"
    onInputChanged={(id, val) => { /* update form */ }}
/>
```

#### 3. **Card.tsx** / **WholesaleCard.tsx**
Cartes pour afficher événements, utilisateurs, etc.

#### 4. **Header.tsx**
```tsx
interface HeaderProps {
    title: string;
    // Bouton retour automatique
}

// Usage:
<Header title="Event Details" />
```

#### 5. **GlobalSettingsItem.tsx** ✅ (attaché)
Switch on/off pour paramètres.

#### 6. **MapComponents.tsx** (wrapper)
- **Native** : ré-exporte `react-native-maps`
- **Web** : stub placeholder

---

### Liste complète des 40+ composants

| Catégorie | Composants |
|---|---|
| **Inputs** | Button, Input, DatePickerModal |
| **Cards** | Card, FeaturedEventCard, VerticalEventCard, HorizontalEventCard, ReviewCard |
| **Settings** | SettingsItem, GlobalSettingsItem, LanguageItem |
| **Layout** | Header, PageContainer, NotFoundCard |
| **User** | PeopleGoingCard, UserAddressItem |
| **Social** | SocialButton, SocialIcon |
| **Rating** | Rating, StarRating2, ReviewStars |
| **Utils** | DotsView, OrSeparator, AutoSlider |
| **Media** | NotificationCard, InviteFriendCard |

---

## 📄 Écrans / Pages  {#écrans}

### Groupes d'écrans

#### **Authentification** (8 écrans)
- `index.tsx` - Splash
- `welcome.tsx` - Introduction
- `login.tsx` - Connexion
- `signup.tsx` - Inscription
- `forgotpasswordmethods.tsx` - Choix récupération mot de passe
- `forgotpasswordphonenumber.tsx` - Par SMS
- `forgotpasswordemail.tsx` - Par email
- `otpverification.tsx` - Vérif OTP
- `createnewpin.tsx` - Créer PIN

#### **Vérification KYC** (8 écrans)
- `verifyyouridentity.tsx` - Début
- `proofofresidency.tsx` - Justificatif adresse
- `photoidcard.tsx` - Photo ID
- `selfiewithidcard.tsx` - Selfie + ID
- `facerecognitionwalkthrough.tsx` - Tutoriel reconnaissance faciale
- `facerecognitionscan.tsx` - Scan visage
- `reasonforusingeveno.tsx` - Raison d'utilisation
- (+ pages success/fail)

#### **Événements** (12 écrans)
- `(tabs)/index.tsx` - Accueil (feed événements)
- `(tabs)/explore.tsx` - Répertoire avec filtres + map
- `eventdetails.tsx` - Détail événement (hero, description)
- `eventdetailslocation.tsx` - Localisation sur carte
- `eventdetailsorganizer.tsx` - Infos organisateur
- `eventdetailspeoplegoing.tsx` - Liste participants
- `eventreviews.tsx` - Avis
- `bookevent.tsx` - Sélection tickets
- `bookeventdetails.tsx` - Résumé réservation
- `reviewsummary.tsx` - Confirmation avant paiement
- `ereceipt.tsx` - Reçu électronique
- `featuredevents.tsx` - Événements mis en avant

#### **Réservations & Billets** (6 écrans)
- `(tabs)/tickets.tsx` - Mes billets actuels
- `cancelbooking.tsx` - Annuler une réservation
- `cancelbookingpaymentmethods.tsx` - Remboursement
- (Statuts : Upcoming, Completed, Cancelled, Economy, VIP)

#### **Paiement & Adresses** (5 écrans)
- `paymentmethods.tsx` - Liste cartes enregistrées
- `addnewcard.tsx` - Ajouter carte
- `address.tsx` - Gestion adresses (facture)
- `addnewaddress.tsx` - Ajouter (avec MapView)
- `settingspayment.tsx` - Paramètres paiement

#### **Paramètres & Profil** (15+ écrans)
- `(tabs)/profile.tsx` - Profil utilisateur
- `editprofile.tsx` - Modifier profil
- `(tabs)/favourites.tsx` - Favoris
- `favourite.tsx` - Détail favori
- `settingshelpcenter.tsx` - Centre d'aide
- `settingsinvitefriends.tsx` - Inviter amis
- `settingslanguage.tsx` - Langue
- `settingsnotifications.tsx` - Notifications
- `settingssecurity.tsx` - Sécurité
- `settingsprivacypolicy.tsx` - Politique confidentialité
- (+ changeemail, changepassword, changepin...)

#### **Misc** (5 écrans)
- `search.tsx` - Recherche événements
- `notifications.tsx` - Centre de notifications
- `chat.tsx` - Messaging
- `gallery.tsx` - Galerie photos
- `customerservice.tsx` - Support

---

## 🛠️ Utilitaires & Données  {#utils}

### Validations (`utils/actions/formActions.ts`)

```ts
export const validateInput = (inputId: string, inputValue: string) => {
    // Valide email, phone, password, etc.
    // Retourne: true (valide) ou message d'erreur
};
```

Patterns définis :
```ts
// ValidationConstraints.ts
REGEX.EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
REGEX.PHONE = /^[0-9]{10}$/
REGEX.PASSWORD_MIN = 6  // length min
```

### Form Reducer (`utils/reducers/formReducers.ts`)

Gère l'état des formulaires (inputs + validation) :
```tsx
const [formState, dispatch] = useReducer(reducer, initialState);

dispatch({
    inputId: 'email',
    validationResult: true,
    inputValue: 'test@example.com'
});
```

### Map Data (`data/mapData.ts`)

```ts
export const mapStandardStyle = [
    { elementType: 'geometry', stylers: [...] },
    // Style clair pour Google Maps
];

export const mapDarkStyle = [
    // Style sombre
];

export const markers = [
    { latitude: 48.8566, longitude: 2.3522, title: 'Paris' },
    // Marqueurs événements
];
```

### Image Picker (`utils/ImagePickerHelper.ts`)

Wrapper autour `expo-image-picker` pour sélectionner/prendre photos.

---

## 📦 Dépendances Critiques  {#dépendances}

### FIXES APPLIQUÉES (29 avril 2026)

| Dépendance | Ancien | Nouveau | Problème corrigé |
|---|---|---|---|
| `react-native-worklets` | 0.8.1 ❌ | 0.7.4 ✅ | Incompatibilité v4 reanimated |
| `react-native-maps` | Direct ❌ | Via shim ✅ | Bundling web cassé |

### Principales dépendances

```json
{
  "expo": "~54.0.31",
  "expo-router": "~6.0.21",
  "react-native": "0.81.5",
  
  "react-native-maps": "1.20.1",          // Maps (JS bridge native)
  "react-native-reanimated": "~4.1.1",   // Animations natives
  "react-native-gifted-chat": "^2.4.0",  // Chat UI
  "react-native-picker-select": "^9.3.1", // Dropdown
  "react-native-gesture-handler": "~2.28.0",
  "react-native-tab-view": "^4.1.1",    // Tab manager
  
  "expo-font": "~14.0.8",                // Font loading
  "expo-image-picker": "~17.0.10",       // Photos
  "expo-local-authentication": "~17.0.8", // Biometric
  
  "validate.js": "^0.13.1"               // Validation lib
}
```

### À connaître

- **react-native-reanimated** v4.1.6 ← dépend de `react-native-worklets@0.7.x` ⚠️
- **expo-font** est critiqué pour charger toutes les polices (18 poids Urbanist)
- **react-native-maps** n'est pas supporté sur web → shim `MapComponents.web.tsx`
- **expo-local-authentication** ne supporte que Face/Fingerprint (pas PIN sur Android)

---

## 🎯 Guide de Personnalisation  {#personnalisation}

### 1. **Changer les couleurs primaires**

**Fichier:** `constants/theme.ts`

```ts
COLORS = {
    primary: '#584CF4',  // ← Violet → Changez en '#FF6B6B' (rouge)
    secondary: '#FF6B6B',
    // ...
}
```

**Impact:** Tous les boutons, textes, accents utilisant `COLORS.primary` changeront.

### 2. **Ajouter une nouvelle page**

1. Créer `app/mynewpage.tsx`:
   ```tsx
   import { View, Text } from 'react-native';
   
   export default function MyNewPage() {
       return (
           <View>
               <Text>My new page</Text>
           </View>
       );
   }
   ```

2. Navigation :
   ```tsx
   navigation.navigate('mynewpage');
   ```

### 3. **Ajouter un nouvel onglet au bas**

**Fichier:** `app/(tabs)/_layout.tsx`

1. Créer `app/(tabs)/mynewTab.tsx`
2. Ajouter dans `BottomTabNavigator` :
   ```tsx
   <BottomTab.Screen
       name="mynewTab"
       component={MyNewTabScreen}
       options={{
           tabBarIcon: ({ color }) => <MyIcon color={color} />,
       }}
   />
   ```

### 4. **Modifier un composant réutilisable**

Exemple : Agrandir les boutons

**`components/Button.tsx`**
```tsx
// Avant :
height: 48,

// Après :
height: 56,  // Plus grand
```

Tous les appels `<Button />` hériteront du changement.

### 5. **Brancher une API**

**Pattern:** Utiliser `fetch()` ou `axios` dans les hooks

```tsx
import { useEffect, useState } from 'react';

const MyScreen = () => {
    const [events, setEvents] = useState([]);
    
    useEffect(() => {
        fetch('https://api.example.com/events')
            .then(r => r.json())
            .then(data => setEvents(data))
            .catch(e => console.error(e));
    }, []);
    
    return (
        // Render events
    );
};
```

### 6. **Ajouter/modifier des assets**

**Icônes :** `assets/icons/` (PNG)  
→ Mettre à jour `constants/icons.ts`

**Polices :** `assets/fonts/` (TTF)  
→ Mettre à jour `constants/fonts.ts`  
→ Auto-chargées via `expo-font`

**Images :** `assets/images/`  
→ Importer directement ou via `constants/images.ts`

### 7. **Dark mode / Light mode**

Déjà intégré via `ThemeProvider` :

```tsx
const { dark, colors } = useTheme();

<View style={{ backgroundColor: dark ? colors.background : '#fff' }} />
```

---

## 🚀 Process de Déploiement  {#déploiement}

### Pour tester localement

```bash
cd EvenoPro
npm install --legacy-peer-deps
npx expo start -c

# Puis :
# - Scannez le QR avec Expo Go (iOS/Android)
# - Ou appuyez 'a' pour émulateur Android
# - Ou appuyez 'i' pour simulateur iOS (macOS seulement)
```

### Build pour production

#### **Android APK/AAB**
```bash
npx expo build:android --release-channel production
# Attend ~30 min, télécharge dans Expo.dev
```

#### **iOS (macOS seulement)**
```bash
npx expo build:ios --release-channel production
# Construit .ipa, peut uploader à TestFlight
```

#### **Web**
```bash
npx expo export:web
# Génère dist/ → prêt pour Netlify/Vercel
```

### Deploy via EAS (Expo Application Services)

```bash
eas build --platform all
eas submit  # Upload stores
```

---

## 📝 Checklist de Personnalisation pour MultiPlanner

- [ ] **Branding**
  - [ ] Changer logo (`assets/images/logo.png`)
  - [ ] Changer couleur primaire (`COLORS.primary`)
  - [ ] Changer polices (Urbanist → autre)

- [ ] **Écrans**
  - [ ] Modifier `/` (splash)
  - [ ] Modifier onboarding
  - [ ] Supprimer écrans inutiles (KYC, etc.)

- [ ] **Flux métier**
  - [ ] Connecter API événements (fetch→`(tabs)/explore.tsx`)
  - [ ] Connecter paiement (Stripe? PayPal?)
  - [ ] Authentification (backend?)

- [ ] **Navigation**
  - [ ] Renom `app/(tabs)/explore` → `app/(tabs)/findEvents` (optionnel)
  - [ ] Ajouter onglet custom si besoin

- [ ] **Assets**
  - [ ] Remplacer toutes les images d'événements
  - [ ] Adapter couleur theme (light/dark)

---

## 🔗 Ressources

- **Expo Docs:** https://docs.expo.dev
- **React Native Docs:** https://reactnative.dev
- **Expo Router:** https://docs.expo.dev/router/introduction/
- **Publishing Guide:** https://docs.expo.dev/distribution/publishing/

---

## ✅ Résumé

**EvenoPro est** :
- ✅ Production-ready
- ✅ Entièrement typé (TypeScript)
- ✅ Thème light/dark intégré
- ✅ 60+ écrans préfabriqués
- ✅ 40+ composants réutilisables
- ✅ Système de validation formulaires
- ✅ Support maps natives

**À personnaliser pour MultiPlanner** :
- Logo & couleurs
- Flux authentification
- Intégration API
- Suppression écrans KYC/verification
- Connexion paiement

---

**Dernier commit:** `633a1cc` (29 avril 2026)  
**Repository:** https://github.com/Jauresk/multiplanner-spa-mobile

