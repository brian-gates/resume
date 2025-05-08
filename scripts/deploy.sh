#!/bin/bash

# Exit on error
set -e

echo "Starting deployment..."

# Pull latest changes
echo "Pulling latest changes from git..."
git pull

# Install dependencies
echo "Installing dependencies..."
pnpm i

# Build with explicit error handling
echo "Building application..."
if ! pnpm build; then
  echo "Error: Build failed! Deployment aborted."
  exit 1
fi

# Only continue if build succeeded
echo "Build successful!"

# Restart PM2 process
echo "Restarting PM2 process..."
pnpm pm2:restart

echo "Deployment complete!" 