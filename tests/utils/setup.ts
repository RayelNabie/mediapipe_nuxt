import { vi } from 'vitest';

vi.mock('@/composables/usePoseStorage', () => ({
  usePoseStorage: () => ({
    savePoseData: vi.fn(),
    loadPoseData: vi.fn(),
    clearPoseData: vi.fn(),
  }),
}));
