import { test, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Webcam from '@/components/base/Webcam.vue'; // Verander dit naar je eigen pad naar Webcam component

test('should receive pose data from webcam', async () => {
  const webcamData = { hand: [], pose: [], face: [] };
  const emitSpy = vi.fn();

  const wrapper = mount(Webcam, {
    props: {
      videoReady: emitSpy,
    },
  });

  await wrapper.vm.$nextTick();
  expect(emitSpy).toHaveBeenCalledWith(webcamData);
});
