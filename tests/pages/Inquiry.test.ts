import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Inquiry from '@/pages/Inquiry.vue';

describe('Inquiry.vue', () => {
  it('renders properly', () => {
    const wrapper = mount(Inquiry);
    expect(wrapper.exists()).toBe(true);
  });
});