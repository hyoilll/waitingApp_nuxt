import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { AppFooter } from '#components';

describe('AppFooter.vue', () => {
  it('renders footer content properly', () => {
    const wrapper = mount(AppFooter);
    expect(wrapper.text()).toContain('©');
  });
});