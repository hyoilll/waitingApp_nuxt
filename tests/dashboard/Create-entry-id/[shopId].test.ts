import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ShopId from '@/pages/dashboard/Create-entry-id/[shopId].vue';

describe('[shopId].vue', () => {
  it('renders properly', () => {
    const wrapper = mount(ShopId);
    expect(wrapper.exists()).toBe(true);
  });
});