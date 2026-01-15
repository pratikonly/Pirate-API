# Pirate API - Project Structure & Overview

## Project Structure

```
pirate-api/
├── client/                          # React Frontend (Vite)
│   ├── public/
│   │   └── images/pirates/          # Pirate character images go here
│   │       ├── luffy.png
│   │       ├── zoro.png
│   │       ├── shanks.png
│   │       ├── sanji.png
│   │       ├── joyboy.png
│   │       ├── garp.png
│   │       ├── brook.png
│   │       ├── doflamingo.png
│   │       └── jack_sparrow.png
│   └── src/
│       ├── components/
│       │   ├── ApiPreview.tsx       # JSON response preview component
│       │   ├── PirateCard.tsx       # Individual pirate card component
│       │   └── ui/                  # Shadcn UI components
│       ├── hooks/
│       │   └── use-pirates.ts       # React Query hooks for API calls
│       ├── lib/
│       │   └── queryClient.ts       # TanStack Query setup
│       ├── pages/
│       │   ├── Home.tsx             # Main gallery page
│       │   └── not-found.tsx        # 404 page
│       ├── App.tsx                  # Root component
│       └── main.tsx                 # Entry point
│
├── server/                          # Express Backend
│   ├── index.ts                     # Server entry point
│   ├── routes.ts                    # API route handlers
│   ├── storage.ts                   # Data storage logic
│   ├── db.ts                        # Database connection (not used in this version)
│   ├── static.ts                    # Static file serving
│   └── vite.ts                      # Vite dev server setup
│
├── shared/                          # Shared Types & Schemas
│   ├── schema.ts                    # Zod schemas + pirate data (MAIN DATA FILE)
│   └── routes.ts                    # API contract definitions
│
├── vercel.json                      # Vercel deployment config
├── vite.config.ts                   # Vite build config
├── tailwind.config.ts               # Tailwind CSS config
├── package.json                     # Dependencies
└── README.md                        # Documentation
```

---

## What This API Does

### Overview
The **Pirate API** is a simple REST API that serves One Piece character data. All character information (names, roles, bounties) is stored directly in code, and images are served from local files.

### Core Features

#### 1. **Character Data Storage** (`shared/schema.ts`)
- Contains hardcoded pirate data with 9 male characters:
  - Monkey D. Luffy (Captain)
  - Roronoa Zoro (Swordsman)
  - Shanks (Red Hair Captain)
  - Sanji (Cook)
  - Joyboy (Legendary Figure)
  - Monkey D. Garp (Marine Vice Admiral)
  - Brook (Musician)
  - Donquixote Doflamingo (Antagonist)
  - Jack Sparrow (Bonus character)

- Each pirate has:
  - `id`: Unique identifier
  - `name`: Character name
  - `role`: Their position/title
  - `bounty`: Their bounty amount
  - `imagePath`: Path to their image file

#### 2. **API Endpoints**

**GET `/api/pirates`**
- Returns a list of all pirates
- No authentication required
- Response: Array of pirate objects

Example Response:
```json
[
  {
    "id": 1,
    "name": "Monkey D. Luffy",
    "role": "Captain",
    "bounty": "3,000,000,000 Berries",
    "imagePath": "/images/pirates/luffy.png"
  },
  ...
]
```

**GET `/api/pirates/:id`**
- Returns a specific pirate by ID
- Example: `/api/pirates/1` returns Luffy
- Returns 404 if pirate not found

**GET `/api/pirates/random`**
- Returns a random pirate from the list
- Great for "Feeling Lucky?" feature

#### 3. **Frontend Gallery**
- Interactive gallery showing all pirates as cards
- "Feeling Lucky?" button to get random pirates
- API documentation section showing JSON responses
- Pirate-themed design with:
  - Hero section
  - Wanted posters grid
  - Total bounty calculator
  - Dark/light mode support

#### 4. **Data Flow**

```
Frontend (React)
    ↓
useQuery Hook (TanStack Query)
    ↓
HTTP Request to /api/pirates
    ↓
Express Server (server/routes.ts)
    ↓
FileStorage (server/storage.ts)
    ↓
Pirate Data (shared/schema.ts)
    ↓
Returns JSON to Frontend
    ↓
PirateCard Components render
```

#### 5. **Storage Method**
- **Type**: In-memory from code (FileStorage class)
- **Data Location**: `shared/schema.ts` - `piratesData` constant
- **No Database**: All data is hardcoded in TypeScript
- **No API Keys**: No external services required
- **Easy to Deploy**: Works anywhere (Replit, Vercel, etc.)

#### 6. **Image Handling**
- Images stored locally in: `client/public/images/pirates/`
- Served as static files by Express
- Each pirate has an `imagePath` pointing to their image
- Supports: PNG, JPG, WebP, etc.

---

## Technology Stack

**Frontend:**
- React 18
- TypeScript
- Vite (build tool)
- TanStack Query (data fetching)
- Tailwind CSS (styling)
- Shadcn UI (components)
- Framer Motion (animations)
- Lucide React (icons)

**Backend:**
- Express.js
- TypeScript
- Zod (schema validation)

**Deployment:**
- Vercel (serverless functions)
- Node.js runtime

---

## How to Use

### Development
```bash
npm run dev
# Starts on http://localhost:5000
```

### API Calls
```javascript
// Get all pirates
const response = await fetch('/api/pirates');
const pirates = await response.json();

// Get specific pirate
const pirate = await fetch('/api/pirates/1');

// Get random pirate
const random = await fetch('/api/pirates/random');
```

### Adding New Pirates
Edit `shared/schema.ts` and add to the `piratesData` array:
```typescript
{
  id: 10,
  name: "New Pirate",
  role: "Their Role",
  bounty: "X Berries",
  imagePath: "/images/pirates/new_pirate.png"
}
```

### Uploading Images
Upload image files to `client/public/images/pirates/` with the exact filename from `imagePath`.

---

## Deployment

### Vercel
```bash
# Push to GitHub
git push origin main

# Deploy on Vercel
vercel deploy
```

API will be available at: `https://your-project.vercel.app/api/pirates`

### Replit
Already configured and running. Just access `/api/pirates` endpoint.

---

## File Responsibilities

| File | Purpose |
|------|---------|
| `shared/schema.ts` | **Main Data Source** - Contains all pirate data |
| `shared/routes.ts` | API contract - defines endpoints and types |
| `server/routes.ts` | Implements API endpoints |
| `server/storage.ts` | Provides data to routes |
| `client/src/pages/Home.tsx` | Main gallery UI |
| `client/src/hooks/use-pirates.ts` | React Query setup for API calls |
| `vercel.json` | Serverless function configuration |

---

## Summary

This is a **lightweight, deployable API** that:
✅ Stores pirate data in code (no database)
✅ Serves pirate information via REST endpoints
✅ Displays pirates in an interactive gallery
✅ Works on Replit and Vercel
✅ No authentication, no external dependencies
✅ Perfect for learning API design patterns
