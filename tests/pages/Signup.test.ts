import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Signup from '@/pages/Signup.vue';

describe('Signup.vue', () => {
  it('renders properly', () => {
    const wrapper = mount(Signup);
    expect(wrapper.exists()).toBe(true);
  });

  it('calls submitForm when the form is submitted', async () => {
    const mockRouterPush = vi.fn();
    const mockFetch = vi.fn().mockResolvedValue({});

    vi.stubGlobal('$fetch', mockFetch);
    vi.mock('vue-router', () => ({
      useRouter: () => ({ push: mockRouterPush }),
    }));

    const wrapper = mount(Signup);

    await wrapper.find('form').trigger('submit.prevent');

    expect(mockFetch).toHaveBeenCalledWith('/api/signup', {
      method: 'post',
      body: {
        email: '',
        password: '',
        shopName: '',
      },
    });
    expect(mockRouterPush).toHaveBeenCalledWith('/login');
  });
});