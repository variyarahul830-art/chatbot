# Two Solutions to Fix the Three.js Error

## Solution 1: INSTALL THREE.JS (Recommended - 2 minutes)

**Best option:** Install the missing package

```batch
cd /d C:\project\frontend-demo
npm install three@0.160.0 --save
npm run dev
```

✅ Pros:
- Gets the full 3D visualization working
- One command
- Complete solution
- Takes ~60 seconds

❌ Cons:
- None! This is the right solution

---

## Solution 2: TEMPORARY FALLBACK (Quick workaround - 1 minute)

If installing three fails for some reason, temporarily replace the 3D visualization with a placeholder.

### Option 2A: Disable VectorSpaceVisualization temporarily

Edit: `app/components/RAGVisualization.jsx`

Find this section:
```javascript
import VectorSpaceVisualization from './VectorSpaceVisualization';
```

Replace with:
```javascript
// import VectorSpaceVisualization from './VectorSpaceVisualization';
const VectorSpaceVisualization = () => <div style={{padding: '2rem', textAlign: 'center'}}>
  <h3>3D Vector Visualization</h3>
  <p>Install three.js to see the 3D visualization</p>
  <code>npm install three@0.160.0 --save</code>
</div>;
```

This will:
- Let the dev server start without errors
- Show a placeholder for the 3D tab
- Still show the other 4 RAG visualization tabs

Then when three installs, uncomment and restart.

### Option 2B: Make VectorSpaceVisualization optional

Or wrap the import in a try-catch... but this is getting complicated.

---

## RECOMMENDATION

**Just do Solution 1** - it's faster and better:

```batch
npm install three@0.160.0 --save
```

This will:
1. Install Three.js
2. Fix the import error
3. Enable the 3D visualization
4. Get everything working

Takes 60 seconds, then everything works!

---

## Why Three Isn't Installed

package.json has: `"three": "^0.160.0"`

But it's not in node_modules because:
1. `npm install` wasn't run with three in dependencies
2. Or `npm install` ran but failed for three
3. Or there's a cache issue

**The fix**: `npm install three@0.160.0 --save` will definitely install it.

---

## STEP-BY-STEP FIX

1. **Stop dev server**
   - Press Ctrl+C in the terminal where npm is running

2. **Open NEW Command Prompt**
   - Win+R → type `cmd` → press Enter

3. **Navigate to project**
   ```batch
   cd /d C:\project\frontend-demo
   ```

4. **Install three**
   ```batch
   npm install three@0.160.0 --save
   ```
   - Wait for it to complete (30-60 seconds)
   - You'll see: "added X packages..."

5. **Start dev server again**
   ```batch
   npm run dev
   ```

6. **Check the app**
   - Open http://localhost:3001
   - Should NOT show the "Can't resolve 'three'" error
   - Tab 4 (Vector Space) should load the 3D visualization

---

## Verification

After running `npm install three@0.160.0 --save`, verify it worked:

```batch
REM Check if three is installed
npm list three

REM Should show:
REM demo-frontend@0.1.0 C:\project\frontend-demo
REM └── three@0.160.0

REM Check node_modules
dir C:\project\frontend-demo\node_modules\three
```

If you see the three folder, it worked!

---

## QUICK COMMAND

Copy this entire line and paste into Command Prompt:

```batch
cd /d C:\project\frontend-demo && npm install three@0.160.0 --save && npm run dev
```

This does all three steps at once!

---

## If Something Goes Wrong

Any issues? Run this nuclear option:

```batch
cd /d C:\project\frontend-demo
rmdir /s /q node_modules
del package-lock.json
npm cache clean --force
npm install
```

This:
1. Deletes node_modules
2. Deletes package-lock.json
3. Clears npm cache
4. Reinstalls EVERYTHING

Takes 3-5 minutes but fixes any npm issue.

---

## Summary

| Action | Time | Result |
|--------|------|--------|
| Install three | 60s | Full 3D visualization works |
| Temporary workaround | 30s | App runs, 3D tab shows placeholder |
| Full reinstall | 3-5 min | Nuclear option - fixes everything |

**Recommended**: Just run `npm install three@0.160.0 --save` ✅
