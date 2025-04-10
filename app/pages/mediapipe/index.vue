<template>
  <div class="relative">
    <MediapipeWebcam @frame="onFrame" />
    <canvas ref="canvasElement" class="canvasElement" />
    <MediapipeBodyDetector
      :video="webcamElement"
      :canvas-element="canvasElement"
      :on-record-pose="recordPose"
    />

    <div class="recorder-ui">
      <input v-model="label" placeholder="Label (bv. wachtwoord1)">
      <button @click="startRecording">
        Start opname
      </button>
      <button @click="stopRecording">
        Stop opname
      </button>
      <button :disabled="poses.length === 0" @click="download">
        Download JSON
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePoseRecorder } from '@/composables/usePoseRecorder';

const canvasElement = ref<HTMLCanvasElement | null>(null);
const webcamElement = ref<HTMLVideoElement | null>(null);
const canvasContext = ref<CanvasRenderingContext2D | null>(null);

const label = ref('');
const {
  poses,
  startRecording,
  stopRecording,
  recordPose,
  download: downloadPoseData,
} = usePoseRecorder();

const onFrame = (video: HTMLVideoElement) => {
  webcamElement.value = video;
};

onMounted(() => {
  if (canvasElement.value) {
    // Zorg voor juiste afmetingen en context
    canvasElement.value.width = 1200;
    canvasElement.value.height = 800;
    canvasContext.value = canvasElement.value.getContext('2d');
  }
});

const download = () => {
  if (!label.value) {
    alert('Voer een label in!');
    return;
  }
  downloadPoseData(label.value);
};
</script>

<style scoped lang="scss">
.canvasElement {
  position: absolute;
  top: 0;
  left: 0;
  width: 1200px;
  height: 800px;
  z-index: 10;
  pointer-events: none;
}

.recorder-ui {
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.8);
  padding: 1rem;
  border-radius: 8px;
  z-index: 20;
}
</style>
