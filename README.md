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
├── profiles/              # Character profile configurations
│   └── [profile-name]/    # Individual profile sets (JSON files)
├── public/
│   └── profiles/          # Character images
│       └── [profile-name]/ # Images for each profile set
└── ...
```

### Profile Organization
- **Configuration**: `profiles/[profile-name]/characters.json` - Character data and attributes
- **Images**: `public/profiles/[profile-name]/` - Character portraits and assets

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

Create your own character sets by adding new profile directories:

1. Create a new directory in `profiles/[your-profile-name]/`
2. Add a `characters.json` file with the following structure:

```json
{
  "name": "Profile Name",
  "description": "Profile description",
  "characters": [
    {
      "id": "char1",
      "name": "Character Name",
      "image": "character1.jpg",
      "attributes": {
        "hairColor": "brown",
        "glasses": true,
        "gender": "male",
        // ... more attributes
      }
    }
    // ... more characters
  ]
}
```

3. Add character images to `public/profiles/[your-profile-name]/`
4. The profile will automatically appear in the game's profile selection

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