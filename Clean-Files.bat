@echo off
setlocal enabledelayedexpansion
call ./loadEnvFile.bat

set CWP=%cd%
abp clean
cd %ANGULAR_PATH%
rm -r node_modules
cd %CWP%
endlocal