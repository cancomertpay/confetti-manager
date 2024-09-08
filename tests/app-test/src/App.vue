<template>
  <div class="confetti-settings">
    <h2>Confetti Effects</h2>

    <!-- Option to choose where to display confetti -->
    <div class="input-group">
      <label for="display-mode">Display Mode:</label>
      <select v-model="displayOnCanvas">
        <option :value="true">Canvas</option>
        <option :value="false">Screen</option>
      </select>
    </div>

    <!-- Buttons to trigger different confetti effects -->
    <div class="button-group">
      <button @click="triggerCannon">Cannon</button>
      <button @click="triggerRandom">Random Direction</button>
      <button @click="triggerRealistic">Realistic</button>
      <button @click="triggerFireworks">Fireworks</button>
      <button @click="triggerPride">Pride</button>
      <button @click="triggerStars">Stars</button>
      <button @click="triggerSnow">Snow</button>
      <button @click="triggerEmoji">Emoji Confetti</button>
    </div>

    <!-- Always visible canvas for confetti -->
    <canvas
      ref="confettiCanvas"
      width="800"
      height="400"
      class="confetti-canvas"
    ></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { Confetti } from 'confetti-manager/dist/index.mjs';

export default defineComponent({
  setup() {
    const displayOnCanvas = ref<boolean>(true); // Starts with Canvas mode
    const confettiCanvas = ref<HTMLCanvasElement | null>(null);
    const confettiManager = new Confetti();

    // Watch for display mode changes (Canvas or Screen)
    watch(displayOnCanvas, (newValue) => {
      if (newValue && confettiCanvas.value) {
        // If canvas is selected, use canvas
        confettiManager.customCanvas(confettiCanvas.value);
      } else {
        // If screen is selected, use screen
        confettiManager.customCanvas(null);
      }
    });

    const triggerCannon = () => {
      confettiManager.infinite("cannon");
    };

    const triggerRandom = () => {
      confettiManager.randomDirection();
    };

    const triggerRealistic = () => {
      confettiManager.realistic();
    };

    const triggerFireworks = () => {
      confettiManager.fireworks();
    };

    const triggerPride = () => {
      confettiManager.pride();
    };

    const triggerStars = () => {
      confettiManager.stars();
    };

    const triggerSnow = () => {
      confettiManager.snow();
    };

    const triggerEmoji = () => {
      confettiManager.customShape();
    };

    return {
      displayOnCanvas,
      confettiCanvas,
      triggerCannon,
      triggerRandom,
      triggerRealistic,
      triggerFireworks,
      triggerPride,
      triggerStars,
      triggerSnow,
      triggerEmoji,
    };
  },
});
</script>

<style scoped>
.confetti-settings {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.confetti-canvas {
  border: 1px solid #ccc;
  margin-top: 20px;
  width: 100%;
}

.input-group {
  margin-top: 20px;
}

select {
  padding: 5px;
  font-size: 1rem;
}
</style>
