// composables/usePoseRecorder.ts
import { ref } from 'vue';
import type { NormalizedLandmark } from '@mediapipe/tasks-vision';

export function usePoseRecorder() {
  const recording = ref(false);
  const poses = ref<number[][]>([]);
  let intervalId: number | null = null;

  const simplifyLandmarks = (landmarks: NormalizedLandmark[]) => {
    return landmarks.flatMap(({ x, y, z }) => [x, y, z]);
  };

  const startRecording = () => {
    poses.value = [];
    recording.value = true;
    intervalId = window.setInterval(() => {
      // Deze moet extern gevoed worden via `recordPose()`
    }, 160); // 6 poses per seconde = ~30 poses in 5 sec
  };

  const stopRecording = () => {
    recording.value = false;
    if (intervalId) clearInterval(intervalId);
  };

  const recordPose = (landmarks: NormalizedLandmark[]) => {
    if (recording.value && landmarks) {
      const simplified = simplifyLandmarks(landmarks);
      poses.value.push(simplified);
    }
  };

  const download = (label: string) => {
    const data = {
      label,
      poses: poses.value,
    };
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${label.replace(/\s+/g, '_')}_posedata.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return {
    recording,
    poses,
    startRecording,
    stopRecording,
    recordPose,
    download,
  };
}
