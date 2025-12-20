#!/bin/bash

echo "🧹 Clearing all caches..."
rm -rf node_modules/.cache
rm -rf .expo
rm -rf .metro
rm -rf web-build

echo "✅ All caches cleared!"
echo "🚀 Starting Expo with cleared cache..."
echo ""
echo "Press 'w' for web, 'a' for Android, 'i' for iOS"
npx expo start --clear
