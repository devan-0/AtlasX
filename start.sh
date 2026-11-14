#!/bin/sh
# start.sh — Quick launcher for macOS and Linux
echo "========================================================"
echo "  AtlasX Website — Local Development Server"
echo "========================================================"
echo ""

if ! command -v node >/dev/null 2>&1; then
    echo "[ERROR] Node.js is not installed."
    echo "Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

if [ ! -d "node_modules" ]; then
    echo "[1/2] Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "[ERROR] npm install failed."
        exit 1
    fi
fi

echo "[2/2] Starting local web server..."
echo ""
npm run dev
