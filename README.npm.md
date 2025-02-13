## Divy UI

Sample lightweight UI library built with Vite, React and Tailwind CSS.

### Installation

```js
npm install divy-ui
```

### Quick Start

1. Import styles:

```js
import "divy-ui/styles.css";
```

2. Use components:

```js
import { Button } from "divy-ui";

function App() {
  // Basic usage
  return <Button>Click me</Button>;

  // The Button component comes with customization options:
  return (
    <>
      {/* Different variants */}
      <Button variant="solid">Solid Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="ghost">Ghost Button</Button>

      {/* Color variants */}
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success">Success</Button>
      <Button color="danger">Danger</Button>

      {/* Loading state */}
      <Button isLoading>Loading...</Button>
      {/* Sizes */}
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>

      {/* With custom icon */}
      <Button icon={<YourIcon />}>With Icon</Button>
    </>
  );
}
```

### Available Components

- Button
- Input
- Card (Coming Soon)
- Radio (Coming Soon)

### Features

Built with Tailwind CSS
TypeScript support
Flexible component variants
Lightweight and performant

### Documentation

Full documentation and examples available on [GitHub repository](https://github.com/joujou144/divy-ui).
License
MIT
