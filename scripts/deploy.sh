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

# Build
echo "Building application..."
pnpm build

# Restart PM2 process
echo "Restarting PM2 process..."
pnpm pm2:restart

echo "Deployment complete!" 