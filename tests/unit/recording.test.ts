import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import MediapipeIndex from '@/pages/mediapipe/index.vue';

describe('Recording Component', () => {
  it('should show the start button initially', async () => {
    const wrapper = mount(MediapipeIndex);
    expect(wrapper.text()).toContain('Start Recording');
  });

  it('should start and stop recording on button click', async () => {
    const wrapper = mount(MediapipeIndex);
    const button = wrapper.find('button');

    await button.trigger('click');
    expect(wrapper.text()).toContain('Stop Recording');

    await button.trigger('click');
    expect(wrapper.text()).toContain('Start Recording');
  });
});
