@echo off
REM Install Three.js package
echo Installing Three.js package (three@0.160.0)...
echo.

cd /d C:\project\frontend-demo

REM Install three
npm install three@0.160.0 --save

if errorlevel 1 (
    echo.
    echo ERROR: npm install failed
    echo Try running as Administrator
    pause
    exit /b 1
)

echo.
echo ✓ Three.js installed successfully!
echo.
echo Next, run: npm run dev
echo.
pause
