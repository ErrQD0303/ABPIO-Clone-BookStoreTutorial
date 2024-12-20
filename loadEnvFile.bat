set "envFile=.env"

for /f "usebackq tokens=1,* delims==" %%a in ("%envFile%") do (
    set %%a=%%b
)