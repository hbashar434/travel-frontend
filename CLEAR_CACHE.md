# Clear Cache Instructions

After updating NativeWind/Babel configuration, you need to clear caches:

## Steps to Fix Styling Issues:

1. **Stop the Expo dev server** (Ctrl+C)

2. **Clear all caches:**

   ```bash
   rm -rf node_modules/.cache
   rm -rf .expo
   npx expo start --clear
   ```

3. **For Android, rebuild:**

   ```bash
   npx expo run:android
   ```

4. **Or restart with cache cleared:**
   ```bash
   npm start -- --clear
   ```

The `--clear` flag clears the Metro bundler cache which is essential after Babel/Metro config changes.
