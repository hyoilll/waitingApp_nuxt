import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Canceled from '@/pages/dashboard/Canceled.vue';

describe('Canceled.vue', () => {
  it('renders properly', () => {
    const wrapper = mount(Canceled);
    expect(wrapper.exists()).toBe(true);
  });
});