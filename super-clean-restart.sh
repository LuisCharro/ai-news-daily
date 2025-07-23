#!/bin/bash

set -e

echo "🔪 Killing Next.js dev processes..."
pkill -f "next dev" || true

echo "🧹 Removing build, cache, and generated files..."
rm -rf .next
rm -rf .turbo
rm -rf node_modules
rm -rf node_modules/.cache

echo "🧹 Removing all lock files..."
rm -f pnpm-lock.yaml
rm -f package-lock.json
rm -f yarn.lock

# Uncomment this if you want to remove your local env config as well
# echo "🧨 Removing .env.local (uncomment this line if needed)..."
# rm -f .env.local

echo "🧹 Pruning PNPM store cache..."
pnpm store prune

echo "🔄 Reinstalling dependencies from scratch..."
pnpm install

echo "🚀 Starting development server..."
pnpm dev