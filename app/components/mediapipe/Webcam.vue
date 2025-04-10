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
