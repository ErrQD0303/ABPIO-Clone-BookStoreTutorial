@echo off
setlocal enabledelayedexpansion
call ./loadEnvFile.bat

set CWP=$pwd
cd %SRC_PATH%
cd %PROJECT_PREFIX%HttpApi.Host
dotnet run
cd %CWP%
endlocal