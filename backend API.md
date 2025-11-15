Absoluut. Op basis van de door jou aangeleverde Go-code (met name `internal/api/server.go` en `internal/api/handlers.go`), heb ik de volgende API-documentatie samengesteld.

## API Documentatie

Dit document beschrijft de REST API voor de Agenda Automator.

**Basis URL:** Alle endpoints worden voorafgegaan door het pad `/api/v1`.

-----

## 🔐 Authenticatie

De meeste endpoints zijn beveiligd en vereisen een **JSON Web Token (JWT)**.

  * **Hoe te verkrijgen:** Een gebruiker ontvangt een JWT nadat deze succesvol de Google OAuth-flow heeft doorlopen (zie `GET /auth/google/callback`). Het token wordt als URL-parameter (`?token=...`) naar de client-applicatie gestuurd.
  * **Hoe te gebruiken:** De client moet dit token meesturen in de `Authorization` header bij elk beveiligd verzoek.

**Header Voorbeeld:**

```
Authorization: Bearer <uw_jwt_token_hier>
```

Indien een token mist, ongeldig of verlopen is, retourneert de API een `401 Unauthorized` status.

-----

## 🩺 Gezondheidscheck

Deze endpoints zijn publiek en vereisen geen authenticatie.

### `GET /health`

Controleert de status van de API-server.

  * **Authenticatie:** Geen.
  * **Success Response (200 OK):**
    ```json
    {
      "status": "ok"
    }
    ```

-----

## 🔑 Authenticatie (Google OAuth)

Deze endpoints beheren de authenticatie-flow.

### `GET /auth/google/login`

Start de Google OAuth 2.0 authenticatie-flow.

  * **Authenticatie:** Geen.
  * **Actie:** De gebruiker wordt geredirect naar de Google-inlogpagina. Er wordt een `oauthstate` cookie gezet om CSRF-aanvallen te voorkomen.

### `GET /auth/google/callback`

De callback-URL die Google aanroept na een succesvolle (of mislukte) loginpoging.

  * **Authenticatie:** Geen (wordt gevalideerd d.m.v. de `state` parameter en de cookie).
  * **Actie:**
    1.  Valideert de `state`.
    2.  Wisselt de ontvangen `code` in voor een access token en refresh token.
    3.  Haalt gebruikersinformatie op van Google.
    4.  Maakt een `user` aan of haalt deze op (Upsert).
    5.  Slaat het `connected_account` (met versleutelde tokens) op in de database.
    6.  Genereert een intern JWT voor de gebruiker.
    7.  Redirect de gebruiker terug naar de client-applicatie (gedefinieerd in `CLIENT_BASE_URL`) met het JWT in de URL:
        `{CLIENT_BASE_URL}/dashboard?token=<jwt_token_hier>`
  * **Error Response (4xx/5xx):**
    ```json
    {
      "error": "Ongeldige state token"
    }
    ```

-----

## 👤 Accounts (Beveiligd)

Endpoints voor het beheren van gekoppelde accounts.

### `GET /accounts`

Haalt alle gekoppelde accounts (bijv. Google-accounts) op die eigendom zijn van de geauthenticeerde gebruiker.

  * **Authenticatie:** **Vereist** (Bearer Token).

  * **Success Response (200 OK):**

    > **Opmerking:** De `access_token` en `refresh_token` worden **nooit** teruggestuurd naar de client.

    ```json
    [
      {
        "id": "a1b2c3d4-...",
        "user_id": "e5f6a7b8-...",
        "provider": "google",
        "email": "gebruiker@gmail.com",
        "status": "active",
        "provider_user_id": "123456789...",
        "created_at": "2025-10-20T10:00:00Z"
      }
    ]
    ```

  * **Error Response (401 Unauthorized):**

    ```json
    {
      "error": "Geen Authorization header"
    }
    ```

-----

## 🤖 Automatisering (Beveiligd)

Endpoints voor het beheren van automatiseringsregels.

### `POST /rules`

Maakt een nieuwe automatiseringsregel aan voor een specifiek account.

  * **Authenticatie:** **Vereist** (Bearer Token).
  * **Validatie:** De server controleert of de geauthenticeerde gebruiker eigenaar is van de `connected_account_id` die wordt opgegeven.
  * **Request Body:**
    ```json
    {
      "connected_account_id": "a1b2c3d4-...",
      "name": "Mijn Herinneringsregel",
      "trigger_conditions": {
        "summary_contains": ["Werk"]
      },
      "action_params": {
        "offset_minutes": -60,
        "new_event_title": "Voorbereiden op werk",
        "duration_min": 15
      }
    }
    ```
  * **Success Response (201 Created):**
    ```json
    {
      "id": "r1u2l3e4-...",
      "connected_account_id": "a1b2c3d4-...",
      "name": "Mijn Herinneringsregel",
      "is_active": true,
      "trigger_conditions": {
        "summary_contains": ["Werk"]
      },
      "action_params": {
        "offset_minutes": -60,
        "new_event_title": "Voorbereiden op werk",
        "duration_min": 15
      },
      "created_at": "2025-10-20T10:05:00Z",
      "updated_at": "2025-10-20T10:05:00Z"
    }
    ```
  * **Error Response (403 Forbidden):**
    ```json
    {
      "error": "Je hebt geen toegang tot dit account"
    }
    ```

### `GET /accounts/{accountID}/rules`

Haalt alle actieve automatiseringsregels op voor een specifiek account.

  * **Authenticatie:** **Vereist** (Bearer Token).
  * **URL Parameters:**
      * `{accountID}` (UUID): De ID van het `connected_account`.
  * **Validatie:** De server controleert of de geauthenticeerde gebruiker eigenaar is van de `{accountID}`.
  * **Success Response (200 OK):**
    ```json
    [
      {
        "id": "r1u2l3e4-...",
        "connected_account_id": "a1b2c3d4-...",
        "name": "Mijn Herinneringsregel",
        "is_active": true,
        "trigger_conditions": { "...": "..." },
        "action_params": { "...": "..." },
        "created_at": "2025-10-20T10:05:00Z",
        "updated_at": "2025-10-20T10:05:00Z"
      }
    ]
    ```
  * **Error Response (403 Forbidden):**
    ```json
    {
      "error": "Je hebt geen toegang tot dit account"
    }
    ```
  * **Error Response (400 Bad Request):**
    ```json
    {
      "error": "Ongeldig account ID formaat"
    }
    ```

-----

## 👤 Gebruikers (Verouderd/Optioneel)

### `POST /users`

Maakt handmatig een gebruiker aan.

> **Opmerking:** Dit endpoint lijkt overbodig, aangezien de Google OAuth-flow (`/auth/google/callback`) dit proces (Create/Upsert) al automatisch afhandelt.

  * **Authenticatie:** Geen.
  * **Request Body:**
    ```json
    {
      "email": "test@voorbeeld.com",
      "name": "Test Gebruiker"
    }
    ```
  * **Success Response (201 Created):**
    ```json
    {
      "id": "e5f6a7b8-...",
      "email": "test@voorbeeld.com",
      "name": "Test Gebruiker",
      "created_at": "2025-10-20T09:00:00Z",
      "updated_at": "2025-10-20T09:00:00Z"
    }
    ```
  * **Error Response (400 Bad Request):**
    ```json
    {
      "error": "Email is required"
    }
    ```