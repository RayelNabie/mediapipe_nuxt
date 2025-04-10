<template>
  <div>
    <video
      ref="videoElement"
      autoplay
      muted
      playsinline
      style="width: 100%;
      max-width: 600px"
    />
    <button @click="isWebcamActive ? stopWebcam() : startWebcam()">
      {{ isWebcamActive ? 'Stop webcam' : 'Start webcam' }}
    </button>
  </div>
</template>

<script setup lang="ts">
const videoElement = ref<HTMLVideoElement | null>(null);
const emit = defineEmits<{
  (event: 'frame', video: HTMLVideoElement): void;
}>();

const isWebcamActive = ref(false);
const frameLoopId = ref<number | null>(null);
const mediaStream = ref<MediaStream | null>(null);

const startWebcam = async () => {
  try {
    mediaStream.value = await navigator.mediaDevices.getUserMedia({ video: true });

    const video = videoElement.value;
    if (!video) return console.warn('Video element not available.');

    video.srcObject = mediaStream.value;

    video.onloadeddata = () => {
      isWebcamActive.value = true;
      emitVideoFrames();
    };
  }
  catch (err) {
    console.error('User denied webcam access or error occurred:', err);
  }
};

const stopWebcam = () => {
  if (frameLoopId.value) cancelAnimationFrame(frameLoopId.value);
  frameLoopId.value = null;

  if (mediaStream.value) {
    mediaStream.value.getTracks().forEach(track => track.stop());
    mediaStream.value = null;
  }

  isWebcamActive.value = false;
};

const emitVideoFrames = () => {
  if (!videoElement.value) return;
  emit('frame', videoElement.value);
  frameLoopId.value = requestAnimationFrame(emitVideoFrames);
};

onBeforeUnmount(stopWebcam);
</script>
