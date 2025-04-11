import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HandDisplay from '@/components/mediapipe/hand/HandDisplay.vue';
import type { LandmarkMap } from '@/types/MediapipeLandmark';

test('Landmark Rendering', async () => {
  const poseData: LandmarkMap = {
    hand: [[{
      x: 1, y: 2, z: 3,
      visibility: 0,
    }]],
    pose: [[{
      x: 4, y: 5, z: 6,
      visibility: 0,
    }]],
    face: [[{
      x: 7, y: 8, z: 9,
      visibility: 0,
    }]],
  };

  const wrapper = mount(HandDisplay, {
    props: {
      landmarkData: poseData,
    },
  });

  expect(wrapper.text()).toMatch(/Hand.*1.*X: 1, Y: 2, Z: 3/);
});
