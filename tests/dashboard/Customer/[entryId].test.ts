import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import EntryId from '@/pages/dashboard/Customer/[entryId].vue';

describe('[entryId].vue', () => {
  it('renders properly', () => {
    const wrapper = mount(EntryId);
    expect(wrapper.exists()).toBe(true);
  });
});