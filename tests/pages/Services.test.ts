import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Services from '@/pages/Services.vue';

describe('Services.vue', () => {
  it('renders properly', () => {
    const wrapper = mount(Services);
    expect(wrapper.exists()).toBe(true);
  });
});