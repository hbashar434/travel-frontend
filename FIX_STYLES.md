# Fix Styles - Complete Solution

## Issues Fixed:

1. ✅ Removed `jsxImportSource: "nativewind"` from babel-preset-expo (was breaking web)
2. ✅ Simplified babel config to use NativeWind as plugin only
3. ✅ All layouts import global.css

## CRITICAL: You MUST clear cache and restart

```bash
# Stop server (Ctrl+C)

# Clear ALL caches
rm -rf node_modules/.cache .expo .metro web-build

# Restart with cleared cache
npx expo start --clear
```

## For Web:

```bash
npx expo start --web --clear
```

## For Android:

```bash
npx expo run:android
```

## Current Configuration:

- Babel: NativeWind as plugin (not preset with jsxImportSource)
- Metro: NativeWind wrapper configured
- Tailwind: NativeWind preset included
- Global CSS: Imported in root layout

The `jsxImportSource` was breaking web builds. Now it should work on both web and native.
