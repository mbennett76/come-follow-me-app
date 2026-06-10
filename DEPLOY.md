# How to Deploy Come Follow Me App to GitHub Pages
# =====================================================
# These are plain-English steps. Follow them in order.
# Takes about 10 minutes total.

---

## WHAT YOU NEED FIRST
- A GitHub account (you already have mbennett76)
- Node.js installed on your computer
  → Check by opening Terminal and typing: node --version
  → If you get a number like v18.x.x you're good
  → If not, download it free at: https://nodejs.org (click "LTS" version)

---

## STEP 1 — Create the GitHub repo

1. Go to https://github.com/new
2. Repository name: come-follow-me-app
3. Set to Public
4. Check "Add a README file"
5. Click green "Create repository" button

---

## STEP 2 — Open Terminal on your computer

  Mac: Press Cmd+Space, type "Terminal", press Enter
  Windows: Press Windows key, type "cmd", press Enter

---

## STEP 3 — Unzip and move the project folder

Unzip the file you downloaded from Claude.
You should now have a folder called: come-follow-me-app

Move that folder to your Desktop (easiest) or Documents.

---

## STEP 4 — Navigate to the folder in Terminal

Type this (replacing "YourName" with your actual Mac username):

  Mac:
    cd ~/Desktop/come-follow-me-app

  Windows:
    cd C:\Users\YourName\Desktop\come-follow-me-app

Press Enter.

---

## STEP 5 — Install the project

Type this and press Enter:

  npm install

Wait for it to finish. You'll see a lot of text scroll by — that's normal.
It's done when you see your cursor (>) again.

---

## STEP 6 — Connect to your GitHub repo

Type each line and press Enter after each one:

  git init
  git remote add origin https://github.com/mbennett76/come-follow-me-app.git
  git add .
  git commit -m "First commit"
  git push -u origin main

If it asks for your GitHub username and password:
  - Username: mbennett76
  - Password: use a Personal Access Token (see NOTE below)

NOTE — Getting a Personal Access Token:
  1. Go to https://github.com/settings/tokens
  2. Click "Generate new token (classic)"
  3. Give it any name, check the "repo" checkbox
  4. Click "Generate token"
  5. COPY IT NOW (you can't see it again)
  6. Paste it as your "password" in Terminal

---

## STEP 7 — Deploy to GitHub Pages

Type this and press Enter:

  npm run deploy

Wait for it to say "Published". Takes about 30 seconds.

---

## STEP 8 — Turn on GitHub Pages

1. Go to https://github.com/mbennett76/come-follow-me-app
2. Click "Settings" tab
3. Click "Pages" in the left menu
4. Under "Branch" — select "gh-pages" from the dropdown
5. Click Save

---

## STEP 9 — Wait 3 minutes, then visit your app

  https://mbennett76.github.io/come-follow-me-app/

---

## UPDATING THE APP IN THE FUTURE

Every time Claude gives you a new version of App.jsx:
1. Replace src/App.jsx with the new file
2. Open Terminal in the project folder
3. Run these three commands:

  git add .
  git commit -m "Update app"
  git push
  npm run deploy

Done!

---

## PROBLEMS?

If you see a blank white page:
  → Wait 5 more minutes and refresh

If you see a 404 error:
  → Make sure Step 8 was done (gh-pages branch selected)

If "npm run deploy" fails:
  → Run "npm install" first, then try again

