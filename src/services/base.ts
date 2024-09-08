import confetti, { Shape } from 'canvas-confetti';
import {
  ConfettiOptions,
  FireworksOptions,
  PrideOptions,
  SnowOptions,
} from '../models';

/**
 * A class to manage and trigger different confetti effects.
 * It supports various confetti styles like basic cannon, fireworks, stars, circles, squares, and more.
 * Users can customize the confetti shapes, colors, velocity, and other options.
 */
export class Confetti {
  private defaults: ConfettiOptions;
  private confettiInstance: ReturnType<typeof confetti.create> | null = null;
  private timerId: number | null = null;

  constructor(config: ConfettiOptions = {}) {
    this.defaults = {
      colors: [
        '#a864fd',
        '#29cdff',
        '#78ff44',
        '#ff718d',
        '#fdff6a',
        '#9400D3',
      ],
      particleCount: 200,
      spread: 60,
      startVelocity: 30,
      decay: 0.9,
      scalar: 1,
      angle: 90,
      origin: { x: 0.5, y: 0.5 },
      ...config,
    };
  }

  private launchConfetti(colors?: string[], options?: ConfettiOptions): void {
    const checkedColors =
      !colors || colors.length <= 0 ? this.defaults.colors : colors;

    const finalOptions = {
      ...this.defaults,
      colors: checkedColors,
      ...options,
    };

    if (this.confettiInstance) {
      this.confettiInstance(finalOptions);
    } else {
      confetti(finalOptions);
    }
  }

  private launchConfettiWithDelay(
    colors?: string[],
    options?: ConfettiOptions
  ): void {
    const delay = options?.delay || 0;

    setTimeout(() => {
      this.launchConfetti(colors, options);
    }, delay);
  }

  /**
   * Fires a highly customizable confetti effect, allowing users to specify any options they want.
   * @param {string[]} colors - Array of colors for the confetti effect.
   * @param {ConfettiOptions} [options={}] - Custom configuration options for the confetti effect.
   */
  public custom(colors: string[], options: ConfettiOptions = {}): void {
    this.launchConfettiWithDelay(colors, options);
  }

  /**
   * Runs an infinite confetti effect, repeating a specific confetti method at a given interval.
   * Supports a delay before each method execution.
   * @param {keyof Omit<Confetti, 'infinite' | 'custom' | 'customCanvas' | 'customShape'>} method - The confetti method to run.
   * @param {number} [interval=1000] - The interval time in milliseconds between each execution.
   * @param {number} [duration=5000] - Total duration in milliseconds for how long the effect should run.
   * @param {ConfettiOptions} [options] - Custom options to pass to the selected confetti method, including delay.
   */
  public infinite(
    method: keyof Omit<
      Confetti,
      'infinite' | 'custom' | 'customCanvas' | 'customShape'
    >,
    interval: number = 1000,
    duration: number = 5000,
    options?: ConfettiOptions
  ): void {
    const end = Date.now() + duration;
    const delay = options?.delay || 0;
    const methodFunction = this[method] as Function;

    this.timerId = window.setInterval(() => {
      if (Date.now() > end) {
        this.stopInfinite();
      } else {
        setTimeout(() => {
          methodFunction.call(this, options);
        }, delay);
      }
    }, interval);
  }

