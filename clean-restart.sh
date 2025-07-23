#!/bin/bash

echo "Killing existing Next.js dev servers..."
pkill -f "next dev" || true

echo "Removing .next, .cache, and .turbo directories..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .turbo

echo "Pruning pnpm store..."
pnpm store prune

echo "Reinstalling dependencies..."
pnpm install

echo "Starting development server..."
pnpm dev