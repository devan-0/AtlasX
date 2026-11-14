@echo off
setlocal
title AtlasX Website

echo ========================================================
echo   AtlasX Website -- Local Development Server
echo ========================================================
echo.

:: 1. Check if node is in current PATH
where node >nul 2>nul
if %errorlevel% equ 0 goto node_ok

:: 2. Check common Node.js install paths
if exist "%USERPROFILE%\tools\node-v20.18.0-win-x64\node.exe" (
    set "PATH=%USERPROFILE%\tools\node-v20.18.0-win-x64;%PATH%"
    goto node_ok
)
if exist "C:\Users\valiy\tools\node-v20.18.0-win-x64\node.exe" (
    set "PATH=C:\Users\valiy\tools\node-v20.18.0-win-x64;%PATH%"
    goto node_ok
)
if exist "%USERPROFILE%\tools\nodejs\node.exe" (
    set "PATH=%USERPROFILE%\tools\nodejs;%PATH%"
    goto node_ok
)
if exist "C:\Program Files\nodejs\node.exe" (
    set "PATH=C:\Program Files\nodejs;%PATH%"
    goto node_ok
)
if exist "C:\Program Files (x86)\nodejs\node.exe" (
    set "PATH=C:\Program Files (x86)\nodejs;%PATH%"
    goto node_ok
)
if exist "%LOCALAPPDATA%\Programs\node\node.exe" (
    set "PATH=%LOCALAPPDATA%\Programs\node;%PATH%"
    goto node_ok
)
if exist "%APPDATA%\nvm\current\node.exe" (
    set "PATH=%APPDATA%\nvm\current;%PATH%"
    goto node_ok
)

echo [ERROR] Node.js was not found on your system.
echo.
echo Please install Node.js 18+ from https://nodejs.org
echo (Choose the LTS installer and leave 'Add to PATH' checked)
echo.
pause
exit /b 1

:node_ok
echo [OK] Node.js is ready.
echo.

if not exist node_modules (
    echo Installing project dependencies...
    call npm install
    if errorlevel 1 (
        echo [ERROR] npm install failed.
        pause
        exit /b 1
    )
)

echo Starting local web server...
echo.
echo   Local:   http://localhost:5173
echo   Network: Connect from any phone or tablet on the same Wi-Fi
echo.
call npm run dev
if errorlevel 1 pause
