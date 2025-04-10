import { FilesetResolver, PoseLandmarker, DrawingUtils } from '@mediapipe/tasks-vision';
import type { NormalizedLandmark } from '@mediapipe/tasks-vision';

export function usePoseRenderer(
  videoElement: Ref<HTMLVideoElement | null>,
  canvasElement: Ref<HTMLCanvasElement | null>,
  onPoseDetected?: (landmarks: NormalizedLandmark[]) => void,
) {
  const poseModel = ref<PoseLandmarker | null>(null);
  const drawingUtils = ref<DrawingUtils | null>(null);
  const isRunning = ref(false);

  const context2D = computed(() => canvasElement.value?.getContext('2d') ?? null);

  const loadModel = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm',
    );

    poseModel.value = await PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task',
        delegate: 'GPU',
      },
      runningMode: 'VIDEO',
    });
  };

  const render = async () => {
    const ctx = context2D.value;
    const video = videoElement.value;
    const model = poseModel.value;
    const utils = drawingUtils.value;

    if (!ctx || !video || !model || !utils || !isRunning.value) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(video, 0, 0, ctx.canvas.width, ctx.canvas.height);

    const result = await model.detectForVideo(video, performance.now());

    if (result.landmarks?.[0]) {
      utils.drawConnectors(result.landmarks[0], PoseLandmarker.POSE_CONNECTIONS, { color: '#00F' });
      utils.drawLandmarks(result.landmarks[0], { color: '#0FF', radius: 2 });
      onPoseDetected?.(result.landmarks[0]);
    }

    requestAnimationFrame(render);
  };

  watch(videoElement, async (video) => {
    if (!video || !context2D.value) return;

    await loadModel();
    drawingUtils.value = new DrawingUtils(context2D.value);
    isRunning.value = true;

    render();
  });

  onBeforeUnmount(() => {
    isRunning.value = false;
  });
}
