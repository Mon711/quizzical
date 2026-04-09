# Quizzical

A fun and interactive quiz application built with React. Test your knowledge with randomly shuffled multiple-choice questions fetched from the Open Trivia Database.

## Features

- 🎯 **Dynamic Quiz Loading** - Fetches fresh trivia questions from the Open Trivia Database API
- 🔀 **Randomized Answers** - Uses Fisher-Yates shuffle algorithm to randomize answer placement
- ✨ **Visual Feedback** - Shows which answers are correct/incorrect after submission
- 📊 **Score Tracking** - Displays final score with option to play again
- 🎨 **Modern UI** - Clean, responsive design with animated blob effects
- ⚡ **Fast Development** - Built with Vite for rapid development and optimized builds

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **he** - HTML entity decoder for API responses
- **ESLint** - Code quality

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

Install dependencies:

```bash
npm install
```

### Development

Run the development server with hot module reloading:

```bash
npm run dev
```

The app will start at `http://localhost:5173` (or another available port).

### Build

Create an optimized production build:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

## How to Use

1. Click **"Start quiz"** to begin
2. Answer all 5 questions by selecting one answer per question
3. Click **"Check answers"** to submit (button is disabled until all questions are answered)
4. View your score and see which answers were correct/incorrect
5. Click **"Play again"** to take another quiz with fresh questions

## Project Structure

```
src/
├── App.jsx           # Main component with quiz logic and API calls
├── Question.jsx      # Individual question component
└── main.jsx          # Entry point
```

## API Details

Questions are fetched from the [Open Trivia Database](https://opentdb.com/):
- **Category**: Computer Science
- **Difficulty**: Medium
- **Type**: Multiple Choice
- **Amount**: 5 questions per quiz

## Key Implementation Details

- **Shuffle Algorithm**: Implements the Fisher-Yates (Knuth) shuffle for true randomization
- **HTML Decoding**: Uses the `he` library to decode HTML entities from API responses
- **State Management**: Uses React hooks (useState, useEffect) for state and side effects
- **Force Re-render**: Quiz round counter ensures component keys change for fresh state each round

## License

This project is part of the Scrimba Fullstack learning path.
