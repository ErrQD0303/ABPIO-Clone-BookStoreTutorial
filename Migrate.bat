@echo off
setlocal enabledelayedexpansion
call ./loadEnvFile.bat

set CWP=$pwd
cd %SRC_PATH%
cd %PROJECT_PREFIX%DbMigrator
dotnet run
cd %CWP%
endlocal