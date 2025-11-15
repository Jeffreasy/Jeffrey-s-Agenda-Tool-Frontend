# Agenda Automator Frontend Documentatie

Deze documentatie beschrijft de frontend van de Agenda Automator applicatie. De frontend is gebouwd met React en Vite als build tool, en integreert met de backend API voor functies zoals authenticatie, accountbeheer en automatisatieregels. Het doel is een gebruiksvriendelijke interface te bieden voor het beheren van Google Calendar automatisaties, met features zoals kalenderweergave, regelcreatie en dashboardoverzichten.

De applicatie is responsive, themable (light/dark mode) en maakt gebruik van moderne React patronen voor state management, data fetching en form handling. Deze documentatie is grondig gestructureerd om ontwikkelaars te helpen bij installatie, ontwikkeling, architectuur en troubleshooting.

## 1. Inleiding

### Overzicht
De frontend is een single-page application (SPA) die communiceert met de backend via REST API endpoints (bijv. `/api/v1/auth/google/login`, `/api/v1/accounts`). Key features:
- **Authenticatie**: OAuth2 met Google voor login en calendar toegang.
- **Dashboard**: Overzicht van verbonden accounts en automatisatieregels.
- **Kalender Integratie**: Weergave en manipulatie van Google Calendar events met FullCalendar.
- **Regel Creatie**: Formulieren voor het definiëren van triggers en acties (bijv. reminders voor shifts).
- **Theming en UI**: Dark/light mode met Next Themes, icons van Lucide, en componenten van Radix UI.

### Technologie Stack
- **Framework**: React 18 (met hooks).
- **Build Tool**: Vite (snelle dev server en builds).
- **Routing**: React Router DOM.
- **Data Fetching**: Tanstack React Query (voor caching, queries en mutations).
- **State Management**: Zustand (lightweight alternatief voor Redux).
- **Forms**: React Hook Form met Zod voor validatie.
- **Styling**: TailwindCSS (utility-first) met plugins zoals Animate en CVA voor variants.
- **Kalender**: FullCalendar met plugins voor daygrid, timegrid en Google Calendar integratie.
- **Overig**: Axios voor HTTP requests, Sonner voor toasts, Date-fns voor date handling.

### Vereisten
- Node.js >= 18.
- Yarn of npm als package manager.
- Toegang tot de backend API (lokaal of deployed).
- Google OAuth credentials (voor development).

## 2. Installatie en Setup

### Stappen
1. **Clone de Repository**:
   ```
   git clone <frontend-repo-url>
   cd agenda-automator-frontend
   ```

2. **Installeer Dependencies**:
   Gebruik npm of yarn:
   ```
   npm install
   ```
   Of:
   ```
   yarn install
   ```

3. **Environment Variables**:
   Maak een `.env` file in de root met:
   ```
   VITE_API_BASE_URL=http://localhost:8080/api/v1  # Backend API URL
   VITE_GOOGLE_CLIENT_ID=your-google-client-id    # Voor Google Calendar integratie
   ```
   - `VITE_API_BASE_URL`: Wijst naar de backend (verander voor production).
   - Andere vars kunnen nodig zijn voor theming of debugging.

4. **Start Development Server**:
   ```
   npm run dev
   ```
   De app draait op `http://localhost:3000`. Vite biedt hot module replacement (HMR) voor snelle updates.

5. **Build voor Production**:
   ```
   npm run build
   ```
   Output in `/dist`. Serveer met een static server (bijv. Nginx).

6. **Linting**:
   ```
   npm run lint
   ```
   Gebruikt ESLint met plugins voor React hooks en refresh.

### Common Issues
- **CORS Errors**: Zorg dat de backend `ALLOWED_ORIGINS` includes `http://localhost:3000`.
- **Google OAuth**: Test login flow; zorg voor juiste redirect URI in Google Console.
- **Dependencies Conflicts**: Run `npm dedupe` of `yarn dedupe` bij versieconflicten.

## 3. Project Structuur

De codebase is georganiseerd voor schaalbaarheid:

- **/src**:
  - **/assets**: Images, icons.
  - **/components**: Herbruikbare UI componenten (bijv. Button, Card, Dialog van Radix UI).
    - **/ui**: Shadcn-achtige componenten met Tailwind (bijv. Select, Label).
    - **/forms**: Form componenten met React Hook Form.
    - **/calendar**: FullCalendar wrappers.
  - **/hooks**: Custom hooks (bijv. useAuth, useQuery voor React Query).
  - **/lib**: Utilities (bijv. axios instance, date utils met Date-fns).
  - **/pages**: Route-specifieke views (bijv. Dashboard, Login, Rules).
  - **/stores**: Zustand stores (bijv. authStore, themeStore).
  - **/types**: TypeScript types (bijv. voor API responses).
  - **App.tsx**: Hoofdapp met routing en providers (QueryClientProvider, ThemeProvider).
  - **main.tsx**: Entry point met ReactDOM.render.
  - **vite-env.d.ts**: Vite environment types.

