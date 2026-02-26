# ============================================================
# start.ps1 — Démarre le backend ET le frontend Buzzer Beater
# Usage : clic droit → "Exécuter avec PowerShell"
#         ou : powershell -ExecutionPolicy Bypass -File start.ps1
# ============================================================

$NODE = "C:\Program Files\nodejs"
$BACKEND  = Join-Path $PSScriptRoot "map_bb\backend_map"
$FRONTEND = Join-Path $PSScriptRoot "map_bb\frontend_map"

# Vérifie que Node.js est installé
if (-not (Test-Path "$NODE\node.exe")) {
    Write-Host "ERREUR : Node.js introuvable dans $NODE" -ForegroundColor Red
    Write-Host "Installe Node.js depuis https://nodejs.org" -ForegroundColor Yellow
    pause
    exit 1
}

# Vérifie le fichier .env du frontend
$envFile = Join-Path $FRONTEND ".env"
if (-not (Test-Path $envFile)) {
    Write-Host ""
    Write-Host "ATTENTION : Fichier .env manquant !" -ForegroundColor Yellow
    Write-Host "Crée le fichier : $envFile" -ForegroundColor Yellow
    Write-Host "Avec le contenu : VITE_MAPBOX=ton_token_mapbox" -ForegroundColor Yellow
    Write-Host "(Récupère ton token sur https://account.mapbox.com)" -ForegroundColor Cyan
    Write-Host ""
    $rep = Read-Host "Continuer sans le token ? (la map ne s'affichera pas) [o/N]"
    if ($rep -ne 'o' -and $rep -ne 'O') { exit 1 }
}

Write-Host ""
Write-Host "Démarrage du backend  (port 3000)..." -ForegroundColor Cyan
Start-Process "powershell" -ArgumentList "-NoExit", "-Command", `
    "& { `$env:PATH = '$NODE;' + `$env:PATH; Set-Location '$BACKEND'; node index.js }" `
    -WindowStyle Normal

Start-Sleep -Seconds 2

Write-Host "Démarrage du frontend (port 5173)..." -ForegroundColor Cyan
Start-Process "powershell" -ArgumentList "-NoExit", "-Command", `
    "& { `$env:PATH = '$NODE;' + `$env:PATH; Set-Location '$FRONTEND'; npm run dev }" `
    -WindowStyle Normal

Start-Sleep -Seconds 3

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "  Buzzer Beater est en cours de démarrage" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host "  Site statique : http://localhost:3000"   -ForegroundColor White
Write-Host "  Map (React)   : http://localhost:5173"   -ForegroundColor White
Write-Host "  Ouvre : http://localhost:3000/bb_menu.html" -ForegroundColor Yellow
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Appuie sur Entrée pour fermer cette fenêtre..."
Read-Host
