@echo off
REM Install dependencies and build script for frontend-demo
REM This script installs npm packages and runs the build

cd /d C:\project\frontend-demo

echo.
echo ============================================
echo Installing Dependencies...
echo ============================================
echo.

REM Install npm dependencies
call npm install

if errorlevel 1 (
    echo.
    echo ERROR: npm install failed
    exit /b 1
)

echo.
echo ============================================
echo Building Next.js Project...
echo ============================================
echo.

REM Build the project
call npm run build

if errorlevel 1 (
    echo.
    echo ERROR: npm build failed
    exit /b 1
)

echo.
echo ============================================
echo Build Completed Successfully!
echo ============================================
echo.
echo To run the development server:
echo   npm run dev
echo.
