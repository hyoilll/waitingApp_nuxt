import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Header from '@/components/dashboard/Header.vue';

describe('Header.vue', () => {
  it('renders the dashboard header properly', () => {
    const wrapper = mount(Header);
    expect(wrapper.find('h1').exists()).toBe(true);
  });
});