@echo off
REM =========================================================
REM  Script : init git + push kaam-store vers GitHub
REM  Repo   : https://github.com/youssefameziane2-arch/kaam-store
REM =========================================================

cd /d "D:\recup 830\Downloads\kaam-store"

REM 1. Copier le .gitignore (déjà déposé par Claude)
REM    (le .gitignore est déjà dans le dossier, déposé ci-dessus)

REM 2. Init git
git init

REM 3. Ajouter tous les fichiers (sauf ceux dans .gitignore)
git add .

REM 4. Vérifier ce qui sera commité (aucun .env.local ne doit apparaître)
echo === Fichiers stagés ===
git status

REM 5. Premier commit
git commit -m "feat: initial commit — kaam-store Next.js 14 e-commerce

Stack: Next.js 14 App Router, Prisma, PostgreSQL, NextAuth,
Stripe, PayPal, Cloudinary, Zustand, Tailwind CSS

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_013H5hxVAvpsV46ephiRrBVm"

REM 6. Renommer la branche en main
git branch -M main

REM 7. Ajouter le remote GitHub
git remote add origin https://github.com/youssefameziane2-arch/kaam-store.git

REM 8. Push
git push -u origin main

echo.
echo =========================================================
echo  Push termine ! Ouvre :
echo  https://github.com/youssefameziane2-arch/kaam-store
echo =========================================================
pause
