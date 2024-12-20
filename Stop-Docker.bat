@echo off
setlocal enabledelayedexpansion
call ./loadEnvFile.bat

wsl -d Ubuntu -e sh -c "cd ~/docker-repos/my-postgres && docker-compose down && docker volume ls | xargs docker volume rm"
docker rm %ANGULAR_CONTAINER_NAME% -f
docker ps
@REM taskkill /f /im "com.docker*"
for /f "tokens=1" %%a in ('tasklist ^| findstr /i "docker"') do (
    echo Killing process: %%a
    taskkill /f /im "%%a" >nul 2>&1
)
taskkill /f /im "Docker*"
endlocal