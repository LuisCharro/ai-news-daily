

# 📰 AI News Daily

AI News Daily is a beautiful, futuristic web app that automatically generates and displays daily news about artificial intelligence, powered by OpenAI and Supabase. Built with Next.js 15, React 19, Tailwind CSS, and a modern component architecture.


## 🚀 Features

- **Daily AI News**: Fresh news generated every day using OpenAI GPT-4o
- **Automated Workflow**: GitHub Actions runs the news generator script daily
- **Database Storage**: News is saved in a Supabase PostgreSQL table
- **Next.js 15 + React 19 + TypeScript**: Built with the latest Next.js App Router and React 19
- **Tailwind CSS**: Responsive, modern, and animated UI
- **Radix UI & Lucide Icons**: Accessible, beautiful components and icons
- **Professional Practices**: Modular, typed codebase, conventional commits, automated workflows
- **Secure Key Management**: All secrets managed via environment variables and GitHub secrets


## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) 15 (App Router)
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/) 5.x
- [Tailwind CSS](https://tailwindcss.com/) 3.4.x
- [Supabase](https://supabase.com/) (PostgreSQL)
- [OpenAI API](https://platform.openai.com/docs)
- [Radix UI](https://www.radix-ui.com/) (all primitives)
- [Lucide Icons](https://lucide.dev/)
- [class-variance-authority](https://cva.style/), [clsx](https://github.com/lukeed/clsx), [react-hook-form](https://react-hook-form.com/), [embla-carousel-react](https://www.embla-carousel.com/), [recharts](https://recharts.org/), [sonner](https://sonner.emilkowal.com/), [tailwind-merge](https://github.com/dcastil/tailwind-merge), [tailwindcss-animate](https://github.com/joe-bell/tailwindcss-animate), [next-themes](https://github.com/pacocoursey/next-themes)
- [GitHub Actions](https://docs.github.com/en/actions) (daily news generation)


## 📦 Project Structure

```
IaNews/
├── app/
│   ├── api/
│   │   ├── ai-news/route.ts      # API route for news
│   │   └── mcp/route.ts          # MCP API route
│   ├── layout.tsx                # App layout (Header, Footer, Theme)
│   ├── page.tsx                  # Main page (news display)
│   └── globals.css               # Global styles
├── components/
│   ├── header.tsx, footer.tsx    # Layout components
│   ├── loading-spinner.tsx       # Loading indicator
│   ├── news-card.tsx             # Individual news card
│   ├── news-display.tsx          # News display grid
│   ├── theme-provider.tsx        # Theme switching
│   └── ui/                       # Radix UI primitives (accordion, button, card, etc.)
├── hooks/
│   ├── use-mobile.tsx            # Mobile detection
│   └── use-toast.ts              # Toast notifications
├── lib/
│   ├── ai-news.ts                # News fetch logic
│   └── utils.ts                  # Utility functions
├── public/                       # Static assets (images, SVGs)
├── styles/
│   └── globals.css               # Tailwind base styles
├── scripts/
│   └── generate-daily-ai-news.ts # News generator script
├── types/
│   ├── api.ts, database.ts, ...  # Type definitions
├── .github/workflows/daily-ai-news.yml # GitHub Actions workflow
├── .env.local                    # Local environment variables
├── package.json, tsconfig.json, tailwind.config.ts, postcss.config.mjs, etc.
```


## ⚡ Setup & Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/LuisCharro/ai-news-daily.git
   cd IaNews
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file:
   ```env
   SUPABASE_URL=https://your-project-ref.supabase.co
   SUPABASE_SERVICE_KEY=your-supabase-service-role-or-anon-key
   OPENAI_API_KEY=your-openai-api-key
   ```

4. **Set up Supabase table**
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

5. **Run locally**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the site.


## 🤖 Automated News Generation

- The script `scripts/generate-daily-ai-news.ts` generates and saves daily AI news using OpenAI and Supabase.
- The GitHub Actions workflow `.github/workflows/daily-ai-news.yml` runs this script every day at 6:00 AM Swiss time.
- Secrets (`SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `OPENAI_API_KEY`) must be set in your GitHub repo under **Settings > Secrets and variables > Actions**.


## 🏗️ How It Works

1. **Script**: Generates daily AI news using OpenAI, saves it to Supabase
2. **API Route**: `/api/ai-news` fetches news from Supabase for the frontend
3. **Frontend**: Displays the latest news in a beautiful, animated grid
4. **GitHub Actions**: Automates daily news generation and insertion


## 📝 Professional Practices

- All secrets are kept out of source control
- Automated workflow for fresh content
- Modular, typed codebase
- Easy to extend for more news, sources, or features
- Conventional commits and categorized PRs


## 🧑‍💻 Development & Contribution

- Fork and clone the repo
- Create feature branches for changes
- Use conventional commits for clarity
- Open PRs for review


## 📄 License

MIT
