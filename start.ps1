# start.ps1 — Quick launcher for AtlasX Website
Write-Host "`n========================================================" -ForegroundColor Cyan
Write-Host "  AtlasX Website — Local Development Server" -ForegroundColor Cyan
Write-Host "========================================================`n" -ForegroundColor Cyan

# Check if node is already on PATH
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    # Check known local paths
    $candidatePaths = @(
        "$env:USERPROFILE\tools\node-v20.18.0-win-x64",
        "C:\Users\valiy\tools\node-v20.18.0-win-x64",
        "$env:USERPROFILE\tools\nodejs",
        "C:\Program Files\nodejs",
        "C:\Program Files (x86)\nodejs",
        "$env:LOCALAPPDATA\Programs\node"
    )

    foreach ($p in $candidatePaths) {
        if (Test-Path (Join-Path $p "node.exe")) {
            $env:PATH = "$p;$env:PATH"
            break
        }
    }
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Node.js is not found on your system." -ForegroundColor Red
    Write-Host "Please install Node.js 18+ from https://nodejs.org`n" -ForegroundColor Yellow
    exit 1
}

$nodeVersion = node -v
Write-Host "[OK] Using Node.js $nodeVersion`n" -ForegroundColor Green

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
