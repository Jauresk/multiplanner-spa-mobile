# 🔬 GUIDE TECHNIQUE DÉTAILLÉ - EvenoPro
**Code Examples & Architecture Deep Dive**

---

## 📚 TABLE DES MATIÈRES

1. [Exemple complet d'écran](#exemple-écran)
2. [Composant réutilisable](#exemple-composant)
3. [Système de routing avancé](#routing-avancé)
4. [Gestion d'état (Hooks)](#state-management)
5. [Validation de formulaires](#validation)
6. [Intégration API](#intégration-api)
7. [Personnalisation du thème](#theme-personnalisé)
8. [Bonnes pratiques](#bonnes-pratiques)

---

## 🖥️ Exemple Complet d'Écran  {#exemple-écran}

Prenons l'écran `app/(tabs)/explore.tsx` (événements à découvrir) :

### Structure générale

```tsx
// imports
import { View, Text, StyleSheet, ScrollView, ... } from 'react-native';
import { useNavigation } from 'expo-router';
import { useTheme } from '@/theme/ThemeProvider';
import { COLORS, SIZES, FONTS } from '@/constants';
import MapView, { Marker } from '@/components/MapComponents';

export default function ExploreScreen() {
    // ============ HOOKS ============
    const navigation = useNavigation();
    const { dark, colors } = useTheme();
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    
    // ============ EFFECT ============
    useEffect(() => {
        // Charger depuis API ou données statiques
        fetchEvents();
    }, [searchQuery]);
    
    // ============ EVENT HANDLERS ============
    const handleEventPress = (eventId) => {
        navigation.navigate('eventdetails', { eventId });
    };
    
    const handleFilter = (category) => {
        // Filtrer événements par catégorie
    };
    
    // ============ RENDER ============
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            {/* HEADER */}
            <View style={styles.header}>
                <Header title="Explore Events" />
                <SearchBar 
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                />
            </View>
            
            {/* FILTERS */}
            <ScrollView horizontal style={styles.filters}>
                {CATEGORIES.map(cat => (
                    <TouchableOpacity 
                        key={cat.id}
                        onPress={() => handleFilter(cat.id)}
                    >
                        <Text style={styles.filterTag}>{cat.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            
            {/* MAP */}
            <MapView 
                style={styles.map}
                initialRegion={DEFAULT_REGION}
            >
                {filteredEvents.map(event => (
                    <Marker
                        key={event.id}
                        coordinate={{
                            latitude: event.latitude,
                            longitude: event.longitude,
                        }}
                        onPress={() => handleEventPress(event.id)}
                    />
                ))}
            </MapView>
            
            {/* EVENT LIST */}
            <FlatList
                data={filteredEvents}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <HorizontalEventCard
                        event={item}
                        onPress={() => handleEventPress(item.id)}
                    />
                )}
            />
        </SafeAreaView>
    );
}

// ============ STYLES ============
const styles = StyleSheet.create({
    header: {
        paddingHorizontal: SIZES.padding,
        paddingVertical: 12,
    },
    filters: {
        paddingHorizontal: SIZES.padding,
        marginVertical: 12,
    },
    filterTag: {
        ...FONTS.body4,
        marginRight: 12,
    },
    map: {
        height: 300,
        borderRadius: 12,
    },
});
```

### Points clés

1. **Hooks**
   - `useNavigation()` → navigation
   - `useTheme()` → dark mode
   - `useState()` → état local
   - `useEffect()` → lifecycle

2. **Types** : Tous les arguments/returns sont typés (même si non explicite ici)

3. **Réutilisation** :
   - `Header` - composant
   - `HorizontalEventCard` - composant
   - `COLORS, SIZES, FONTS` - constants
   - `MapView` - shim cross-platform

---

## 🧩 Créer un Composant Réutilisable  {#exemple-composant}

### Exemple : Composant EventRatingCard

**Fichier:** `components/EventRatingCard.tsx`

```tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants';
import { useTheme } from '../theme/ThemeProvider';
import StarRating2 from './StarRating2';

// ============ INTERFACE ============
interface EventRatingCardProps {
    eventId: string;
    eventName: string;
    userAvatarUrl: string;
    userName: string;
    rating: number;        // 1-5
    comment: string;
    createdAt: string;
    onPress?: () => void;
}

// ============ COMPOSANT ============
const EventRatingCard: React.FC<EventRatingCardProps> = ({
    eventId,
    eventName,
    userAvatarUrl,
    userName,
    rating,
    comment,
    createdAt,
    onPress,
}) => {
    const { dark, colors } = useTheme();
    
    return (
        <TouchableOpacity 
            style={[
                styles.container,
                { 
                    backgroundColor: dark ? COLORS.dark1 : COLORS.white,
                    borderColor: dark ? COLORS.dark2 : COLORS.gray2
                }
            ]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {/* AVATAR + NOM */}
            <View style={styles.header}>
                <Image
                    source={{ uri: userAvatarUrl }}
                    style={styles.avatar}
                />
                <View style={styles.userInfo}>
                    <Text style={[styles.userName, { color: colors.text }]}>
                        {userName}
                    </Text>
                    <Text style={[styles.eventName, { color: COLORS.grayscale700 }]}>
                        {eventName}
                    </Text>
                </View>
                {/* DATE À DROITE */}
                <Text style={[styles.date, { color: COLORS.grayscale700 }]}>
                    {formatDate(createdAt)}
                </Text>
            </View>
            
            {/* RATING */}
            <View style={styles.ratingContainer}>
                <StarRating2 
                    rating={rating}
                    size={16}
                    readonly
                />
                <Text style={[styles.ratingText, { color: COLORS.primary }]}>
                    {rating.toFixed(1)}
                </Text>
            </View>
            
            {/* COMMENT */}
            <Text 
                style={[styles.comment, { color: colors.text }]}
                numberOfLines={3}
            >
                {comment}
            </Text>
        </TouchableOpacity>
    );
};

// ============ STYLES ============
const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    userInfo: {
        flex: 1,
        marginLeft: 12,
    },
    userName: {
        fontSize: 14,
        fontFamily: 'semiBold',
    },
    eventName: {
        fontSize: 12,
        fontFamily: 'regular',
        marginTop: 2,
    },
    date: {
        fontSize: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    ratingText: {
        marginLeft: 6,
        fontFamily: 'semiBold',
        fontSize: 12,
    },
    comment: {
        fontSize: 13,
        fontFamily: 'regular',
        lineHeight: 18,
    },
});

export default EventRatingCard;
```

### Usage

```tsx
<EventRatingCard
    eventId="evt_123"
    eventName="Jazz Night 2026"
    userAvatarUrl="https://..."
    userName="Alice Johnson"
    rating={4.5}
    comment="Amazing performance! The venue was perfect and the sound quality was incredible."
    createdAt="2026-04-29"
    onPress={() => navigation.navigate('profile', { userId: 'alice' })}
/>
```

### Bonnes pratiques appliquées

✅ Interface TypeScript stricte  
✅ Theme-aware (dark mode)  
✅ Tous props sont optionnels sauf les essentiels  
✅ Composant autonome (pas de logique métier)  
✅ StyleSheet séparé pour performance  
✅ Utilise des constantes (`COLORS, SIZES, FONTS`)  

---

## 🧭 Routing Avancé  {#routing-avancé}

### Navigation avec paramètres

```tsx
// Au départ
import { useNavigation } from 'expo-router';

const HomeScreen = () => {
    const navigation = useNavigation();
    
    const handleEventClick = (eventId: string) => {
        // Naviguer avec params
        navigation.navigate('eventdetails', {
            eventId,
            from: 'home',
        });
    };
};
```

### Au destinataire

```tsx
// eventdetails.tsx
import { useRoute } from '@react-navigation/native';

export default function EventDetailsScreen() {
    const route = useRoute();
    const { eventId, from } = route.params;
    
    useEffect(() => {
        console.log(`Event ID: ${eventId}, From: ${from}`);
        fetchEventData(eventId);
    }, [eventId]);
    
    return (
        // Render
    );
}
```

### Navigation imbriquée (Tabs + Stack)

```
app/(tabs)/_layout.tsx
├── BottomTabNavigator
│   ├── index (Home)
│   ├── explore (Explore)
│   ├── favourites (Favourites)
│   ├── profile (Profile)
│   └── tickets (Tickets)
└── Chaque onglet peut déclencher des Stacks modales

// Exemples :
navigation.navigate('(tabs)', { screen: 'explore' }); // Tab
navigation.navigate('eventdetails');  // Modal sur current Stack
```

---

## 🎯 Gestion d'État (Hooks)  {#state-management}

### Pattern 1 : useState + useEffect

**Écran simple avec données locales**

```tsx
export default function MyScreen() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        fetchEvents();
    }, []); // Une fois au mount
    
    const fetchEvents = async () => {
        try {
            setLoading(true);
            const data = await fetch('...');
            setEvents(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    if (loading) return <ActivityIndicator />;
    if (error) return <ErrorScreen msg={error} />;
    
    return <FlatList data={events} />;
}
```

### Pattern 2 : useReducer (Formulaires complexes)

**Fichier:** `utils/reducers/formReducers.ts`

```tsx
export interface FormState {
    inputValues: Record<string, string>;
    inputValidities: Record<string, boolean>;
    formIsValid: boolean;
}

export const reducer = (state: FormState, action: any) => {
    const updatedValidities = {
        ...state.inputValidities,
        [action.inputId]: action.validationResult,
    };
    
    const updatedValues = {
        ...state.inputValues,
        [action.inputId]: action.inputValue,
    };
    
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
        if (!updatedValidities[key]) {
            updatedFormIsValid = false;
            break;
        }
    }
    
    return {
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues,
    };
};
```

**Usage:** (voir `addnewaddress.tsx`)

```tsx
const [formState, dispatch] = useReducer(reducer, initialState);

const handleInputChange = (inputId: string, value: string) => {
    const result = validateInput(inputId, value);
    dispatch({
        inputId,
        inputValue: value,
        validationResult: result,
    });
};
```

### Pattern 3 : Context (État global)

Déjà fait → `ThemeProvider`

Pour MultiPlanner (suggestions) :

```tsx
// context/AuthContext.ts
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email, password) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    
    const login = async (email: string, password: string) => {
        const user = await api.login(email, password);
        setUser(user);
    };
    
    const logout = () => setUser(null);
    
    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth outside provider');
    return ctx;
};
```

---

## ✅ Validation de Formulaires  {#validation}

### Template de validation

**Fichier:** `utils/actions/formActions.ts`

```tsx
export const validateInput = (inputId: string, inputValue: string): boolean | string => {
    if (inputId === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(inputValue) ? true : 'Invalid email address';
    }
    
    if (inputId === 'password') {
        return inputValue.length >= 6 
            ? true 
            : 'Password must be at least 6 characters';
    }
    
    if (inputId === 'phone') {
        const phoneRegex = /^[0-9]{10,15}$/;
        return phoneRegex.test(inputValue) ? true : '10-15 digits required';
    }
    
    return true; // Default: valid
};
```

### Utilisation dans formulaire

```tsx
const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    
    const handleEmailChange = (value: string) => {
        setEmail(value);
        const result = validateInput('email', value);
        setError(typeof result === 'string' ? result : '');
    };
    
    return (
        <>
            <Input
                id="email"
                placeholder="john@example.com"
                value={email}
                onInputChanged={handleEmailChange}
                errorText={error}
            />
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
        </>
    );
};
```

---

## 🔌 Intégration API  {#intégration-api}

### Pattern base

```tsx
// utils/api.ts
const BASE_URL = 'https://api.example.com';

export const api = {
    // GET
    getEvents: async () => {
        const response = await fetch(`${BASE_URL}/events`);
        if (!response.ok) throw new Error('Failed to fetch');
        return response.json();
    },
    
    // GET by ID
    getEventById: async (eventId: string) => {
        const response = await fetch(`${BASE_URL}/events/${eventId}`);
        return response.json();
    },
    
    // POST
    bookEvent: async (eventId: string, ticketCount: number) => {
        const response = await fetch(`${BASE_URL}/bookings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventId, ticketCount }),
        });
        return response.json();
    },
    
    // PUT
    updateProfile: async (userId: string, data: Partial<User>) => {
        const response = await fetch(`${BASE_URL}/users/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response.json();
    },
};
```

### Usage dans écran

```tsx
export default function EventsScreen() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        loadEvents();
    }, []);
    
    const loadEvents = async () => {
        try {
            setLoading(true);
            const data = await api.getEvents();
            setEvents(data);
        } catch (error) {
            console.error('Failed to load events:', error);
            Alert.alert('Error', 'Could not load events');
        } finally {
            setLoading(false);
        }
    };
    
    return loading 
        ? <ActivityIndicator />
        : <FlatList data={events} renderItem={...} />;
}
```

### Avec tokens / Authentification

```tsx
let authToken: string | null = null;

export const setAuthToken = (token: string) => {
    authToken = token;
};

const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    const headers = {
        'Content-Type': 'application/json',
        ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
        ...options.headers,
    };
    
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });
    
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.json();
};

export const api = {
    login: async (email: string, password: string) => {
        const data = await apiCall('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        setAuthToken(data.token);
        return data;
    },
};
```

---

## 🎨 Thème Personnalisé  {#theme-personnalisé}

### Créer des palettes supplémentaires

**Fichier:** `theme/colors.ts`

```tsx
// Nouveau : mode "dark-blue"
export const blueDarkColors = {
    primary: '#1E3A8A',      // Bleu foncé
    secondary: '#3B82F6',    // Bleu clair
    text: '#F0F9FF',
    background: '#0F172A',
    accent: '#06B6D4',       // Cyan
};

// Dans ThemeProvider.tsx, étendre :
export const useTheme = () => {
    const [scheme, setScheme] = useState<'light' | 'dark' | 'blue-dark'>('light');
    
    const getColors = () => {
        switch (scheme) {
            case 'dark': return darkColors;
            case 'blue-dark': return blueDarkColors;
            default: return lightColors;
        }
    };
    
    return { colors: getColors(), setScheme };
};
```

### Personnalisation globale

**Exemple:** Changer toutes les polices

```tsx
// constants/fonts.ts
import * as Font from 'expo-font';

// Avant : famille 'Urbanist'
// Après : famille 'Inter'
export const FONTS = {
    thin: 'Inter_100Thin',
    extralight: 'Inter_200ExtraLight',
    light: 'Inter_300Light',
    // ...
};

// Dans app/_layout.tsx
const [loaded] = useFonts({
    ...FONTS,
    // Charger les .ttf
});
```

---

## 📖 Bonnes Pratiques  {#bonnes-pratiques}

### ✅ À faire

1. **Typer explicitement** (TypeScript)
   ```tsx
   interface Props { id: string; name: string; }
   const Component: React.FC<Props> = ({ id, name }) => {}
   ```

2. **Réutiliser composants**
   ```tsx
   <Button title="Click" onPress={() => {}} />  // ✅ Générique
   <SpecialBlueButton />  // ❌ Trop spécifique
   ```

3. **Séparer conteneurs & présentation**
   ```tsx
   // Container
   const EventListContainer = () => {
       const [events, setEvents] = useState([]);
       return <EventListView events={events} />;
   };
   
   // Presentational
   const EventListView: React.FC<{ events: Event[] }> = ({ events }) => (
       <FlatList data={events} />
   );
   ```

4. **Utiliser Constants**
   ```tsx
   <Text style={{ color: COLORS.primary }}>  // ✅
   <Text style={{ color: '#584CF4' }}>        // ❌
   ```

### ❌ À éviter

1. **Prop drilling profond**
   ```tsx
   // ❌ Mauvais
   <A data={x}><B data={x}><C data={x} /></B></A>
   
   // ✅ Bon
   <A><Provider value={x}><C /></Provider></A>
   ```

2. **Logique métier dans composants
   ```tsx
   // ❌ Mauvais
   export default function EventCard() {
       const [data, setData] = useState(null);
       // 200 lignes de logique...
   }
   
   // ✅ Bon
   export default function EventCard({ event }) {
       // 20 lignes de render
   }
   ```

3. **Style en dur**
   ```tsx
   // ❌
   <View style={{ width: 355, height: 48, ...}} />
   
   // ✅
   <View style={styles.container} />
   ```

4. **Imports profonds**
   ```tsx
   // ❌
   import Table from '../../../components/tables/Table';
   
   // ✅ (via tsconfig pathAlias)
   import { Table } from '@/components';
   ```

---

## 🧪 Exemple Complet : Écran Booking

**Fichier:** `app/newbooking.tsx` (pour MultiPlanner)

```tsx
import React, { useState, useReducer } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from '@/theme/ThemeProvider';
import { COLORS, SIZES, FONTS, icons } from '@/constants';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { api } from '@/utils/api';
import { validateInput } from '@/utils/actions/formActions';
import { reducer, FormState } from '@/utils/reducers/formReducers';

const initialState: FormState = {
    inputValues: { quantity: '1', notes: '' },
    inputValidities: { quantity: true, notes: true },
    formIsValid: true,
};

export default function BookingScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const { dark, colors } = useTheme();
    const [formState, dispatchForm] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(false);
    const { eventId } = route.params;
    
    const handleInputChange = (inputId: string, value: string) => {
        const result = validateInput(inputId, value);
        dispatchForm({
            inputId,
            inputValue: value,
            validationResult: result,
        });
    };
    
    const handleBooking = async () => {
        if (!formState.formIsValid) {
            Alert.alert('Invalid Form', 'Please fill all required fields');
            return;
        }
        
        try {
            setLoading(true);
            const booking = await api.bookEvent(
                eventId,
                parseInt(formState.inputValues.quantity)
            );
            
            Alert.alert('Success', 'Event booked!', [
                { text: 'View Ticket', onPress: () => navigation.navigate('tickets') }
            ]);
        } catch (error) {
            Alert.alert('Booking Failed', error.message);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <ScrollView 
            style={{ 
                flex: 1, 
                backgroundColor: colors.background 
            }}
        >
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Text style={[styles.title, { color: colors.text }]}>
                    Complete Your Booking
                </Text>
                
                <Input
                    id="quantity"
                    placeholder="Ticket Quantity"
                    onInputChanged={handleInputChange}
                    errorText={formState.inputValidities.quantity}
                />
                
                <Input
                    id="notes"
                    placeholder="Special Requests (optional)"
                    onInputChanged={handleInputChange}
                    errorText={formState.inputValidities.notes}
                    multiline
                />
                
                <Button
                    title={loading ? 'Booking...' : 'Confirm Booking'}
                    filled
                    onPress={handleBooking}
                    disabled={loading}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: SIZES.padding,
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontFamily: 'bold',
        marginBottom: 20,
    },
});
```

---

## 📦 Checklist Pour Ajouter Une Feature

- [ ] Créer fichier écran (`app/newfeature.tsx`)
- [ ] Créer composants si besoin (`components/NewFeatureCard.tsx`)
- [ ] Ajouter validation si formulaire
- [ ] Ajouter au `app/_layout.tsx` si Stack
- [ ] Tester dark mode
- [ ] Tester sur émulateur/Expo Go
- [ ] Git commit (`git add . && git commit -m "feat: add new feature"`)

---

**Prêt à personnaliser EvenoPro pour MultiPlanner ! 🚀**

