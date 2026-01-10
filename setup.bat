@echo off
echo.
echo ================================
echo FutureEdge Academy - First Time Setup
echo ================================
echo.

REM Check if backend .env exists
if not exist "backend\.env" (
    echo Creating backend/.env...
    (
        echo OPENAI_API_KEY=sk-your_openai_api_key_here
        echo PORT=3001
        echo NODE_ENV=development
        echo FRONTEND_URL=http://localhost:5173
    ) > backend\.env
    echo ✓ Created backend/.env
    echo.
    echo ⚠️  IMPORTANT: Edit backend/.env and add your OpenAI API key!
    echo.
) else (
    echo ✓ backend/.env already exists
)

REM Check if root .env exists
if not exist ".env" (
    echo Creating .env...
    echo VITE_API_BASE_URL=http://localhost:3001 > .env
    echo ✓ Created .env
) else (
    echo ✓ .env already exists
)

echo.
echo ================================
echo Setup Complete!
echo ================================
echo.
echo Next steps:
echo 1. Edit backend/.env and add your OpenAI API key
echo 2. Run: npm run dev
echo 3. Open: http://localhost:5173
echo.
pause
