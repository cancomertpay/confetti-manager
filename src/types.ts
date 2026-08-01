import { Options, Shape } from 'canvas-confetti';

export interface ConfettiOptions extends Options {
  shapes?: Shape[];
  delay?: number;
  duration?: number;
}

export interface FireworksOptions extends ConfettiOptions {
  duration?: number;
}

export interface SnowOptions extends ConfettiOptions {
  duration?: number;
}

export interface PrideOptions extends ConfettiOptions {
  duration?: number;
}

export interface ResetOptions extends ConfettiOptions {
  duration?: number;
}