  /**
   * Stops the infinite confetti effect if it's currently running.
   */
  private stopInfinite(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  /**
   * Triggers a basic confetti cannon effect.
   * @param {string[]} - Array of colors for the confetti effect.
   * @param {ConfettiOptions} [options={}] - Custom configuration options for the confetti effect.
   */
  public cannon(colors?: string[], options?: ConfettiOptions): void {
    this.launchConfettiWithDelay(colors, {
      ...options,
      particleCount: 100,
    });
  }

  /**
   * Triggers confetti in random directions.
   * @param {string[]} - Array of colors for the confetti effect.
   * @param {ConfettiOptions} [options={}] - Custom configuration options for the confetti effect.
   */
  public randomDirection(colors?: string[], options?: ConfettiOptions): void {
    this.launchConfettiWithDelay(colors, {
      ...options,
      particleCount: Math.floor(Math.random() * 300),
      spread: Math.floor(Math.random() * 360),
      angle: Math.floor(Math.random() * 360),
    });
  }

  /**
   * Creates a realistic confetti effect by combining multiple bursts.
   * @param {string[]} - Array of colors for the confetti effect.
   * @param {ConfettiOptions} [options={}] - Custom configuration options for the confetti effect.
   */
  public realistic(colors?: string[], options?: ConfettiOptions): void {
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    const fire = (particleRatio: number, opts: ConfettiOptions) => {
      this.launchConfettiWithDelay(colors, {
        ...defaults,
        particleCount: Math.floor(count * particleRatio),
        ...opts,
        ...options,
      });
    };

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }

  /**
   * Creates a firework confetti effect with customizable duration and optional configurations.
   * @param {string[]} - Array of colors for the confetti effect.
   * @param {FireworksOptions} [options] - Customizable options for the fireworks effect.
   */
  public fireworks(colors?: string[], options?: FireworksOptions): void {
    const animationEnd = Date.now() + (options?.duration || 15000);
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const fire = (particleCount: number) => {
      this.launchConfettiWithDelay(colors, {
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        ...options,
      });
      this.launchConfettiWithDelay(colors, {
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        ...options,
      });
    };

    setTimeout(() => {
      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        const particleCount = 50 * (timeLeft / (options?.duration || 15000));
        fire(particleCount);
      }, 250);
    }, options?.delay || 0);
  }

  /**
   * Fires confetti with custom shapes, colors, and emojis, bursting in the center of the screen.
   * @param {Shape[] | string[]} shapes - Array of custom shapes or emoji strings.
   * @param {string[]} colors - Array of colors for the confetti effect.
   * @param {ConfettiOptions} [options={}] - Customizable options for the confetti effect.
   */
  public customShape(
    shapes: (Shape | string)[] = ['star', '🎉', '🎊', '🦄'],
    colors?: string[],
    options?: ConfettiOptions
  ): void {
    const defaults = {
      spread: 360,
      ticks: 60,
      gravity: 0.5,
      decay: 0.9,
      startVelocity: 50,
      colors,
      origin: { x: 0.5, y: 0.5 },
      ...options,
    };

    const processedShapes: Shape[] = shapes.map((shape) => {
      if (
        typeof shape === 'string' &&
        !['star', 'circle', 'square'].includes(shape)
      ) {
        return confetti.shapeFromText({
          text: shape,
          scalar: options?.scalar || 1,
        });
      }
      return shape as Shape;
    });

    const shoot = () => {
      this.launchConfettiWithDelay(colors, {
        ...defaults,
        particleCount: 40,
        scalar: 1.5,
        shapes: processedShapes,
      });

      this.launchConfettiWithDelay(colors, {
        ...defaults,
        particleCount: 20,
        scalar: 1.0,
        shapes: ['circle'],
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  }

  /**
   * Dynamically takes an array of SVG strings, extracts the paths, and applies them to the confetti effect.
   * @param {string[]} svgStrings - Array of SVG strings.
   * @param {ConfettiOptions} [options={}] - Customizable options for the confetti effect, including delay.
   */
  public customShapeFromSVG(
    svgStrings: string[],
    options?: ConfettiOptions
  ): void {
    const shapes = svgStrings
      .map((svgString) => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');

        const paths = Array.from(svgDoc.querySelectorAll('path'));

        if (paths.length > 0) {
          const pathData = paths[0].getAttribute('d');

          if (pathData) {
            return confetti.shapeFromPath({
              path: pathData,
              matrix: this.calculateMatrixFromPath(pathData),
            });
          }
        }

        return null;
      })
      .filter((shape) => shape !== null);

    const defaults = {
      spread: 180,
      particleCount: 30,
      origin: { y: -0.1 },
      startVelocity: -35,
      ...options,
    };

    const delay = options?.delay || 0;

    setTimeout(() => {
      shapes.forEach((shape) => {
        confetti({
          ...defaults,
          shapes: [shape],
          colors: options?.colors || ['#ff9a00', '#ff7400', '#ff4d00'],
        });
      });
    }, delay);
  }

  /**
   * Automatically calculate the transformation matrix based on the path data using DOMMatrix.
   * @param {string} path - SVG path data.
   * @returns {DOMMatrix} - DOMMatrix object for transformations.
   */
  private calculateMatrixFromPath(path: string): DOMMatrix {
    const scalar = 1 / Math.max(path.length / 1000, 1);

    return new DOMMatrix([scalar, 0, 0, scalar, 0, 0]);
  }

  /**
   * Fires confetti in the shape of stars with customizable colors and options.
   * Default colors are set to gold and white, ideal for a star effect.
   * @param {string[]} colors - Array of colors for the confetti effect.
   * @param {ConfettiOptions} [options={}] - Customizable options for the star-shaped confetti effect.
   */
  public stars(
    colors: string[] = ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
    options?: ConfettiOptions
  ): void {
    this.customShape(['star'], colors, options);
  }

  /**
   * Fires confetti in the shape of circles with customizable colors and options.
   * Default colors are set to light blue and pink, ideal for a fun circular effect.
   * @param {string[]} colors - Array of colors for the confetti effect.
   * @param {ConfettiOptions} [options] - Customizable options for the circle-shaped confetti effect.
   */
  public circle(
    colors: string[] = ['#87CEEB', '#FF69B4'],
    options?: ConfettiOptions
  ): void {
    this.customShape(['circle'], colors, options);
  }

  /**
   * Fires confetti in the shape of squares with customizable colors and options.
   * Default colors are set to green and blue, ideal for a square effect.
   * @param {string[]} colors - Array of colors for the confetti effect.
   * @param {ConfettiOptions} [options] - Customizable options for the square-shaped confetti effect.
   */
  public square(
    colors: string[] = ['#32CD32', '#4682B4'],
    options?: ConfettiOptions
  ): void {
    this.customShape(['square'], colors, options);
  }

  /**
   * Creates a slow-falling snow effect using confetti.
   * Default colors are set to different shades of white and light blue for a snow-like appearance.
   * @param {string[]} [colors=['#FFFFFF', '#E0FFFF', '#F0F8FF']} - Array of colors for the snow effect.
   * @param {SnowOptions} [options] - Customizable options for the snow effect.
   */
  public snow(
    colors: string[] = ['#FFFFFF', '#E0FFFF', '#F0F8FF'],
    options?: SnowOptions
  ): void {
    const animationEnd = Date.now() + (options?.duration || 15000);
    let skew = 1;

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const frame = () => {
      const timeLeft = animationEnd - Date.now();
      const ticks = Math.max(
        200,
        500 * (timeLeft / (options?.duration || 15000))
      );
      skew = Math.max(0.8, skew - 0.001);

      this.launchConfettiWithDelay(colors, {
        particleCount: 1,
        startVelocity: 0,
        ticks,
        origin: { x: Math.random(), y: Math.random() * skew - 0.2 },
        shapes: ['circle'],
        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.4, 1),
        drift: randomInRange(-0.4, 0.4),
        ...options,
      });

      if (timeLeft > 0) requestAnimationFrame(frame);
    };

    setTimeout(() => frame(), options?.delay || 0);
  }

  /**
   * Creates a "fall" confetti effect where all confetti particles fall together, filling the entire screen/canvas.
   * Particles fall faster and remain on the screen longer before disappearing.
   * @param {string[]} colors - Array of colors for the confetti effect.
   * @param {ConfettiOptions} [options] - Customizable options for the fall confetti effect.
   */
  public fall(colors?: string[], options?: ConfettiOptions): void {
    const validShapes: Shape[] = ['circle', 'square', 'star'];

    const processedShapes: Shape[] = (options?.shapes || validShapes).map(
      (shape) => {
        if (
          typeof shape === 'string' &&
          !validShapes.includes(shape as Shape)
        ) {
          return confetti.shapeFromText({
            text: shape,
            scalar: options?.scalar || 1,
          });
        } else if (validShapes.includes(shape)) {
          return shape as Shape;
        } else {
          console.warn(`Invalid shape: ${shape}, defaulting to circle.`);
          return 'circle';
        }
      }
    );

    const shoot = () => {
      for (let i = 0; i < 10; i++) {
        this.launchConfettiWithDelay(colors, {
          particleCount: options?.particleCount || 50,
          startVelocity: options?.startVelocity || 20,
          gravity: options?.gravity || 0.8,
          ticks: options?.ticks || 1200,
          decay: options?.decay || 0.93,
          shapes: processedShapes,
          origin: { x: Math.random(), y: 0 },
          scalar: options?.scalar || 1.1,
          drift: Math.random() * 2 - 1,
          ...options,
        });
      }
    };

    setTimeout(shoot, options?.delay || 0);
  }

  /**
   * Fires confetti in the specified colors from both sides of the screen
   * with a wider spread and repeated animation for a set duration.
   * The default colors are set to a popular company's color scheme.
   * @param {string[]} - Colors for the confetti effect.
   * @param {number} [duration=15000] - Total duration for the confetti effect (in milliseconds).
   * @param {PrideOptions} [options] - Customizable options for the pride effect.
   */
  public pride(colors?: string[], options?: PrideOptions): void {
    const duration = options?.duration || 15000;
    const end = Date.now() + duration;

    const frame = () => {
      this.launchConfettiWithDelay(colors, {
        ...this.defaults,
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.5 },
        ...options,
      });

      this.launchConfettiWithDelay(colors, {
        ...this.defaults,
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.5 },
        ...options,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }

  /**
   * Allows the user to specify a custom canvas element for the confetti effect.
   * @param {HTMLCanvasElement | null} canvas - The custom canvas element.
   */
  public customCanvas(canvas: HTMLCanvasElement | null): void {
    if (canvas) {
      this.confettiInstance = confetti.create(canvas, { resize: true });
    } else {
      this.confettiInstance = null;
    }
  }
}
