import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { usePoseRenderer } from '@/composables/usePoseRenderer';
import { BaseWebcam } from '#components';

vi.mock('@/composables/usePoseRenderer', () => ({
  usePoseRenderer: vi.fn(),
}));

describe('Webcam.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('rendert video en canvas elementen', () => {
    const wrapper = mount(BaseWebcam);
    expect(wrapper.find('video').exists()).toBe(true);
    expect(wrapper.find('canvas').exists()).toBe(true);
  });

  it('roept usePoseRenderer aan en emit "video-ready"', async () => {
    const fakePoseData = { pose: 'mocked' };

    // Zorg dat de mock ook een callback triggert
    (usePoseRenderer as ReturnType<typeof vi.fn>).mockImplementation((video, canvas, callback) => {
      callback(fakePoseData);
    });

    const wrapper = mount(BaseWebcam);

    await new Promise(resolve => setTimeout(resolve, 0)); // Laat watchEffect triggeren

    expect(usePoseRenderer).toHaveBeenCalledOnce();
    expect(wrapper.emitted('video-ready')).toBeTruthy();
    expect(wrapper.emitted('video-ready')![0]).toEqual([fakePoseData]);
  });
});
