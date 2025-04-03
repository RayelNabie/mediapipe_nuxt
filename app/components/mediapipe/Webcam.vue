<template>
  <div>
    <video ref="videoRef" />
    <button v-if="!isRunning" @click="startWebcam">
      Start webcam
    </button>
    <button v-if="isRunning" @click="stopWebcam">
      Stop webcam
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';

const videoRef = ref<HTMLVideoElement | null>(null);
const emit = defineEmits<{
  (event: 'frame', video: HTMLVideoElement): void;
}>();

const isRunning = ref(false);
const requestAnimationFrameId = ref<number | null>(null);
const stream = ref<MediaStream | null>(null);

const startWebcam = async () => {
  try {
    stream.value = await navigator.mediaDevices.getUserMedia({ video: true });

    const video = videoRef.value;
    if (!video) return console.warn('Video element not available.');

    video.srcObject = stream.value;

    video.onloadeddata = () => {
      isRunning.value = true;
      loopFrames();
    };
  }
  catch (err) {
    console.error('User denied webcam access or error occurred:', err);
  }
};

const loopFrames = () => {
  if (!videoRef.value) return;
  emit('frame', videoRef.value);
  requestAnimationFrameId.value = requestAnimationFrame(loopFrames);
};

const stopWebcam = () => {
  if (requestAnimationFrameId.value) cancelAnimationFrame(requestAnimationFrameId.value);
  requestAnimationFrameId.value = null;

  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop());
    stream.value = null;
  }

  isRunning.value = false;
};

onBeforeUnmount(stopWebcam);
</script>
