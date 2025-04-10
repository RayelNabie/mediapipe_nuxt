import type { NormalizedLandmark } from '@mediapipe/tasks-vision';
import type { PoseData } from '@/types/MediapipeLandmark';

export const usePoseStorage = () => {
  const savedPoses = ref<PoseData[]>([]);

  const savePoseData = (poseData: NormalizedLandmark[], label: string) => {
    const landmarkData = poseData.map(landmark => ({
      x: landmark.x,
      y: landmark.y,
      z: landmark.z,
      visibility: landmark.visibility,
    }));

    const newPose: PoseData = {
      label,
      data: landmarkData,
      timestamp: new Date().toISOString(),
    };

    savedPoses.value.push(newPose);
    localStorage.setItem('poses', JSON.stringify(savedPoses.value));
    console.log('Pose data saved:', newPose);
  };

  const loadPoseData = () => {
    const storedData = localStorage.getItem('poses');
    if (storedData) {
      savedPoses.value = JSON.parse(storedData) as PoseData[];
    }
  };

  const clearPoseData = () => {
    savedPoses.value = [];
    localStorage.removeItem('poses');
  };

  return {
    savedPoses,
    savePoseData,
    loadPoseData,
    clearPoseData,
  };
};
