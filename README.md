
# 📰 AI News Daily

A modern web app that automatically generates and displays daily news about artificial intelligence, powered by OpenAI and Supabase.

## 🚀 Features

- **Daily AI News**: Fresh news generated every day using OpenAI GPT-4o
- **Automated Workflow**: GitHub Actions runs the news generator script daily
- **Database Storage**: News is saved in a Supabase PostgreSQL table
- **Next.js 15 + TypeScript**: Built with the latest Next.js App Router and TypeScript
- **Tailwind CSS**: Responsive, modern UI
- **Secure Key Management**: All secrets managed via environment variables and GitHub secrets

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) 15 (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) (PostgreSQL)
- [OpenAI API](https://platform.openai.com/docs)
- [GitHub Actions](https://docs.github.com/en/actions)

## 📦 Project Structure

```
IaNews/
├── src/
│   ├── app/
│   │   ├── api/ai-news/route.ts   # API route for news
│   │   ├── page.tsx               # Main page
│   │   └── layout.tsx, globals.css
│   ├── components/
│   │   └── news-display.tsx       # News display component
│   ├── lib/
│   │   └── ai-news.ts             # News fetch logic
│   ├── scripts/
│   │   └── generate-daily-ai-news.ts # News generator script
│   └── types/                     # Type definitions
├── .github/workflows/daily-ai-news.yml # GitHub Actions workflow
├── .env.local                     # Local environment variables
├── tsconfig.json, package.json, etc.
```

## ⚡ Setup & Installation

### 1. Clone the repo
```bash
git clone https://github.com/LuisCharro/ai-news-daily.git
cd ai-news-daily
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env.local` file:
```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_KEY=your-supabase-service-role-or-anon-key
OPENAI_API_KEY=your-openai-api-key
```

### 4. Set up Supabase table
Create the `ai_news` table in your Supabase project:
```sql
CREATE TABLE ai_news (
  id BIGSERIAL PRIMARY KEY,
  day INTEGER NOT NULL,
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  source TEXT,
  display_date TEXT NOT NULL,
  position INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- Optionally, add a unique index to prevent duplicate news per day
CREATE UNIQUE INDEX ai_news_date_position_unique ON ai_news (display_date, position);
```

### 5. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🤖 Automated News Generation

- The script `src/scripts/generate-daily-ai-news.ts` generates and saves daily AI news using OpenAI and Supabase.
- The GitHub Actions workflow `.github/workflows/daily-ai-news.yml` runs this script every day at 6:00 AM Swiss time.
- Secrets (`SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `OPENAI_API_KEY`) must be set in your GitHub repo under **Settings > Secrets and variables > Actions**.

## 🏗️ How It Works

1. **Script**: Generates a news item for today using OpenAI, saves it to Supabase.
2. **API Route**: `/api/ai-news` fetches news from Supabase for the frontend.
3. **Frontend**: Displays the latest news on the homepage.
4. **GitHub Actions**: Automates daily news generation and insertion.

## 📝 Professional Practices

- All secrets are kept out of source control
- Automated workflow for fresh content
- Modular, typed codebase
- Easy to extend for more news, sources, or features

## 🧑‍💻 Development & Contribution

- Fork and clone the repo
- Create feature branches for changes
- Use conventional commits for clarity
- Open PRs for review

## 📄 License

MIT
