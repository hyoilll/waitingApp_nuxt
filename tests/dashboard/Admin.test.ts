import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Admin from '@/pages/dashboard/Admin.vue';

describe('Admin.vue', () => {
  it('renders properly', () => {
    const wrapper = mount(Admin);
    expect(wrapper.exists()).toBe(true);
  });
});