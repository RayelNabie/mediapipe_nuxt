<template>
  <video
    ref="videoElement" class="videoElement"
    autoplay
    muted
    playsinline
  />
  <button @click="toggleWebcam">
    {{ isWebcamActive ? 'Stop webcam' : 'Start webcam' }}
  </button>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';

const videoElement = ref<HTMLVideoElement | null>(null);
const isWebcamActive = ref(false);
const stream = ref<MediaStream | null>(null);
const frameLoopId = ref<number | null>(null);

const emit = defineEmits<{
  (event: 'frame', video: HTMLVideoElement): void;
}>();

const emitFrames = () => {
  const video = videoElement.value;
  if (!video) return;
  emit('frame', video);
  frameLoopId.value = requestAnimationFrame(emitFrames);
};

const startWebcam = async () => {
  try {
    stream.value = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = videoElement.value;
    if (!video) throw new Error('Video element not found');

    video.srcObject = stream.value;
    video.onloadeddata = () => {
      isWebcamActive.value = true;
      emitFrames();
    };
  }
  catch (error) {
    console.error('Webcam start error:', error);
  }
};

const stopWebcam = () => {
  if (frameLoopId.value !== null) {
    cancelAnimationFrame(frameLoopId.value);
    frameLoopId.value = null;
  }
  stream.value?.getTracks()?.forEach(track => track.stop());
  stream.value = null;

  if (videoElement.value) videoElement.value.srcObject = null;
  isWebcamActive.value = false;
};

const toggleWebcam = () => isWebcamActive.value ? stopWebcam() : startWebcam();

onBeforeUnmount(stopWebcam);
</script>

<style scoped lang="scss">
.videoElement {
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  width: 1200px;
  height: 800px;
}
</style>
