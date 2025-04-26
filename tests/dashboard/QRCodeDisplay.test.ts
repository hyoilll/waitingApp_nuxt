import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import QRCodeDisplay from '@/pages/dashboard/QRCodeDisplay.vue';

describe('QRCodeDisplay.vue', () => {
  it('renders properly', () => {
    const wrapper = mount(QRCodeDisplay);
    expect(wrapper.exists()).toBe(true);
  });
});