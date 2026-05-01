# 🔐 Authentication Setup

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Create PostgreSQL Database
```bash
createdb namaz_education_pro
```

### 3. Setup Environment Variables
```bash
cp apps/web/.env.example apps/web/.env.local
```

### 4. Get OAuth Credentials

#### GitHub OAuth
1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill:
   - Application name: `Namaz Education Pro`
   - Homepage: `http://localhost:3000`
   - Callback: `http://localhost:3000/api/auth/callback/github`
4. Copy ID and Secret to `.env.local`

#### Google OAuth
1. Go to https://console.cloud.google.com
2. Create project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `http://localhost:3000`
6. Copy ID and Secret to `.env.local`

### 5. Generate NextAuth Secret
```bash
openssl rand -base64 32
```
Copy output to `NEXTAUTH_SECRET`

### 6. Initialize Database
```bash
npm run db:migrate
```

### 7. Start Application
```bash
npm run dev
```

## Test Authentication

- Sign Up: http://localhost:3000/auth/signup
- Sign In: http://localhost:3000/auth/signin
- Dashboard: http://localhost:3000/dashboard

✅ **Setup complete!**
