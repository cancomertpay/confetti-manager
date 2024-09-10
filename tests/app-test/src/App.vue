<template>
  <div class="confetti-settings">
    <h2>Confetti Effects Tester</h2>

    <!-- Option to choose where to display confetti -->
    <div class="input-group">
      <label for="display-mode">Display Mode:</label>
      <select v-model="displayOnCanvas">
        <option :value="false">Screen</option>
        <option :value="true">Canvas</option>
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
      <button @click="confettiManager.reset('instant')">Reset Instantly</button>
      <button @click="confettiManager.reset('smooth', { duration: 3000 })">
        Reset Smooth
      </button>
    </div>

    <!-- Button to trigger all effects sequentially -->
    <div class="test-all">
      <button @click="testAllEffects">Test All Effects</button>
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

<script setup lang="ts">
import { Confetti } from 'fast-confetti/dist/index.mjs';
import { ref, watch } from 'vue';

const displayOnCanvas = ref<boolean>(false);
const confettiCanvas = ref<HTMLCanvasElement | null>(null);
const confettiManager = new Confetti();

watch(displayOnCanvas, (newValue) => {
  if (newValue && confettiCanvas.value) {
    confettiManager.customCanvas(confettiCanvas.value);
  } else {
    confettiManager.customCanvas(null);
  }
});

const triggerCannon = () => {
  confettiManager.cannon({
    colors: ['#FCFCFC', '#000000'],
  });
};

const triggerRandom = () => {
  confettiManager.randomDirection({
    colors: ['#FCFCFC', '#000000'],
  });
};

const triggerRealistic = () => {
  confettiManager.realistic({
    colors: ['#FCFCFC', '#000000'],
  });
};

const triggerFireworks = () => {
  confettiManager.fireworks({
    duration: 5000, 
  });
};

const triggerPride = () => {
  confettiManager.pride({
    duration: 5000, 
  });
};

const triggerStars = () => {
  confettiManager.stars({
    colors: ['#FFD700', '#FFFFFF'],
  });
};

const triggerSnow = () => {
  confettiManager.snow({
    colors: ['#FCFCFC'],
    duration: 6000,
    delay: 5000
  });
};

const testAllEffects = () => {
  confettiManager.cannon({ delay: 0 });
  confettiManager.randomDirection({ delay: 1000 });
  confettiManager.realistic({ delay: 2000 });
  confettiManager.pride({ delay: 3000, duration: 3000 });
  confettiManager.fireworks({ delay: 6000, duration: 3000 });
  confettiManager.snow({ delay: 9000, duration: 3000 });
};
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

.test-all {
  margin-top: 20px;
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
