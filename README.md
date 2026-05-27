# USTP SmartVote — Web Frontend

React web app for the USTP SmartVote student election system with face biometric verification.

## Deployment

| Platform | URL |
|----------|-----|
| Web App (Vercel) | https://it-323-app-dev-smart-vote-ui.vercel.app/ |
| Backend API | https://it323-appdev-smartvote-fastapi.onrender.com |

## Tech Stack

| | |
|-|-|
| Framework | React 19, Vite |
| Routing | React Router v6 |
| HTTP | Axios |
| Deployment | Vercel |

## Features

- Student registration and login with email + face verification
- Admin login (no face verification required)
- Cast votes per position (President, VP, Secretary, Treasurer, Auditor)
- View live election results
- Admin dashboard — voter turnout, candidate tallies, voter log
- Manage candidates and election settings (open/close)

## Local Development

```bash
npm install
npm run dev
```

The app connects to `http://127.0.0.1:8001/api` by default.

To point to the deployed backend instead, create a `.env.local` file:

```
VITE_API_URL=https://it323-appdev-smartvote-fastapi.onrender.com/api
```

## Deployment (Vercel)

1. Connect this repository to Vercel
2. Set the root directory to this folder
3. Add environment variable:
   - `VITE_API_URL` → `https://it323-appdev-smartvote-fastapi.onrender.com/api`
4. A `vercel.json` is included for SPA routing support

## Group Members

- Nepthalie Brynt R. Asinero
- Dan Ivan E. Labin
- Christian Paul L. Bahian
- Ronald E. Yu

## Course

IT323 - Application Development and Emerging Technologies