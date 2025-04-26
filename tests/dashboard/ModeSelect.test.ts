import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ModeSelect from '@/pages/dashboard/ModeSelect.vue';

describe('ModeSelect.vue', () => {
  it('renders properly', () => {
    const wrapper = mount(ModeSelect);
    expect(wrapper.exists()).toBe(true);
  });
});