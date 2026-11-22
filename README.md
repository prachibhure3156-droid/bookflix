# BookFlix

A full-stack, Netflix-inspired reading and vocabulary-learning platform.

## Stack
- Frontend: React, Vite, React Router, plain CSS
- Backend: Node.js, Express
- Database: SQLite (`better-sqlite3`)
- Authentication: JWT + bcryptjs
- Book discovery: Open Library API
- Dictionary: Free Dictionary API

## Requirements
- Node.js 18 or newer
- npm

## Run locally
Open a terminal in the `BookFlix` folder:

```bash
npm install
npm run install:all
```

Create `server/.env` by copying `server/.env.example`, then optionally change the JWT secret.

Start both apps:

```bash
npm run dev
```

- Frontend: the Vite URL shown in your terminal (usually http://localhost:5173; it may be 5174 or 5175 if the default port is busy)
- Backend: http://localhost:5000
- API health: http://localhost:5000/api/health

You can also run them separately:
```bash
npm run dev --prefix server
npm run dev --prefix client
```

## First use
Register using the Sign up page. Your account, saved words, reviews and reading progress are stored in the local SQLite database (`server/database/bookflix.db`).

## Included features
- Register, sign in and sign out
- Home page with featured and discoverable books
- Search books using Open Library
- Personal library and saved books
- Reader view with sample text and reading progress tracking
- Continue reading and completed-book status
- Vocabulary lookup with definition, synonyms and antonyms
- Save words with Easy / Medium / Hard difficulty
- Flashcards with reveal and next-card controls
- Reading dashboard, streak and progress history
- Book reviews and ratings
- Responsive layout and light/dark theme toggle

## Notes
- Open Library and dictionary features require an internet connection.
- Some Open Library editions do not provide readable full text. In that case, the reader shows a clearly labelled sample reading view.
- This is an educational project starter, not a commercial publishing platform. Only upload or distribute books you have permission to use.


## Added features
- Full-year Hobby Tracker calendar. Select a hobby and click any date to save or remove an activity; entries are stored per account in SQLite.
- Word Search dictionary lookup with definitions, synonyms, antonyms and save-to-flashcards.
- Word-by-word quiz games: General Knowledge, Word Knowledge and Author Knowledge.
- Reader page numbers, previous/next page controls and saved reading progress.
- Book ratings and reviews stored by book and account, with average rating display.
- Discover search supports Enter or the Search button and displays empty/error states.
- My Library includes a Read filter for completed books.

## Windows setup
Extract the ZIP. Open the extracted folder containing `package.json` in VS Code. In the VS Code terminal run:

```powershell
npm install
npm run install:all
Copy-Item server\.env.example server\.env
npm run dev
```

Keep the terminal running. Open the Vite URL shown in your terminal (usually http://localhost:5173; it may be 5174 or 5175 if the default port is busy) in your browser.
