# Scripts Directory

This directory contains automation scripts for the AI News Daily website.

## Files

- `generate-daily-ai-news.js` - Daily content generation script that creates 3 AI news stories using OpenAI API

## Usage

The scripts are designed to be run via GitHub Actions for automated daily content generation.

### Local Development

To run the content generation script locally:

```bash
node src/scripts/generate-daily-ai-news.js
```

Make sure you have the required environment variables set in your `.env.local` file.

## Environment Variables Required

- `OPENAI_API_KEY` - OpenAI API key for content generation
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key for database access
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL