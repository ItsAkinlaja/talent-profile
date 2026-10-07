# TalentProfile

A full-stack talent profile management system built with Next.js 14, Supabase, and ImageKit. Manage talent profiles with a beautiful multi-step form wizard, resume-like views, and an admin dashboard with PDF/DOCX export.

## Features

- **Multi-step form wizard** — 6-step profile creation across Personal Info, Contact, Address, Education, Preview, and Success
- **Resume-like profile view** — professional CV layout with timeline education section
- **User management** — list, view, edit, and delete profiles
- **Admin dashboard** — stats overview + download any profile as PDF or DOCX
- **ImageKit integration** — profile photo upload and CDN delivery
- **Supabase Postgres** — 4 normalized tables with cascading deletes
- **Redux Toolkit** — global state management
- **TypeScript** throughout

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Database | Supabase (Postgres) |
| Image storage | ImageKit |
| State | Redux Toolkit |
| Forms | react-hook-form + Zod |
| Styling | Tailwind CSS |
| PDF export | jspdf + jspdf-autotable |
| DOCX export | docx + file-saver |
| Deployment | Vercel |

## Local Setup

### 1. Clone and install dependencies

```bash
git clone <your-repo-url>
cd TalentProfile
npm install
```

### 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In your project, go to **SQL Editor** and run the contents of `supabase/migrations/001_initial.sql`
3. Go to **Settings → API** and copy:
   - Project URL
   - `anon` / public key
   - `service_role` key (keep this secret!)

### 3. Set up ImageKit

1. Go to [imagekit.io](https://imagekit.io) and create an account
2. From your dashboard, copy:
   - Public Key
   - Private Key  
   - URL Endpoint (e.g. `https://ik.imagekit.io/your_id`)

### 4. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## API Endpoints

All endpoints are Next.js API routes under `/api/`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/users` | Get all users with relations |
| `POST` | `/api/users` | Create user (saves to all 4 tables) |
| `GET` | `/api/users/:id` | Get single user with relations |
| `PUT` | `/api/users/:id` | Update user (all sections) |
| `DELETE` | `/api/users/:id` | Delete user (cascades) |
| `POST` | `/api/upload` | Upload image to ImageKit |

### POST /api/users — Request Body

```json
{
  "userInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "dob": "1990-01-15",
    "occupation": "Software Engineer",
    "gender": "Male",
    "profilePhoto": "https://ik.imagekit.io/..."
  },
  "userContact": {
    "email": "john@example.com",
    "phoneNumber": "+1 234 567 8900",
    "fax": "+1 234 567 8901",
    "linkedInUrl": "https://linkedin.com/in/johndoe"
  },
  "userAddress": {
    "address": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "country": "United States",
    "zipCode": "10001"
  },
  "userAcademics": [
    {
      "schoolName": "Harvard University",
      "degree": "Bachelor of Science",
      "fieldOfStudy": "Computer Science",
      "startYear": 2008,
      "endYear": 2012
    }
  ]
}
```

## Deployment to Vercel

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Add all environment variables from `.env.local` to Vercel's **Environment Variables** settings
4. Deploy — Vercel auto-detects Next.js

## Database Schema

```
UserInfoTB          ← main profile record
  ↓ (1:1)
UserContactTB       ← email, phone, fax, LinkedIn
  ↓ (1:1)
UserAddressTB       ← address, city, state, country, zip
  ↓ (1:many)
UserAcademicsTB     ← list of schools/degrees
```

All child tables have `userId` as a foreign key with `ON DELETE CASCADE`.
