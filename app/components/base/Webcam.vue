<template>
  <section class="videosection">
    <video
      ref="videoRef" width="480"
      height="270"
      autoplay playsinline
    />
    <canvas ref="canvasRef" width="480" height="270" />
  </section>
</template>

<script lang="ts" setup>
const videoRef = ref(null);
const canvasRef = ref(null);
const emit = defineEmits(['video-ready']);

watchEffect(() => {
  if (videoRef.value && canvasRef.value) {
    usePoseRenderer(videoRef.value, canvasRef.value, data => emit('video-ready', data));
  }
});
</script>

<style lang="scss" scoped>
.videosection {
  position: relative;
  width: 100%;
  max-width: 800px;
  aspect-ratio: 16 / 9;
  margin: 3rem auto;
  background-color: $gray;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba($dark-gray, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;

  video,
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scaleX(-1);
  }
}
</style>
