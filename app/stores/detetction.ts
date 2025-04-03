// stores/detection.ts
import { defineStore } from 'pinia';

export const useDetectionStore = defineStore('detection', {
  state: () => ({
    hand: [],
    pose: [],
    face: [],
    activeModels: ['hand', 'pose', 'face'],
  }),
  actions: {
    setHand(result) {
      this.hand = result;
    },
    setPose(result) {
      this.pose = result;
    },
    setFace(result) {
      this.face = result;
    },
  },
});
