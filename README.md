# Kids Games Platform

A modern, browser-based gaming platform for kids featuring multiple fun games with beloved cartoon characters. Built with Next.js and featuring a shared character system across all games.

## 🎮 Features

### 🎯 Multiple Games Available
- **Qui est-ce? (Guess Who)**: Classic guessing game - ask questions to find the hidden character
- **Mémo (Memory Game)**: Match pairs of character cards to test your memory
- **Game Selection Hub**: Easy-to-use interface to choose between available games

### 🌟 Shared Character System
- **Unified Character Profiles**: Same beloved cartoon characters used across all games
- **Consistent Experience**: Familiar characters provide continuity between games
- **Profile Management**: Centralized character loading and caching system
- **Extensible Design**: Easy to add new character sets that work with all games

### 🎨 Kid-Friendly Design
- **Intuitive Interface**: Simple, colorful design perfect for children
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **French Language**: All games available in French for young French speakers
- **Visual Feedback**: Engaging animations and celebrations

## 📁 Project Structure

```
kids-games-platform/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Game selection hub
│   ├── qui-est-ce/        # Guess Who game pages
│   └── memo/              # Memory game pages
├── components/            # React components
│   ├── shared/            # Shared components (GameLayout, PageWrapper, etc.)
│   ├── games/
│   │   ├── guess-who/     # Guess Who game components
│   │   └── memo/          # Memory game components
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
│   ├── shared/            # Shared hooks
│   └── games/             # Game-specific hooks
├── lib/                   # Utility functions and services
│   ├── profileLoader.ts   # Shared character profile system
│   ├── games/             # Game-specific logic
│   └── constants/         # Game and platform constants
├── types/                 # TypeScript type definitions
├── public/
│   ├── data/
│   │   └── profiles/      # Character profile JSON configurations
│   └── images/
│       ├── logo/          # Game and platform logos
│       └── profiles/      # Character images organized by profile
│           └── cartoon-characters/ # Current character set
└── ...
```

### Shared Profile System
- **Configuration**: `public/data/profiles/cartoon-characters.json` - Character data and schema definitions
- **Images**: `public/images/profiles/cartoon-characters/` - Character portraits and assets
- **ProfileLoader**: Centralized system that loads character data for all games
- **Cross-Game Compatibility**: Same characters work seamlessly in both games
- **Environment**: Optional `NEXT_PUBLIC_GAME_PROFILE` override (defaults to 'cartoon-characters')

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/guess-who.git
cd guess-who
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Development

Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the game.

### Building for Production

Create an optimized production build:
```bash
npm run build
```

Run the production server:
```bash
npm run start
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## 🎯 How to Play

### 🏠 Game Selection
1. Open the app to see the game selection hub
2. Choose between **Qui est-ce?** and **Mémo** games
3. Each game uses the same beloved cartoon characters

### 🔍 Qui est-ce? (Guess Who)
1. The computer randomly selects a mystery character
2. Ask yes/no questions about character attributes (hair color, age, species, etc.)
3. Characters that don't match the answer are eliminated
4. Use the question builder to construct smart questions
5. Make your guess when you think you know the mystery character
6. Try to guess in as few questions as possible!

### 🧠 Mémo (Memory Game)
1. Choose your difficulty level (number of character pairs)
2. Character cards are shuffled and placed face-down
3. Click on cards to flip them and reveal the characters
4. Find matching pairs of the same character
5. Matched pairs stay visible
6. Complete the game by finding all pairs with the fewest moves!

## 🎨 Adding Custom Profiles

Create your own character sets by adding new profile configurations:

1. Create a new JSON file: `public/data/profiles/[your-profile-name].json`
2. Define the profile structure with characteristics schema and characters:

```json
{
  "id": "your-profile-name",
  "name": "Profile Name",
  "description": "Profile description",
  "version": "1.0.0",
  "characteristicSchema": {
    "hairColor": {
      "type": "enum",
      "displayName": "Hair Color",
      "values": ["brown", "blonde", "black", "red"],
      "category": "appearance"
    },
    "hasGlasses": {
      "type": "boolean",
      "displayName": "Wears Glasses",
      "category": "appearance"
    }
  },
  "characters": [
    {
      "id": "char_001",
      "name": "Character Name",
      "image": "character1.jpg",
      "characteristics": {
        "hairColor": "brown",
        "hasGlasses": true
      }
    }
  ]
}
```

3. Add character images to `public/images/profiles/[your-profile-name]/`
4. Update `.env.local` with `NEXT_PUBLIC_GAME_PROFILE=[your-profile-name]` to load your profile

## 🏗️ Architecture & Features

### ✅ Shared Character Management System

The platform features a unified character management system that powers all games:

1. **Centralized ProfileLoader System**
   - Single source of truth for character data across all games
   - Automatic profile loading and caching for performance
   - Cross-game character consistency
   - JSON file loading: `public/data/profiles/cartoon-characters.json`
   - Image path resolution: `public/images/profiles/cartoon-characters/`
   - Error handling and validation

2. **Cross-Game Character Schema**
   - Extensible characteristic schema supports different game types
   - Type-safe character definitions work for both guessing and memory games
   - Rich character attributes: appearance, demographics, personality traits
   - Profile metadata and versioning for future expansion

3. **Game-Specific Logic Built on Shared Data**
   - **Guess Who**: Smart character filtering, question suggestion engine, effectiveness scoring
   - **Memory Game**: Character pair generation, shuffling algorithms, match validation
   - **Shared**: Game state management, progress tracking, celebration systems

4. **Type Safety & Validation**
   - Complete TypeScript interfaces for all games
   - Zod schema validation for runtime safety
   - Comprehensive error handling across games
   - Development-friendly validation warnings

### 📦 Key System Components

- **ProfileLoader**: Centralized profile loading, caching, and validation for all games
- **CharacterFilter**: Guess Who game filtering and question engine
- **MemoGame Logic**: Memory game card generation and matching logic
- **Shared Hooks**: Cross-game performance rating and state management
- **GameValidation**: Runtime validation with Zod schemas

### 🎮 Multi-Game Features

The platform demonstrates:
- ✅ Shared character profiles across multiple game types
- ✅ Consistent character rendering and display
- ✅ Cross-game navigation and state management
- ✅ Unified celebration and feedback systems
- ✅ Performance optimization through profile caching
- ✅ Responsive design optimized for all games

## 🛠️ Tech Stack

- **Framework**: [Next.js 15.4](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) with strict mode
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom design system
- **React**: [React 19](https://react.dev/) with modern hooks and patterns
- **Animation**: [Framer Motion](https://www.framer.com/motion/) for smooth game interactions
- **Validation**: [Zod](https://zod.dev/) for runtime type safety
- **Development**: Turbopack for fast development builds
- **Font**: Geist Sans & Geist Mono for optimal readability

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)