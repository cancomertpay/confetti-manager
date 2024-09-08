# Confetti Manager

The **Confetti Manager** class is a powerful and customizable utility for generating various confetti effects on the canvas. It supports multiple styles of confetti like fireworks, stars, circles, squares, and more, and allows users to control the shapes, colors, velocity, and other configurations.

## Features

- **Customizable Effects**: Supports highly customizable confetti effects, allowing users to control colors, shapes, particle count, and more.
- **Predefined Effects**: Comes with predefined effects like `cannon`, `fireworks`, `snow`, and `pride`.
- **Infinite Confetti**: Run confetti effects in an infinite loop for a defined duration with interval control.
- **Custom Canvas Support**: Allows users to specify their own canvas element for the confetti effects.
- **Delayed Effects**: Supports delayed triggering of confetti effects.

## Installation

You can integrate this class into your project by copying the `Confetti` class and importing the necessary dependencies.

```bash
npm install confetti-manager
```

## Usage

### 1. Basic Usage

You can create a basic confetti effect with default options:

```typescript
import { Confetti } from 'confetti-manager';

const confetti = new Confetti();
confetti.cannon();
```

### 2. Custom Colors

You can pass an array of custom colors to the `cannon` method:

```typescript
confetti.cannon(['#FF0000', '#00FF00', '#0000FF']);
```

### 3. Custom Shapes

Confetti can also be generated with custom shapes:

```typescript
confetti.customShape(['star', 'circle', '🎉'], ['#FF0000', '#00FF00']);
```

### 4. Fireworks Effect

Trigger a fireworks effect with customizable duration:

```typescript
confetti.fireworks(['#FF0000', '#FFFF00'], { duration: 10000 });
```

### 5. Snow Effect

Trigger a slow-falling snow effect:

```typescript
confetti.snow();
```

### 6. Infinite Confetti

Run a confetti effect in an infinite loop for 5 seconds, triggering every 1 second:

```typescript
confetti.infinite('cannon', 1000, 5000);
```

### 7. Pride Effect

Trigger a pride-themed confetti effect with default rainbow colors:

```typescript
confetti.pride();
```

### 8. Custom Canvas

If you want to render confetti on a specific canvas, you can specify it:

```typescript
const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
confetti.customCanvas(canvas);
```

## Configuration Options

### `ConfettiOptions`

The `ConfettiOptions` interface allows you to control the behavior of the confetti effects:

- `colors` (string[]): An array of colors for the confetti.
- `particleCount` (number): The number of particles to launch.
- `spread` (number): The spread of the confetti in degrees.
- `startVelocity` (number): The initial velocity of the confetti particles.
- `gravity` (number): The gravitational pull on the confetti particles.
- `decay` (number): The decay rate of the confetti velocity.
- `ticks` (number): How long the confetti should last.
- `delay` (number): Delay in milliseconds before the effect starts.
- `scalar` (number): Scales the size of the confetti shapes.
- `angle` (number): The angle at which the confetti is launched.
- `origin` (object): The point on the canvas where the confetti originates.

## Available Methods

- `cannon(colors?: string[], options?: ConfettiOptions)`: Fires a basic confetti cannon.
- `randomDirection(colors?: string[], options?: ConfettiOptions)`: Fires confetti in random directions.
- `realistic(colors?: string[], options?: ConfettiOptions)`: Creates a realistic confetti burst effect.
- `fireworks(colors?: string[], options?: FireworksOptions)`: Creates a firework confetti effect.
- `snow(colors?: string[], options?: SnowOptions)`: Creates a slow-falling snow effect.
- `pride(colors?: string[], options?: PrideOptions)`: Creates a pride-themed confetti effect.
- `customShape(shapes: (Shape | string)[], colors?: string[], options?: ConfettiOptions)`: Fires confetti with custom shapes.
- `customCanvas(canvas: HTMLCanvasElement | null)`: Allows the user to specify a custom canvas element.
- `infinite(method: string, interval: number, duration: number, options?: ConfettiOptions)`: Runs the specified confetti effect in a loop.
