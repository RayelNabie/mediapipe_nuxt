import {
  type NormalizedLandmark,
  FilesetResolver,
  HandLandmarker,
  DrawingUtils,
  type HandLandmarkerResult,
} from '@mediapipe/tasks-vision';
import type { LandmarkStyles } from '@/types/MediapipeLandmark';

export async function usePoseRenderer(
  videoEl: HTMLVideoElement,
  canvasEl: HTMLCanvasElement,
  emit: (data: { type: 'hand'; landmarks: NormalizedLandmark[][] }) => void,
  style: LandmarkStyles = {},
): Promise<void> {
  try {
    videoEl.srcObject = await navigator.mediaDevices.getUserMedia({ video: true });
    await videoEl.play();

    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/wasm',
    );

    const detector: HandLandmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
        delegate: 'GPU',
      },
      runningMode: 'VIDEO',
      numHands: 2,
    });

    const ctx = canvasEl?.getContext('2d') ?? null;
    const drawUtils = ctx ? new DrawingUtils(ctx) : null;

    const render = (landmarks: NormalizedLandmark[][] = []) => {
      if (!ctx || !drawUtils) return;
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      for (const hand of landmarks) {
        drawUtils.drawConnectors(hand, HandLandmarker.HAND_CONNECTIONS, {
          color: style.lineColor ?? '#0F0',
          lineWidth: style.lineWidth ?? 5,
        });
        drawUtils.drawLandmarks(hand, {
          color: style.pointColor ?? '#F00',
          radius: style.pointRadius ?? 4,
        });
      }
    };

    const detectLoop = async (): Promise<void> => {
      const result: HandLandmarkerResult = await detector.detectForVideo(videoEl, performance.now());
      emit({ type: 'hand', landmarks: result.landmarks ?? [] });
      render(result.landmarks);
      requestAnimationFrame(detectLoop);
    };

    detectLoop();
  }
  catch (err) {
    console.error('PoseRenderer error:', err);
  }
}
