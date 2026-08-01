# fast-confetti

[![npm version](https://img.shields.io/npm/v/fast-confetti.svg)](https://www.npmjs.com/package/fast-confetti)

Customizable confetti effects for the web — cannon, fireworks, stars, snow, pride and more.
TypeScript-first, built on top of [`canvas-confetti`](https://github.com/catdad/canvas-confetti).

**Live demo:** [Memory Game](https://memory-game-by-cc.vercel.app) — a Vue 3 app using this package.

## Features

- **Predefined effects** — `cannon`, `fireworks`, `stars`, `snow`, `pride`, `fall`, `realistic`, `randomDirection`
- **Fully customizable** — colors, shapes, particle count, velocity, gravity, spread, origin and more
- **Looping effects** — repeat any effect at a set interval for a set duration
- **Custom canvas** — render onto your own `<canvas>` element instead of the full page
- **Two reset modes** — clear instantly, or fade out smoothly
- **Typed** — written in TypeScript, ships with its own declarations
- **ESM + CJS** — works with modern bundlers and with `require()`

## Installation

```bash
npm install fast-confetti
```

```bash
pnpm add fast-confetti
```

```bash
yarn add fast-confetti
```

## Quick start

```typescript
import { Confetti } from 'fast-confetti';

const confetti = new Confetti();
confetti.cannon();
```

You can also pass defaults to the constructor — they apply to every effect on that instance:

```typescript
const confetti = new Confetti({
  colors: ['#FF0000', '#00FF00', '#0000FF'],
  particleCount: 150,
});
```

## Usage

### Custom colors

```typescript
confetti.cannon({
  colors: ['#FF0000', '#00FF00', '#0000FF'],
});
```

### Fireworks

```typescript
confetti.fireworks({
  colors: ['#FF0000', '#FFFF00'],
  duration: 10000, // runs for 10 seconds
});
```

### Snow

```typescript
confetti.snow({
  duration: 15000, // runs for 15 seconds
});
```

### Looping an effect

Repeat any effect at a given interval for a given duration:

```typescript
confetti.infinite('cannon', 1000, 5000); // every 1s, for 5s
```

### Pride

```typescript
confetti.pride({
  duration: 15000,
});
```

### Delaying an effect

Every effect accepts a `delay` (milliseconds) before it fires:

```typescript
confetti.stars({ delay: 500 });
```

### Custom canvas

Render onto your own canvas instead of the full page:

```typescript
const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
confetti.customCanvas(canvas);
confetti.cannon();
```

Pass `null` to go back to full-page rendering:

```typescript
confetti.customCanvas(null);
```

### Resetting

```typescript
confetti.reset('instant');                     // clear immediately
confetti.reset('smooth', { duration: 2000 });  // fade out over 2 seconds
```

## API

### Methods

| Method | Description |
| --- | --- |
| `cannon(options?)` | Basic confetti burst. |
| `realistic(options?)` | Layered burst built from several shots — the most natural looking effect. |
| `randomDirection(options?)` | Fires with randomised count, spread and angle. |
| `fireworks(options?)` | Repeating firework bursts from both sides of the screen. |
| `stars(options?)` | Star-shaped particles in gold tones. |
| `snow(options?)` | Slow-falling particles drifting across the screen. |
| `pride(options?)` | Streams fired from the left and right edges. |
| `fall(options?)` | Particles falling from the top across the full width. Supports text shapes. |
| `custom(options?)` | Fires a single burst using only the options you pass. |
| `infinite(method, interval?, duration?, options?)` | Repeats the given method every `interval` ms for `duration` ms. Defaults: `1000`, `5000`. |
| `reset(type?, options?)` | `'instant'` clears at once, `'smooth'` (default) fades out. |
| `customCanvas(canvas)` | Renders onto the given `HTMLCanvasElement`, or `null` to reset to full page. |

### `ConfettiOptions`

Extends [`canvas-confetti`'s `Options`](https://github.com/catdad/canvas-confetti#options) and adds `shapes`, `delay` and `duration`.

| Option | Type | Description |
| --- | --- | --- |
| `colors` | `string[]` | Particle colors (hex or RGBA). |
| `particleCount` | `number` | Number of particles to emit. |
| `spread` | `number` | Spread angle in degrees. |
| `startVelocity` | `number` | Initial particle velocity. |
| `gravity` | `number` | Gravitational pull applied to particles. |
| `decay` | `number` | How quickly velocity decays. |
| `ticks` | `number` | Particle lifetime in frames. |
| `scalar` | `number` | Particle size multiplier. |
| `angle` | `number` | Launch angle in degrees. |
| `origin` | `{ x: number; y: number }` | Launch position, relative to the canvas (`0`–`1`). |
| `shapes` | `Shape[]` | Particle shapes — `'circle'`, `'square'`, `'star'`. |
| `delay` | `number` | Milliseconds to wait before firing. |
| `duration` | `number` | How long timed effects run, in milliseconds. |

### `ResetOptions`

Used by `reset('smooth', options)`: `duration`, `particleCount`, `ticks`, `gravity`, `colors`, `shapes`.

## Example

A Vue 3 playground lives in [`examples/vue`](./examples/vue). It links the local
package, so you can try changes without publishing:

```bash
npm install && npm run build
cd examples/vue && npm install && npm run dev
```

## Requirements

Runs in the browser — it relies on `requestAnimationFrame` and `<canvas>`.
In SSR frameworks (Nuxt, Next.js) create the instance on the client side only.

## License

MIT © Can Cömertpay
