@echo off
setlocal enabledelayedexpansion
call ./loadEnvFile.bat

if "%~1" == "" (
    echo Usage: Add-Migrations MigrationName
    exit /b
)

set CWP=$pwd
cd %SRC_PATH%
cd %PROJECT_PREFIX%EntityFrameworkCore
set "command=dotnet ef migrations add"
:loop
if not "%~1" == "" (
    set "command=%command% %~1"
    shift
    goto loop
)
%command%
cd %CWP%
endlocal