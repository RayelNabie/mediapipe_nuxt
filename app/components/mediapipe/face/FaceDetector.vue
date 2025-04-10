<template>
  <canvas ref="canvasRef" class="absolute top-0 left-0" />
</template>

<script setup lang="ts">
import { FaceLandmarker, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision';
import { ref, watch } from 'vue';

const props = defineProps<{ video: HTMLVideoElement | null }>();
const emit = defineEmits<{ (event: 'face', result: any): void }>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
let model: FaceLandmarker;
let ctx: CanvasRenderingContext2D;
let draw: DrawingUtils;

const init = async () => {
  const vision = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm');
  model = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
      delegate: 'GPU',
    },
    runningMode: 'VIDEO',
  });
};

const predict = async () => {
  if (!props.video || !model) return;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.drawImage(props.video, 0, 0, ctx.canvas.width, ctx.canvas.height);
  const result = await model.detectForVideo(props.video, performance.now());
  result.faceLandmarks?.[0]?.forEach(pt => draw.drawLandmarks([pt], { color: '#FF0', radius: 1 }));
  emit('face', result);
  requestAnimationFrame(predict);
};

watch(() => props.video, async (v) => {
  if (v) {
    await init();
    ctx = canvasRef.value!.getContext('2d')!;
    draw = new DrawingUtils(ctx);
    canvasRef.value!.width = v.videoWidth;
    canvasRef.value!.height = v.videoHeight;
    predict();
  }
});
</script>
