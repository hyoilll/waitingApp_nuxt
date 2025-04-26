import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { SendMailUpdatePw } from '#components';

describe('SendMailUpdatePw.vue', () => {
  it('renders the form properly', () => {
    const wrapper = mount(SendMailUpdatePw);
    expect(wrapper.find('form').exists()).toBe(true);
    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it('emits an event when the form is submitted', async () => {
    const wrapper = mount(SendMailUpdatePw);
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.emitted()).toHaveProperty('submit');
  });
});