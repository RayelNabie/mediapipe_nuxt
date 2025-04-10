import {
  FilesetResolver,
  HandLandmarker,
} from '@mediapipe/tasks-vision';

export async function useVisionTask(type: 'hand') {
  const vision = await FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm',
  );

  if (type === 'hand') {
    const model = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
      },
      runningMode: 'VIDEO',
      numHands: 2,
    });

    return model;
  }

  throw new Error('Unsupported vision task type: ' + type);
}
