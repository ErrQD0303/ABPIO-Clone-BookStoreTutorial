@echo off
setlocal enabledelayedexpansion
call ./loadEnvFile.bat

set CWP=%cd%
cd %ANGULAR_PATH%
docker rm -f %ANGULAR_CONTAINER_NAME%

set PARAMS=
:loop
if "%~1" neq "" (
    set PARAMS=%PARAMS% %1
    shift
    goto loop
)
docker build %PARAMS% -t %ANGULAR_IMAGE% .
cd %CWP%
endlocal