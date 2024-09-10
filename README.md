# Fast Confetti

The **Fast Confetti** class provides a powerful and customizable way to create various confetti effects using `canvas-confetti`. It supports multiple styles of confetti like fireworks, stars, circles, squares, and more, and allows users to configure different attributes such as colors, particle count, velocity, and other options.

## Features

- **Customizable Effects**: Control the colors, shapes, particle count, velocity, gravity, and more for your confetti effects.
- **Predefined Effects**: Built-in effects like `cannon`, `fireworks`, `snow`, `pride`, and more.
- **Infinite Confetti**: Set up continuous confetti effects for a specific duration with adjustable intervals.
- **Custom Canvas Support**: Render confetti on a custom canvas element, allowing greater flexibility in UI design.
- **Smooth Reset**: Reset the confetti effects with options for either an instant reset or a smooth fade-out.

## Installation

```bash
npm install fast-confetti 
```

## Usage

### 1. Basic Usage

You can create a basic confetti effect with default options using the `cannon` method:

```typescript
import { Confetti } from './confetti';

const confetti = new Confetti();
confetti.cannon();
```

### 2. Custom Colors

You can specify an array of colors for your confetti effect:

```typescript
confetti.cannon({
  colors: ['#FF0000', '#00FF00', '#0000FF'],
});
```

### 3. Fireworks Effect

To trigger a firework-style confetti effect with custom options:

```typescript
confetti.fireworks({
  colors: ['#FF0000', '#FFFF00'],
  duration: 10000, // Runs for 10 seconds
});
```

### 4. Snow Effect

To create a snow-like confetti effect with slow-falling particles:

```typescript
confetti.snow({
  duration: 15000, // Runs for 15 seconds
});
```

### 5. Infinite Confetti

You can create an infinite confetti effect, repeating a method at specified intervals:

```typescript
confetti.infinite('cannon', 1000, 5000); // Runs for 5 seconds with 1-second intervals
```

### 6. Pride Effect

You can trigger a pride-themed confetti effect with rainbow colors:

```typescript
confetti.pride({
  duration: 15000,
});
```

### 7. Custom Canvas Support

To render the confetti on a specific canvas element:

```typescript
const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
confetti.customCanvas(canvas);
```

### 8. Reset Confetti

You can reset the confetti effects with two types of reset:

- **Instant Reset**: Immediately clears the confetti.
- **Smooth Reset**: Gradually fades out the confetti.

```typescript
confetti.reset('instant'); // Instant reset
confetti.reset('smooth', { duration: 2000 }); // Smooth reset over 2 seconds
```

## Configuration Options

### `ConfettiOptions`

The `ConfettiOptions` interface allows you to customize the behavior of the confetti effects:

- `colors`: An array of colors (hex or RGBA) for the confetti particles.
- `particleCount`: The number of confetti particles to generate.
- `spread`: The angle in degrees over which the confetti particles will spread.
- `startVelocity`: The initial velocity of the confetti particles.
- `gravity`: The gravitational force affecting the particles.
- `decay`: The rate at which the particle velocity decays over time.
- `ticks`: The duration (in frames) for which the confetti should last.
- `delay`: A delay (in milliseconds) before the effect is triggered.
- `scalar`: A scaling factor for the size of the confetti particles.
- `angle`: The launch angle for the confetti particles.
- `origin`: The starting position of the confetti on the canvas, represented as an object `{ x, y }`.

### `ResetOptions`

The `ResetOptions` interface provides additional configuration options for the smooth reset:

- `duration`: The time (in milliseconds) over which the confetti will fade out.
- `particleCount`: The number of particles during the fade-out.
- `ticks`: The lifespan of each confetti particle.
- `gravity`: The gravitational pull during the fade-out.
- `colors`: Colors for the particles during the reset.
- `shapes`: Shapes of the confetti particles during the reset.

## Available Methods

- **`custom(options?: ConfettiOptions)`**: Fires a highly customizable confetti effect, allowing users to control various parameters such as colors, shapes, and particle count.
- **`cannon(options?: ConfettiOptions)`**: Fires a basic confetti cannon effect.
- **`randomDirection(options?: ConfettiOptions)`**: Launches confetti particles in random directions.
- **`realistic(options?: ConfettiOptions)`**: Creates a realistic burst of confetti with multiple shots.
- **`fireworks(options?: FireworksOptions)`**: Creates a firework-style confetti effect.
- **`snow(options?: SnowOptions)`**: Creates a snow-like confetti effect with slow-falling particles.
- **`pride(options?: PrideOptions)`**: Creates a pride-themed confetti effect.
- **`fall(options?: ConfettiOptions)`**: Makes confetti particles fall from the top.
- **`infinite(method: string, interval: number, duration: number, options?: ConfettiOptions)`**: Runs the specified confetti effect in a loop.
- **`reset(type: string, options?: ResetOptions)`**: Resets the confetti effects either instantly or smoothly.
- **`customCanvas(canvas: HTMLCanvasElement | null)`**: Renders the confetti on a custom canvas element.
