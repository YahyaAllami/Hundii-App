# Hundii - German Dog Training App Development Plan

## Project Overview
Build a German version of Woofz (dog training app) using Expo/React Native with:
- **Design**: Figma for UI (not started yet)
- **Payments**: RevenueCat for subscriptions
- **Animations**: Jitter for animations
- **Backend**: Supabase for cloud sync & user accounts
- **Framework**: Expo (already set up with React Native 0.81, Expo 54)

**MVP Scope**: Onboarding flow + Basic training lessons

---

## Current State
Your Expo project already has:
- Expo Router with file-based navigation
- Tab navigation structure
- Light/dark theme support
- React Native Reanimated for animations
- TypeScript strict mode
- EAS Build configured for deployment

---

## YOUR ACTION PLAN (Start Here!)

### Week 1-2: Design & Setup (Before Any Coding)

#### Step 1: Create Figma Designs
Design these screens first:
1. **Welcome/Splash** - App intro with "Get Started" button
2. **Dog Setup Flow** (3-4 screens):
   - Dog name input
   - Breed selection
   - Age/birthday
   - Photo upload (optional)
3. **Home Dashboard** - Overview with training progress
4. **Training List** - Available training lessons
5. **Training Lesson** - Video/instructions view

**Tip**: Download the Woofz app and screenshot it for reference/inspiration.

#### Step 2: Set Up Developer Accounts
1. **Apple Developer Program** ($99/year)
   - Go to developer.apple.com
   - Required for iOS TestFlight & App Store
2. **Google Play Console** ($25 one-time)
   - Go to play.google.com/console
   - Required for Android testing & Play Store

#### Step 3: Set Up Backend (Supabase)
1. Create account at supabase.com (free tier available)
2. Create new project "Hundii"
3. Set up tables:
   - `users` (id, email, created_at)
   - `dogs` (id, user_id, name, breed, age, photo_url)
   - `progress` (id, user_id, lesson_id, completed_at)

#### Step 4: Set Up RevenueCat
1. Create account at revenuecat.com
2. Create new project
3. Note: Full setup requires developer accounts from Step 2

---

### Week 3-4: Build Onboarding (MVP Part 1)

#### What to Build:
```
app/
├── (auth)/                    # Onboarding flow
│   ├── _layout.tsx            # Auth layout (no tabs)
│   ├── welcome.tsx            # Welcome screen
│   ├── dog-name.tsx           # Enter dog name
│   ├── dog-breed.tsx          # Select breed
│   ├── dog-age.tsx            # Enter age
│   └── dog-photo.tsx          # Optional photo
```

#### Implementation Steps:
1. Create `(auth)` route group
2. Build each screen following your Figma designs
3. Connect to Supabase for user auth + dog storage
4. Add navigation guard (redirect to onboarding if no dog set up)

---

### Week 5-6: Build Training (MVP Part 2)

#### What to Build:
- Home dashboard with training overview
- Training lesson list
- Individual lesson view (video + instructions)
- Mark lessons as complete

---

## Recommended Development Roadmap (Full Detail)

### Phase 1: Design in Figma

#### MVP Screens to Design:
- **Onboarding**: Welcome, dog setup (4 screens)
- **Main App**: Home, training list, lesson view
- **Total**: ~8-10 screens for MVP

#### Design Tips:
1. Use 375px width (iPhone standard)
2. Create a component library (buttons, inputs, cards)
3. Define your color palette and export to code
4. Export icons as SVG, images as PNG @2x and @3x

---

### Phase 2: Project Structure Setup

#### 2.1 Recommended Folder Structure
```
app/
├── (auth)/                    # Authentication/onboarding flow
│   ├── _layout.tsx
│   ├── welcome.tsx            # Welcome screen
│   ├── dog-setup.tsx          # Dog profile creation
│   └── paywall.tsx            # Subscription screen
├── (tabs)/                    # Main app tabs
│   ├── _layout.tsx
│   ├── index.tsx              # Home/Dashboard
│   ├── training.tsx           # Training programs
│   ├── progress.tsx           # Progress tracking
│   └── profile.tsx            # Settings/Profile
├── training/
│   └── [id].tsx               # Individual training lesson
├── _layout.tsx                # Root layout
└── +not-found.tsx

components/
├── ui/                        # Base UI components
├── onboarding/                # Onboarding-specific components
├── training/                  # Training cards, video players
└── common/                    # Shared components

lib/
├── supabase.ts                # Supabase client setup
├── revenuecat.ts              # RevenueCat setup
└── api.ts                     # API calls

stores/                        # State management (Zustand recommended)
├── user-store.ts
├── dog-store.ts
└── subscription-store.ts
```

---

### Phase 3: Core Dependencies to Install

```bash
# Backend & Auth (Supabase)
npx expo install @supabase/supabase-js
npx expo install expo-secure-store  # For token storage

# Payments
npm install react-native-purchases

# State Management
npm install zustand

# Notifications (for reminders - add later)
npx expo install expo-notifications

# Media (for training videos)
npx expo install expo-av expo-video

# Forms (for onboarding)
npm install react-hook-form zod @hookform/resolvers

# Image picker (for dog photo)
npx expo install expo-image-picker

# Animations (you already have reanimated, Jitter exports to Lottie)
npx expo install lottie-react-native
```

---

### Phase 4: Implementation Order

