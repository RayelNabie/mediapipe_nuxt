import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HandDisplay from '@/components/mediapipe/hand/HandDisplay.vue';
import type { LandmarkMap } from '@/types/MediapipeLandmark';

test('should render landmarks correctly', async () => {
  const poseData: LandmarkMap = { hand: [{ x: 1, y: 2, z: 3 }], pose: [{ x: 4, y: 5, z: 6 }], face: [{ x: 7, y: 8, z: 9 }] };

  const wrapper = mount(HandDisplay, {
    props: {
      landmarkData: poseData,
    },
  });

  expect(wrapper.text()).toContain('Hand 1');
  expect(wrapper.text()).toContain('X: 1, Y: 2, Z: 3');
  expect(wrapper.text()).toContain('Pose 1');
});
