import confetti from 'canvas-confetti';
import { Confetti } from '../src';

jest.mock('canvas-confetti', () => {
  const fire: any = jest.fn();
  fire.create = jest.fn(() => jest.fn());
  fire.reset = jest.fn();
  fire.shapeFromText = jest.fn(() => 'text-shape');
  return { __esModule: true, default: fire };
});

const mockConfetti = confetti as unknown as jest.Mock & {
  create: jest.Mock;
  reset: jest.Mock;
  shapeFromText: jest.Mock;
};

// The library targets the browser; stub the browser-only globals it relies on.
beforeAll(() => {
  (global as any).requestAnimationFrame = jest.fn(() => 1);
  (global as any).cancelAnimationFrame = jest.fn();
  // Resolved at call time so it picks up Jest's fake timers.
  (global as any).window = {
    setInterval: (...args: any[]) => (global as any).setInterval(...args),
  };
});

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
  jest.useRealTimers();
});

describe('Confetti — defaults', () => {
  it('applies built-in defaults when no config is given', () => {
    new Confetti().cannon();
    jest.runOnlyPendingTimers();

    expect(mockConfetti).toHaveBeenCalledTimes(1);
    expect(mockConfetti.mock.calls[0][0]).toMatchObject({
      spread: 60,
      startVelocity: 30,
      decay: 0.9,
      angle: 90,
      origin: { x: 0.5, y: 0.5 },
    });
  });

  it('lets constructor config override the built-in defaults', () => {
    new Confetti({ colors: ['#000000'], spread: 180 }).cannon();
    jest.runOnlyPendingTimers();

    expect(mockConfetti.mock.calls[0][0]).toMatchObject({
      colors: ['#000000'],
      spread: 180,
    });
  });

  it('lets per-call options override constructor config', () => {
    new Confetti({ spread: 180 }).cannon({ spread: 45 });
    jest.runOnlyPendingTimers();

    expect(mockConfetti.mock.calls[0][0].spread).toBe(45);
  });
});

describe('Confetti — effects', () => {
  it('cannon() emits 100 particles by default', () => {
    new Confetti().cannon();
    jest.runOnlyPendingTimers();

    expect(mockConfetti.mock.calls[0][0].particleCount).toBe(100);
  });

  it('stars() uses the star shape', () => {
    new Confetti().stars();
    jest.runOnlyPendingTimers();

    expect(mockConfetti.mock.calls[0][0].shapes).toEqual(['star']);
  });

  it('realistic() fires several bursts in one call', () => {
    new Confetti().realistic();
    jest.runOnlyPendingTimers();

    expect(mockConfetti.mock.calls.length).toBeGreaterThan(1);
  });

  it('custom() forwards the given options', () => {
    new Confetti().custom({ particleCount: 7, angle: 12 });
    jest.runOnlyPendingTimers();

    expect(mockConfetti.mock.calls[0][0]).toMatchObject({
      particleCount: 7,
      angle: 12,
    });
  });
});

describe('Confetti — delay', () => {
  it('does not fire before the delay has elapsed', () => {
    new Confetti().cannon({ delay: 500 });

    jest.advanceTimersByTime(499);
    expect(mockConfetti).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(mockConfetti).toHaveBeenCalledTimes(1);
  });
});

describe('Confetti — custom canvas', () => {
  it('routes rendering through the canvas instance instead of the global one', () => {
    const instance = jest.fn();
    mockConfetti.create.mockReturnValueOnce(instance);

    const c = new Confetti();
    c.customCanvas({} as HTMLCanvasElement);
    c.cannon();
    jest.runOnlyPendingTimers();

    expect(mockConfetti.create).toHaveBeenCalledTimes(1);
    expect(instance).toHaveBeenCalledTimes(1);
    expect(mockConfetti).not.toHaveBeenCalled();
  });

  it('falls back to the global renderer when passed null', () => {
    const c = new Confetti();
    c.customCanvas({} as HTMLCanvasElement);
    c.customCanvas(null);
    c.cannon();
    jest.runOnlyPendingTimers();

    expect(mockConfetti).toHaveBeenCalledTimes(1);
  });
});

describe('Confetti — reset', () => {
  it('clears immediately on an instant reset', () => {
    new Confetti().reset('instant');

    expect(mockConfetti.reset).toHaveBeenCalledTimes(1);
  });

  it('fades out over the given duration on a smooth reset', () => {
    new Confetti().reset('smooth', { duration: 500 });

    expect(mockConfetti.reset).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    expect(mockConfetti).toHaveBeenCalled();
    expect(mockConfetti.reset).toHaveBeenCalledTimes(1);
  });
});

describe('Confetti — looping', () => {
  it('repeats the given effect until the duration is reached', () => {
    new Confetti().infinite('cannon', 100, 350);

    jest.advanceTimersByTime(1000);

    expect(mockConfetti.mock.calls.length).toBeGreaterThan(0);
    expect(mockConfetti.mock.calls.length).toBeLessThanOrEqual(4);
  });
});