- **/public**: Static assets (bijv. favicon).
- **/tailwind.config.js**: Tailwind configuratie (themes, plugins).
- **/tsconfig.json**: TypeScript config.
- **/vite.config.ts**: Vite config met React plugin.

### Best Practices
- Alle componenten zijn functioneel met hooks.
- TypeScript overal voor type safety.
- Mobile-first design met Tailwind breakpoints.

## 4. Architectuur

### Routing
Gebruikt React Router DOM:
- **Routes**:
  - `/`: Login pagina (redirect naar Google OAuth).
  - `/dashboard`: Overzicht van accounts en regels.
  - `/accounts/:id/rules`: Regels voor specifiek account.
  - `/calendar`: FullCalendar view.
  - Protected routes: Gebruik een `<PrivateRoute>` component met auth check via Zustand.

Voorbeeld in `App.tsx`:
```tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
  </Routes>
</BrowserRouter>
```

### State Management
- **Global State**: Zustand stores voor auth (JWT token), theme (light/dark), en user data.
  Voorbeeld auth store:
  ```tsx
  import { create } from 'zustand';

  export const useAuthStore = create((set) => ({
    token: null,
    setToken: (token) => set({ token }),
  }));
  ```
- **Local State**: React useState voor component-specifieke state.
- **Data Fetching**: React Query voor API calls (queries/mutations). Query keys voor caching (bijv. `['accounts', userId]`).

### API Integratie
- **Axios Instance**: In `/lib/api.ts` met baseURL uit env en interceptors voor auth (voeg Bearer token toe).
- **Endpoints**:
  - GET `/accounts`: Haal verbonden accounts op (gebruik React Query: `useQuery(['accounts'])`).
  - POST `/rules`: Creëer automatisatieregel (mutation: `useMutation(createRule)`).
  - Google Callback: Handelt redirect na login, slaat token op in Zustand.

Error handling: Gebruik Sonner voor toasts op succes/falen.

### Forms
- **React Hook Form**: Voor form state en submission.
- **Zod**: Schema validatie (bijv. voor rule creation: `z.object({ name: z.string(), trigger: z.object(...) })`).
- **Hookform Resolvers**: Integreert Zod met React Hook Form.
Voorbeeld: Form voor nieuwe regel met fields zoals `name`, `trigger_conditions`.

### Styling en Theming
- **TailwindCSS**: Classes voor styling (bijv. `bg-primary text-white`).
- **CVA en Clsx**: Voor component variants (bijv. button met sizes/colors).
- **Next Themes**: Provider voor dark/light mode, toggle via button.
- **Animations**: Tailwind Animate plugin voor transitions.
- **Icons**: Lucide React (bijv. `<CalendarIcon />`).

### Kalender Functionaliteit
- **FullCalendar**: Hoofdcomponent in `/components/calendar`.
  - Plugins: Daygrid, Timegrid, Google Calendar.
  - Integreert met Google API via backend token.
  - Events: Fetch via React Query, toon reminders en shifts.

## 5. Key Componenten

| Component | Beschrijving | Dependencies |
|-----------|-------------|--------------|
| Button | Custom button met variants (primary, secondary). | CVA, Tailwind, Lucide. |
| Dialog | Modals voor confirmaties (bijv. regel verwijderen). | Radix UI Dialog. |
| Select | Dropdowns (bijv. voor triggers). | Radix UI Select. |
| Calendar | FullCalendar wrapper met event rendering. | FullCalendar plugins, Date-fns. |
| FormField | Wrapper voor inputs met validatie. | React Hook Form, Zod. |
| Toast | Notifications op acties. | Sonner. |

## 6. Development Workflow

- **Debugging**: Gebruik React Query Devtools voor query inspectie.
- **Testing**: Geen expliciete tests, maar voeg Jest toe als nodig.
- **Deployment**: Build en deploy naar Vercel/Netlify (Vite compatibel).
- **Performance**: React Query caching vermindert API calls; lazy load componenten met React.lazy.

## 7. Troubleshooting

- **Auth Fouten**: Check JWT in localStorage/Zustand; verifieer backend logs.
- **Calendar Niet Laden**: Zorg voor geldige Google API key en scopes.
- **Form Validatie**: Log Zod errors voor debugging.
- **Styling Issues**: Purge Tailwind cache met `npm run build`.

Voor vragen, check package docs (bijv. Tanstack Query) of backend integratiepunten. Update dependencies regelmatig met `npm update`.