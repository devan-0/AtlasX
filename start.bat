@echo off
title AtlasX Website — Local Server
echo ========================================================
echo   AtlasX Website — Local Development Server
echo ========================================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in your PATH.
    echo Please install Node.js 18+ from https://nodejs.org
    pause
    exit /b 1
)

if not exist node_modules (
    echo [1/2] Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install dependencies.
        pause
        exit /b 1
    )
)

echo [2/2] Starting local web server...
echo.
call npm run dev
pause
