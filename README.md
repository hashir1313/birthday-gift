# Birthday Gift

An interactive birthday celebration web app that simulates a "system update" experience — installing wisdom, creativity, and luck before revealing a personalized birthday dashboard.

## Features

- **Installation Flow** — 15-step progress simulation with fake errors and status messages
- **Level Up Screen** — Confetti celebration with continue button
- **Dashboard** — Staggered reveal of player card, achievements, birthday message, and system stats
- **Sound Effects** — Web Audio API synth sounds for startup, completion, errors, and level-up
- **Responsive** — Works on mobile and desktop

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Canvas Confetti
- Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── UpdateScreen.tsx      # Installation progress flow
│   ├── LevelUpScreen.tsx     # Celebration screen with confetti
│   ├── ProgressCircle.tsx    # SVG circular progress indicator
│   ├── StatusMessage.tsx     # Animated status/error messages
│   ├── PlayerCard.tsx        # Birthday person's profile card
│   ├── AchievementCard.tsx   # Locked/unlocked achievements grid
│   ├── BirthdayMessage.tsx   # Personal birthday message
│   ├── SystemStatus.tsx      # Stat bars and birthday badge
│   └── RestartButton.tsx     # Replay button
├── lib/
│   ├── progressSteps.ts      # Step definitions (messages, targets, errors)
│   └── sounds.ts             # Web Audio API sound effects
├── App.tsx                   # Phase state machine (installing → levelup → dashboard)
├── main.tsx                  # Entry point
└── index.css                 # Global styles
```

## How It Works

1. **Installing Phase** — Runs through 15 steps (0% → 100%) with 5% increments, each taking 3-5 seconds. Two steps trigger fake errors for comedic effect.
2. **Level Up Phase** — Fires confetti 4 times, plays a sound, and waits for user to click Continue.
3. **Dashboard Phase** — Components reveal sequentially with staggered animations over ~5 seconds.

## Customization

- Edit `src/lib/progressSteps.ts` to change installation messages and targets
- Edit `src/components/PlayerCard.tsx` to personalize the birthday person's info
- Edit `src/components/BirthdayMessage.tsx` to change the birthday message
- Edit `src/components/AchievementCard.tsx` to add/remove achievements
