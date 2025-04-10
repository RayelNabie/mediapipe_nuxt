import { beforeAll, vi, test, expect } from 'vitest';
import { usePoseStorage } from '@/composables/usePoseStorage';
import type { LandmarkMap } from '@/types/MediapipeLandmark';

// Mock de localStorage met de juiste types
beforeAll(() => {
  global.localStorage = {
    getItem: vi.fn(() => '[]'), // retourneert een lege array als string
    setItem: vi.fn(),
    removeItem: vi.fn(),
  };
});

// De test voor het opslaan van pose data in localStorage
test('should save pose data to localStorage', () => {
  const poseData: LandmarkMap = {
    hand: [{ x: 1, y: 2, z: 3, visibility: 0.9 }],
    pose: [{ x: 4, y: 5, z: 6, visibility: 0.9 }],
    face: [{ x: 7, y: 8, z: 9, visibility: 0.9 }],
  };

  const label = 'Test Pose';

  // Call de savePoseData functie
  usePoseStorage().savePoseData(poseData, label);

  // Verwacht dat localStorage.setItem is aangeroepen
  expect(localStorage.setItem).toHaveBeenCalled();
  expect(localStorage.setItem).toHaveBeenCalledWith(
    'poses',
    JSON.stringify([
      {
        label,
        data: {
          hand: [{ x: 1, y: 2, z: 3, visibility: 0.9 }],
          pose: [{ x: 4, y: 5, z: 6, visibility: 0.9 }],
          face: [{ x: 7, y: 8, z: 9, visibility: 0.9 }],
        },
        timestamp: expect.any(String),
      },
    ]) as string // Cast to string to match the expected format
  );
});
