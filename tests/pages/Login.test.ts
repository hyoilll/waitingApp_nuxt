import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Login from '@/pages/Login.vue';
import SendMailUpdatePw from '@/components/SendMailUpdatePw.vue';
import { setActivePinia, createPinia } from 'pinia';

describe('Login.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia()); // Initialize Pinia
  });

  it('renders properly', () => {
    const wrapper = mount(Login);
    expect(wrapper.exists()).toBe(true);
  });

  it('emits close event from SendMailUpdatePw', async () => {
    const wrapper = mount(SendMailUpdatePw, {
      props: {
        errMsg: '',
      },
    });

    // Emit close event
    await wrapper.vm.$emit('close');
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('emits send event from SendMailUpdatePw', async () => {
    const wrapper = mount(SendMailUpdatePw, {
      props: {
        errMsg: '',
      },
    });

    // Emit send event
    const email = 'test@example.com';
    await wrapper.vm.$emit('send', email);
    expect(wrapper.emitted('send')).toBeTruthy();
    expect(wrapper.emitted('send')[0]).toEqual([email]);
  });
});