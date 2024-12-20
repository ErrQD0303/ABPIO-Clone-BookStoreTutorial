@echo off
setlocal enabledelayedexpansion
call ./loadEnvFile.bat

set CWP=$pwd
cd %ANGULAR_PATH%
docker build -t %ANGULAR_IMAGE% .
cd %CWP%
endlocal