## Divy UI

Sample React component library project built with TypeScript, Tailwind CSS, class-variance-authority and testing with Vitest/Jest.

### Installation

```js
npm install divy-ui

```

### Usage

1. Import the styles in your main application file:

```js
import "divy-ui/styles.css";
```

2. Import and use components:

```js
import { Button } from "divy-ui";

function App() {
  return <Button>Click me</Button>;
}
```

### Features

- Built with Tailwind CSS for modern, utility-first styling
- Written in TypeScript for better type safety
- Efficient styling with class-variance-authority and tailwind-merge
- Storybook documentation for component exploration
- Comprehensive test coverage with Vitest/Jest

### Components

### Available Components

- Button
- Input

### Coming Soon

- Card
- Radio

### Development

### Prerequisites

```js
Node.js >= 18;
npm >= 9;
```

### Setup

1. Clone the repository

```js
git clone https://github.com/yourusername/divy-ui.git
cd divy-ui

```

2. Install dependencies

```js
npm install

```

3. Create TypeScript build configuration
   Create a `tsconfig.build.json` file in your project root:

```js
{
  "extends": "./tsconfig.app.json",
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "./dist",
    "emitDeclarationOnly": true,
    "noEmit": false,
    "outDir": "./dist",
    "moduleResolution": "node",
    "allowImportingTsExtensions": false
  },
  "include": ["lib/**/*"],
  "exclude": [
    "public",
    "types",
    "node_modules",
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/*.stories.tsx",
    "./src/setupTests.ts"
  ]
}

```

This configuration ensures that only the component source files are included in the build, excluding test files, stories, and other development-only files.
Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run storybook` - Start Storybook server
- `npm run lint` - Run linting

### Tech Stack

React
TypeScript
Vite
Tailwind CSS
class-variance-authority
tailwind-merge
Storybook
Vitest/Jest

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
