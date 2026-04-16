# URGENT FIX - Three.js Not Installed

## Problem
The `three` package is not in node_modules, so `npm run dev` fails with "Module not found".

## Solution - Run These Commands

**STOP the dev server first** (Press Ctrl+C in the terminal)

Then run in Command Prompt (as Administrator recommended):

```batch
cd /d C:\project\frontend-demo

REM Clear npm cache to ensure clean install
npm cache clean --force

REM Install three.js explicitly
npm install three@0.160.0 --save

REM Verify it was installed
dir node_modules | find "three"

REM Now restart dev server
npm run dev
```

---

## Alternative: Full Clean Install

If the above doesn't work, do a complete reinstall:

```batch
cd /d C:\project\frontend-demo

REM Stop dev server first (Ctrl+C)

REM Remove node_modules and package-lock.json
rmdir /s /q node_modules
del package-lock.json

REM Reinstall everything
npm install

REM Verify three is installed
dir node_modules | find "three"

REM Start dev server
npm run dev
```

---

## What Each Step Does

1. `npm cache clean --force` - Clears npm cache to prevent version conflicts
2. `npm install three@0.160.0 --save` - Installs Three.js and adds it to package.json
3. `dir node_modules | find "three"` - Verifies the package was installed
4. `npm run dev` - Restarts the development server

---

## Expected Results

When `npm install three` completes, you should see:
```
added 1 package, and audited XX packages in Xs
```

Then when you run `npm run dev`, it should NOT show the "Can't resolve 'three'" error.

---

## If Still Having Issues

Run these diagnostic commands:

```batch
REM Check npm version
npm --version

REM Check if three is listed in installed packages
npm list three

REM Check package.json contents
type package.json | find "three"

REM Check for three in node_modules with full path
dir C:\project\frontend-demo\node_modules | find "three"
```

---

## Still Stuck?

If the error persists after `npm install three`:

1. Try installing a different three version:
   ```batch
   npm install three@latest --save
   ```

2. Or try uninstalling and reinstalling:
   ```batch
   npm uninstall three
   npm install three@0.160.0 --save --legacy-peer-deps
   ```

3. Check if there are permission issues:
   - Run Command Prompt as Administrator
   - Retry: `npm install three@0.160.0`

---

## Root Cause

The previous `npm install` (without specifying three explicitly) did not install the three package. This can happen if:
- npm cache was stale
- package-lock.json has conflicts
- Previous install was interrupted

---

**TL;DR**: Just run this one command:

```batch
npm install three@0.160.0 --save
```

Then restart your dev server!
