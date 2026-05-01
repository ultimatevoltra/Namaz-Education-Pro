# 🕌 Namaz Education Pro

A production-grade Islamic learning system with authentication, offline support, and advanced progress tracking.

## ✨ Features

- **📖 Salah Learning Engine** - Step-by-step Islamic prayer guidance
- **🤖 Bangla AI Imam** - Conversational AI for Bangla Islamic questions
- **🧍‍♂️ 3D Salah Visualization** - Animated human salah model
- **❌ Mistake Detection** - Real-time correction system
- **📱 Offline Support** - IndexedDB + Service Worker
- **📊 Progress Tracking** - Daily/weekly/monthly analytics
- **🔐 Secure Authentication** - NextAuth with GitHub/Google OAuth
- **📈 Advanced Analytics** - Common mistakes, success rates, trends

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/ultimatevoltra/Namaz-Education-Pro.git
cd Namaz-Education-Pro

# Install dependencies
npm install

# Create PostgreSQL database
createdb namaz_education_pro

# Setup environment variables
cp apps/web/.env.example apps/web/.env.local
```

### Get OAuth Credentials

**GitHub**: https://github.com/settings/developers
**Google**: https://console.cloud.google.com

Fill in `.env.local` with your credentials.

### Run

```bash
# Generate NextAuth secret
openssl rand -base64 32  # Copy to NEXTAUTH_SECRET

# Setup database
npm run db:migrate

# Start development
npm run dev
```

Visit http://localhost:3000

## 📚 Architecture

### Monorepo Structure

```
namaz-education-pro/
├── apps/
│   └── web/                 ← Next.js application
├── packages/
│   ├── auth/               ← NextAuth configuration
│   ├── db/                 ← Prisma client
│   ├── core/               ← Islamic logic engine
│   ├── ai-imam/            ← Bangla AI guidance
│   ├── offline/            ← IndexedDB + Sync
│   ├── analytics/          ← Progress tracking
│   ├── ui/                 ← Components
│   └── prayer/             ← Prayer times API
├── prisma/
│   └── schema.prisma
└── public/
    └── sw.js              ← Service Worker
```

## 🔐 Authentication

- **Email/Password**: Credentials with bcryptjs hashing
- **GitHub OAuth**: Fast login
- **Google OAuth**: Sign in with Google
- **JWT Sessions**: Secure 30-day sessions

## 📱 Offline Features

- **IndexedDB Storage**: Local database on device
- **Service Worker**: Caches app shell
- **Automatic Sync**: Syncs when connection returns
- **Conflict Resolution**: Smart data merging

## 📊 Database Schema

| Table | Purpose |
|-------|----------|
| `users` | User accounts & profiles |
| `accounts` | OAuth provider data |
| `sessions` | JWT session management |
| `salah_progress` | Prayer session records |
| `salah_mistakes` | Detected mistakes |
| `daily_stats` | Daily aggregated data |
| `user_settings` | User preferences |
| `sync_queue` | Offline sync queue |

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

### Progress Tracking
- `POST /api/progress/save` - Save prayer session
- `GET /api/progress/stats` - Get user statistics

### Sync
- `POST /api/sync/salah_progress` - Sync offline data

## 🧠 Islamic Logic

### Salah Steps (8 Steps)
1. Niyyah (Intention)
2. Takbir (Opening takbir)
3. Qiyam (Standing)
4. Fatiha (Al-Fatiha recitation)
5. Ruku (Bowing)
6. Sujood (Prostration)
7. Tashahhud (Attestation)
8. Salam (Greeting of peace)

## 🛠️ Development

### Database
```bash
# Create migration
npm run db:migrate

# Push schema to database
npm run db:push

# Open Prisma Studio
npm run db:studio
```

### Build for Production
```bash
npm run build
npm run start
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy!

### Self-Hosted

1. Set up PostgreSQL server
2. Configure environment variables
3. Run migrations: `npm run db:migrate`
4. Deploy with Docker or PM2

## 📖 Documentation

- [Authentication Setup](./AUTHENTICATION_SETUP.md)
- [Offline Features](./OFFLINE_FEATURES.md)
- [Database Schema](./prisma/schema.prisma)

## 🕌 Islamic Note

This project is based on authentic Islamic sources (Quran and Hadith). All teachings should be verified with qualified Islamic scholars.

## 👨‍💼 Author

**ultimatevoltra** - GitHub

---

**🎉 Built with ❤️ for Islamic education**