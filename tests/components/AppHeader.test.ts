import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import { AppHeader } from '#components';
import { setActivePinia, createPinia } from 'pinia';

describe('AppHeader.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia()); // Initialize Pinia
  });

  it('renders header content properly', () => {
    const wrapper = mount(AppHeader);
    expect(wrapper.find('nav').exists()).toBe(true);
  });
});