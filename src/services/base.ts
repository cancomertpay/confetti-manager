import confetti, { Shape } from 'canvas-confetti';
import {
  ConfettiOptions,
  FireworksOptions,
  PrideOptions,
  ResetOptions,
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
  private timerId: number | NodeJS.Timeout | null = null;
  private animationFrameId: number | null = null;

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

  /**
   * Launches confetti with the provided configuration options.
   * If a `confettiInstance` exists, it will use that; otherwise, it calls the default confetti method.
   * @param {ConfettiOptions} [options] - Custom configuration options for the confetti effect.
   */
  private launchConfetti(options?: ConfettiOptions): void {
    const finalOptions = {
      ...this.defaults,
      ...options,
    };

    if (this.confettiInstance) {
      this.confettiInstance(finalOptions);
    } else {
      confetti(finalOptions);
    }
  }

  /**
   * Launches confetti after a specified delay.
   * If no delay is provided, the confetti launches immediately.
   * @param {ConfettiOptions} [options] - Custom configuration options for the confetti effect.
   */
  private launchConfettiWithDelay(options?: ConfettiOptions): void {
    const delay = options?.delay || 0;

    setTimeout(() => {
      this.launchConfetti(options);
    }, delay);
  }

  /**
   * Fires a highly customizable confetti effect with the provided options.
   * @param {ConfettiOptions} [options={}] - Custom configuration options for the confetti effect.
   */
  public custom(options: ConfettiOptions = {}): void {
    this.launchConfettiWithDelay(options);
  }

  /**
   * Runs an infinite confetti effect, repeating a specific confetti method at a given interval.
   * Supports a delay before each method execution and a total duration for the effect.
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
   * Stops the infinite confetti effect if it is currently running.
   */
  private stopInfinite(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  /**
   * Triggers a basic confetti cannon effect.
   * @param {ConfettiOptions} [options={}] - Custom configuration options for the cannon confetti effect.
   */
  public cannon(options?: ConfettiOptions): void {
    this.launchConfettiWithDelay({
      particleCount: 100,
      ...options,
    });
  }

  /**
   * Fires confetti in random directions with customizable options.
   * @param {ConfettiOptions} [options={}] - Custom configuration options for the random direction confetti effect.
   */
  public randomDirection(options?: ConfettiOptions): void {
    this.launchConfettiWithDelay({
      particleCount: Math.floor(Math.random() * 300),
      spread: Math.floor(Math.random() * 360),
      angle: Math.floor(Math.random() * 360),
      ...options,
    });
  }

  /**
   * Creates a realistic confetti effect by combining multiple bursts.
   * @param {ConfettiOptions} [options={}] - Custom configuration options for the realistic confetti effect.
   */
  public realistic(options?: ConfettiOptions): void {
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    const fire = (particleRatio: number, opts: ConfettiOptions) => {
      this.launchConfettiWithDelay({
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
   * Creates a firework confetti effect with customizable duration and options.
   * @param {FireworksOptions} [options] - Customizable options for the fireworks confetti effect.
   */
  public fireworks(options?: FireworksOptions): void {
    const animationEnd = Date.now() + (options?.duration || 15000);
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const fire = (particleCount: number) => {
      this.launchConfettiWithDelay({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        ...options,
      });
      this.launchConfettiWithDelay({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        ...options,
      });
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / (options?.duration || 15000));
      fire(particleCount);
    }, 250);

    this.timerId = interval;
  }

  /**
   * Fires confetti in the shape of stars with customizable colors and options.
   * Default colors are set to gold and white, ideal for a star effect.
   * @param {ConfettiOptions} [options={}] - Customizable options for the star-shaped confetti effect.
   */
  public stars(options?: ConfettiOptions): void {
    const defaultColors = ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'];

    const starOptions = {
      particleCount: 40,
      shapes: ['star'] as Shape[],
      colors: defaultColors,
      scalar: 1.2,
      ...options,
    };

    this.launchConfettiWithDelay(starOptions);
  }

  /**
   * Creates a slow-falling snow effect using confetti.
   * Default colors are set to different shades of white and light blue for a snow-like appearance.
   * @param {SnowOptions} [options] - Customizable options for the snow confetti effect.
   */
  public snow(options?: SnowOptions): void {
    const delay = options?.delay || 0;

    setTimeout(() => {
      const animationEnd = Date.now() + (options?.duration || 5000);
      let skew = 1;

      const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;

      const frame = () => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0 || this.animationFrameId === null) return;

        const ticks = Math.max(
          200,
          500 * (timeLeft / (options?.duration || 5000))
        );
        skew = Math.max(0.8, skew - 0.001);

        this.launchConfetti({
          particleCount: 1,
          startVelocity: 0,
          ticks,
          origin: { x: Math.random(), y: Math.random() * skew - 0.2 },
          shapes: ['circle'],
          gravity: randomInRange(0.4, 0.6),
          scalar: randomInRange(0.4, 1),
          drift: randomInRange(-0.4, 0.4),
          colors: ['#FCFCFC'],
          ...options,
        });

        this.animationFrameId = requestAnimationFrame(frame);
      };

      this.animationFrameId = requestAnimationFrame(frame);
    }, delay);
  }

  /**
   * Creates a "fall" confetti effect where all confetti particles fall together, filling the entire screen/canvas.
   * Particles fall faster and remain on the screen longer before disappearing.
   * @param {ConfettiOptions} [options={}] - Customizable options for the fall confetti effect.
   */
  public fall(options?: ConfettiOptions): void {
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
        this.launchConfettiWithDelay({
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
   * @param {PrideOptions} [options={}] - Customizable options for the pride confetti effect.
   */
  public pride(options?: PrideOptions): void {
    const duration = options?.duration || 15000;
    const end = Date.now() + duration;

    const frame = () => {
      const timeLeft = end - Date.now();

      if (timeLeft > 0 && this.animationFrameId !== null) {
        this.launchConfettiWithDelay({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.5 },
          ...options,
        });

        this.launchConfettiWithDelay({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.5 },
          ...options,
        });

        this.animationFrameId = requestAnimationFrame(frame);
      }
    };

    this.animationFrameId = requestAnimationFrame(frame);
  }

  /**
   * Resets the confetti effect based on the provided type.
   * Types can be "instant" for immediate reset or "smooth" for a fade-out effect.
   * @param {"instant" | "smooth"} [type="smooth"] - The type of reset to perform ("instant" or "smooth").
   * @param {ConfettiOptions} [options={}] - Customizable options for the confetti effect during smooth reset. Includes `duration`, `particleCount`, `gravity`, etc.
   */
  public reset(
    type: 'smooth' | 'instant' = 'smooth',
    options: ResetOptions = {}
  ): void {
    const duration = options.duration || 2000;

    // Tüm requestAnimationFrame animasyonlarını durdur
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (type === 'instant') {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
      confetti.reset();
    } else if (type === 'smooth') {
      const stepTime = 50;
      const steps = duration / stepTime;
      let currentStep = 0;

      const intervalId = setInterval(() => {
        currentStep++;

        confetti({
          particleCount: options.particleCount || 100,
          startVelocity: 0,
          scalar: 1 - currentStep / steps,
          disableForReducedMotion: true,
          ticks: options.ticks || 200,
          gravity: options.gravity || 0.5,
          colors: options.colors || ['rgba(255, 255, 255, 0.1)'],
          shapes: options.shapes || ['circle', 'square'],
        });

        if (currentStep >= steps) {
          clearInterval(intervalId);
          if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
          }
          confetti.reset();
        }
      }, stepTime);
    } else {
      console.warn(`Unknown reset type: ${type}. Defaulting to instant reset.`);
      confetti.reset();
    }
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
