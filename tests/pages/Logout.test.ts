import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Logout from '@/pages/Logout.vue';

describe('Logout.vue', () => {
  it('renders properly', () => {
    const wrapper = mount(Logout);
    expect(wrapper.exists()).toBe(true);
  });

  it('calls handleLogout when the logout button is clicked', async () => {
    const mockRouterPush = vi.fn();
    const mockClearUser = vi.fn();
    const mockSignOut = vi.fn().mockResolvedValue({ error: null });

    vi.mock('vue-router', () => ({
      useRouter: () => ({ push: mockRouterPush }),
    }));

    vi.mock('@/stores/user', () => ({
      useUserStore: () => ({ clearUser: mockClearUser }),
    }));

    vi.mock('@supabase/supabase-js', () => ({
      useSupabaseClient: () => ({ auth: { signOut: mockSignOut } }),
    }));

    const wrapper = mount(Logout);

    window.confirm = vi.fn(() => true); // Mock confirm dialog

    await wrapper.find('button').trigger('click');

    expect(mockSignOut).toHaveBeenCalled();
    expect(mockClearUser).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalledWith('/');
  });
});