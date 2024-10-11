# Mafia

A web app designed to facilitate in-person games of Mafia, built with a modern stack using Vite, React, Mantine UI, Tailwind CSS, TypeScript, Node.js, Express, WebSockets, Google Gemini API, and Google Cloud API for Text-to-Speech (TTS).

## Overview

Mafia is a popular party game where players are assigned roles and work to eliminate others while deducing each other's identities. Our web app enhances the Mafia experience by automating the role assignment, game narration, and more, so you can focus on the fun!

### Key Features

- **Role Assignment**: Easily assign roles like Mafia, Town, Medic, and Sheriff (with more roles coming soon).
- **Automated Narration**: No need for a human narrator! Google Gemini generates stories to narrate the events of each night based on a selected or custom theme.
- **Customizable Game Settings**: Adjust discussion time, night duration, number of Mafia members, and more to suit your group's preferences.
- **Interactive Lobby**: Players can join a lobby to start a game, making it easy for everyone to participate.

## Tech Stack

- **Frontend**: Vite, React, Mantine UI, Tailwind CSS, TypeScript
- **Backend**: Node.js, Express, WebSockets
- **APIs**: Google Gemini API for story generation, Google Cloud API for Text-to-Speech (TTS)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)

## Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd mafia-game-facilitator/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The frontend will be running at `http://localhost:3000`.

## Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd mafia-game-facilitator/backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm run start
   ```

   The backend server will be running at `http://localhost:5000`.

## Environment Variables

Make sure to create a `.env` file in both the `frontend` and `backend` directories and we'll figure it out soon.

<!-- **For the frontend (`frontend/.env`):**

   ```makefile
   VITE_GEMINI_API_KEY=your-google-gemini-api-key
   VITE_TTS_API_KEY=your-google-cloud-tts-api-key
   ```

**For the backend (`backend/.env`):**

   ```makefile
   API_KEY=your-google-cloud-api-key
   ``` -->

## Features in Development

- **Everything**: It'll be deployed eventually.

## Contact

For any inquiries watch the videos

- YouTube: CottonVelvet