#### Step 1: Onboarding Flow
1. Create `(auth)` route group
2. Build welcome/splash screen
3. Dog profile setup screens (multi-step form)
4. Store dog data in Supabase
5. Navigation guard to check if onboarding completed

#### Step 2: Main App Structure
1. Restructure tabs for your app (Home, Training, Progress, Profile)
2. Create placeholder screens
3. Implement bottom tab navigation with your design

#### Step 3: RevenueCat Integration
1. Create RevenueCat account at revenuecat.com
2. Set up products in App Store Connect / Google Play Console
3. Configure RevenueCat with your app credentials
4. Implement paywall screen
5. Gate premium features based on subscription status

#### Step 4: Training Content
1. Design training program data structure
2. Create training lesson screens
3. Implement video playback for lessons
4. Track lesson completion

#### Step 5: Progress & Gamification
1. Build progress tracking system
2. Implement streaks and achievements
3. Create progress visualization (charts, badges)

#### Step 6: Jitter Animations
1. Create animations in Jitter
2. Export as Lottie JSON files
3. Place in `assets/animations/`
4. Use `lottie-react-native` to display

---

### Phase 5: Supabase Setup (Cloud Sync)

#### Database Schema:
```sql
-- Users table (auto-created by Supabase Auth)

-- Dogs table
create table dogs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  breed text,
  birth_date date,
  photo_url text,
  created_at timestamp with time zone default now()
);

-- Training progress
create table training_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  lesson_id text not null,
  completed_at timestamp with time zone default now()
);

-- Row Level Security (RLS) - Important!
alter table dogs enable row level security;
alter table training_progress enable row level security;

-- Users can only access their own data
create policy "Users can view own dogs" on dogs
  for select using (auth.uid() = user_id);

create policy "Users can insert own dogs" on dogs
  for insert with check (auth.uid() = user_id);

create policy "Users can update own dogs" on dogs
  for update using (auth.uid() = user_id);

create policy "Users can view own progress" on training_progress
  for select using (auth.uid() = user_id);

create policy "Users can insert own progress" on training_progress
  for insert with check (auth.uid() = user_id);
```

#### Supabase Client Setup:
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: {
      getItem: (key) => SecureStore.getItemAsync(key),
      setItem: (key, value) => SecureStore.setItemAsync(key, value),
      removeItem: (key) => SecureStore.deleteItemAsync(key),
    },
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

---

### Phase 6: RevenueCat Setup Details

```typescript
// lib/revenuecat.ts
import Purchases from 'react-native-purchases';
import { Platform } from 'react-native';

const REVENUECAT_API_KEY_IOS = 'your_ios_key';
const REVENUECAT_API_KEY_ANDROID = 'your_android_key';

export async function initRevenueCat(userId?: string) {
  await Purchases.configure({
    apiKey: Platform.OS === 'ios'
      ? REVENUECAT_API_KEY_IOS
      : REVENUECAT_API_KEY_ANDROID,
    appUserID: userId, // Link to Supabase user
  });
}

export async function checkSubscription() {
  const customerInfo = await Purchases.getCustomerInfo();
  return customerInfo.entitlements.active['premium'] !== undefined;
}

export async function getOfferings() {
  const offerings = await Purchases.getOfferings();
  return offerings.current;
}

export async function purchasePackage(pkg: any) {
  const { customerInfo } = await Purchases.purchasePackage(pkg);
  return customerInfo.entitlements.active['premium'] !== undefined;
}
```

---

### Phase 7: Jitter Animation Integration

Jitter exports to Lottie format:
1. Create animation in Jitter
2. Export as Lottie JSON
3. Use in React Native:

```typescript
import LottieView from 'lottie-react-native';

// Simple usage
<LottieView
  source={require('@/assets/animations/success.json')}
  autoPlay
  loop={false}
  style={{ width: 200, height: 200 }}
/>

// With control
const animationRef = useRef<LottieView>(null);

<LottieView
  ref={animationRef}
  source={require('@/assets/animations/dog-walking.json')}
  autoPlay={false}
  loop
  style={{ width: 200, height: 200 }}
/>

// Play on demand
animationRef.current?.play();
```

---

## YOUR IMMEDIATE NEXT STEPS (This Week)

### 1. Start Figma Designs
- Download Woofz app for inspiration
- Design welcome screen + dog setup flow (4-5 screens)
- Keep it simple for MVP

### 2. Create Developer Accounts
- Apple Developer: developer.apple.com ($99/year)
- Google Play Console: play.google.com/console ($25 one-time)

### 3. Create Supabase Project
- Sign up at supabase.com (free tier)
- Create project "Hundii"
- Set up auth and database tables

### 4. Create RevenueCat Account
- Sign up at revenuecat.com
- Create project (full setup after developer accounts ready)

---

## Important Notes

- **RevenueCat requires a development build** - won't work in Expo Go
- **Test on real devices** - Create development builds with `npx eas build --profile development`
- **German localization** - Add i18n later with `expo-localization` + `i18next`
- **Start simple** - Get onboarding working first, then add training features

---

## Summary

**MVP Scope**: Onboarding (dog setup) + Basic training lessons with cloud sync

**Tech Stack**:
- Frontend: Expo + React Native (already set up)
- Backend: Supabase (auth + database)
- Payments: RevenueCat
- Animations: Jitter → Lottie

**Development Timeline**:
1. Design in Figma (do this first!)
2. Set up accounts (developer + Supabase + RevenueCat)
3. Build onboarding flow
4. Build training features
5. Add payments
6. Launch beta
