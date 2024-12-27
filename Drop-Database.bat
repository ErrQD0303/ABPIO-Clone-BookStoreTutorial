@echo off
setlocal enabledelayedexpansion
call ./loadEnvFile.bat

set CWP=$pwd
cd %SRC_PATH%
cd %PROJECT_PREFIX%EntityFrameworkCore
set "command=dotnet ef database drop"
:loop
if not "%~1" == "" (
    set "command=%command% %~1"
    shift
    goto loop
)
%command%
cd %CWP%
endlocal