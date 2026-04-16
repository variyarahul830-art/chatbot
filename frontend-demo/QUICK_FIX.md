# QUICK FIX - Copy & Paste Commands

## Immediate Action Required

The error shows that `three` package is not installed even though it's in package.json.

---

## THE SIMPLEST FIX

**Copy and paste this ENTIRE block into your Command Prompt and press Enter:**

```batch
cd /d C:\project\frontend-demo && npm install three@0.160.0 --save
```

That's it! This will:
1. Navigate to the project folder
2. Install the three.js package
3. Add it to package.json

---

## After Installation

Once that completes (takes 30-60 seconds), run:

```batch
npm run dev
```

The error should be gone!

---

## Detailed Step-by-Step (If Above Doesn't Work)

1. **Open Command Prompt** (Win+R → type `cmd` → Enter)

2. **Stop the dev server** (if running)
   - Press `Ctrl+C` in the terminal

3. **Navigate to project**
   ```batch
   cd /d C:\project\frontend-demo
   ```

4. **Install three.js**
   ```batch
   npm install three@0.160.0 --save
   ```

5. **Verify installation**
   ```batch
   npm list three
   ```
   You should see: `three@0.160.0`

6. **Restart dev server**
   ```batch
   npm run dev
   ```

---

## What You'll See

### During installation:
```
npm notice 
npm notice New minor version of npm available: X.X.X -> X.X.X
npm notice to update run: npm install -g npm@X.X.X
npm notice 
added 1 package, and audited XX packages in XXs
```

### After restart (npm run dev):
```
✓ Ready in 2.5s
- Local:        http://localhost:3001
```

**NO ERROR ABOUT 'three'** ✓

---

## Why This Happened

The `npm install` command (without specifying three) didn't install the three package. This can happen due to:
- Stale npm cache
- Incomplete installation
- Network issues during install

**The fix**: Explicitly install `three@0.160.0` using `npm install three@0.160.0 --save`

---

## Troubleshooting If Still Not Working

### If npm says "command not found":
- Install Node.js from https://nodejs.org/
- Close and reopen Command Prompt
- Try again

### If permission denied:
- Right-click Command Prompt → "Run as Administrator"
- Try the install command again

### If it says three is already installed but still can't find it:
```batch
REM Clear cache and reinstall
npm cache clean --force
rmdir /s /q node_modules
del package-lock.json
npm install
```

---

## Quick Check - Is Three Installed?

Run this to verify:
```batch
dir C:\project\frontend-demo\node_modules | find "three"
```

If you see `three` listed, it's installed!

---

**🚀 TL;DR**: Open Command Prompt and run:
```
npm install three@0.160.0 --save
```

That's all you need to do!
