# Guess Who - Solo Game

A modern, browser-based solo version of the classic Guess Who game built with Next.js. Load different character profiles and play with various persona sets.

## 🎮 Features

- **Multiple Profile Sets**: Load different themed character sets with unique personas
- **Customizable Characters**: Each profile set defined via JSON configuration
- **Solo Gameplay**: Single-player experience against the computer
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Automatic theme switching based on system preferences

## 📁 Project Structure

```
guess-who/
├── app/                    # Next.js App Router pages and components
├── components/             # Reusable React components
├── lib/                    # Utility functions and services
├── types/                  # TypeScript type definitions
├── public/
│   ├── data/
│   │   └── profiles/       # Character profile JSON configurations
│   └── images/
│       └── profiles/       # Character images organized by profile
│           └── [profile-name]/ # Images for each profile set
└── ...
```

### Profile Organization
- **Configuration**: `public/data/profiles/[profile-name].json` - Character data and schema definitions
- **Images**: `public/images/profiles/[profile-name]/` - Character portraits and assets
- **Environment**: `.env.local` - Profile selection via `NEXT_PUBLIC_GAME_PROFILE`

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
# or
yarn build
# or
pnpm build
# or
bun build
```

Run the production server:
```bash
npm run start
# or
yarn start
# or
pnpm start
# or
bun start
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
# or
yarn lint
# or
pnpm lint
# or
bun lint
```

## 🎯 How to Play

1. Select a character profile set from the available options
2. The computer randomly selects a mystery character
3. Ask yes/no questions about character attributes to narrow down possibilities
4. Eliminate characters that don't match the answers
5. Make your guess when you think you know the mystery character
6. Try to guess in as few questions as possible!

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

### ✅ Character Management System

The game includes a comprehensive character management system with the following features:

1. **Smart Profile Loading System** 
   - Automatic path resolution based on `.env` configuration
   - JSON file loading: `public/data/profiles/{PROFILE}.json`
   - Image path resolution: `public/images/profiles/{PROFILE}/`
   - Profile caching for performance

2. **Flexible JSON Structure**
   - Extensible characteristic schema per profile
   - Type-safe character definitions
   - Support for different characteristic types (boolean, enum, range, etc.)
   - Profile metadata and versioning

3. **Advanced Game Logic**
   - Smart character filtering based on questions
   - Question suggestion engine with effectiveness scoring
   - Game state management
   - Automatic question optimization

4. **Type Safety & Validation**
   - Complete TypeScript interfaces
   - Zod schema validation for runtime safety
   - Comprehensive error handling
   - Development-friendly validation warnings

### 📦 Key Classes

- **ProfileLoader**: Environment integration, path resolution, caching, validation
- **CharacterFilter**: Smart filtering, question engine, game logic utilities
- **GameValidation**: Runtime validation with Zod schemas

### 🎮 Demo Features

The included ProfileDemo component demonstrates:
- ✅ Profile loading and switching
- ✅ Character filtering in real-time  
- ✅ Question suggestion engine
- ✅ Game state management
- ✅ Effectiveness scoring
- ✅ Win/lose conditions

## 🛠️ Tech Stack

- **Framework**: [Next.js 15.4](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **React**: [React 19](https://react.dev/)
- **Development**: Turbopack for fast builds
- **Font**: Geist Sans & Geist Mono

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)