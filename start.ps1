# start.ps1 — Quick launcher for AtlasX Website
Write-Host "`n========================================================" -ForegroundColor Cyan
Write-Host "  AtlasX Website — Local Development Server" -ForegroundColor Cyan
Write-Host "========================================================`n" -ForegroundColor Cyan

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Node.js is not found on your system PATH." -ForegroundColor Red
    Write-Host "Please install Node.js 18+ from https://nodejs.org" -ForegroundColor Yellow
    exit 1
}

if (-not (Test-Path "node_modules")) {
    Write-Host "[1/2] Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] npm install failed." -ForegroundColor Red
        exit 1
    }
}

Write-Host "[2/2] Starting local web server..." -ForegroundColor Green
Write-Host "Local:   http://localhost:5173" -ForegroundColor Cyan
Write-Host "Network: Access on phone/tablet on same Wi-Fi using your local IP`n" -ForegroundColor Gray
npm run dev
