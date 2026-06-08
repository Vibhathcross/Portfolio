@echo off
title Launch Vibhath 3D Portfolio
echo ========================================================
echo   LAUNCHING VIBHATH'S IMMERSIVE 3D WEBGL PORTFOLIO
echo ========================================================
echo.
echo Starting WebGL Local Dev Server...
cd /d C:\Users\USER\.gemini\antigravity\scratch\vibhath-portfolio
start cmd /k "title WebGL Dev Server && npm run dev"
echo.
echo Waiting 5 seconds for server boot...
timeout /t 5 /nobreak > nul
echo.
echo Opening uplink command station in browser...
start http://localhost:3050
echo.
echo Launch sequence complete. Exiting launcher console.
exit
