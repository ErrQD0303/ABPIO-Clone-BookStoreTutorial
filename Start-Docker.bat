@echo off
setlocal enabledelayedexpansion
call ./loadEnvFile.bat
start "" %DOCKER_PATH%

:waitForDocker
tasklist /fi "imagename eq Docker*" 2>NUL | findstr /i "docker" >NUL

if errorlevel 1 (
    timeout /t 2 >NUL
    goto waitForDocker
)

wsl -d Ubuntu -e sh -c "cd ~/docker-repos/my-postgres && docker-compose up -d && docker run -d --name %ANGULAR_CONTAINER_NAME% -p %ANGULAR_PORT%:80 %ANGULAR_IMAGE%"
endlocal