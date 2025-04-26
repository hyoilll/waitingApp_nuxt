import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { PageTitle } from '#components';

describe('PageTitle.vue', () => {
  it('renders the title properly', () => {
    const wrapper = mount(PageTitle, {
      props: {
        title: 'Test Title',
      },
    });
    expect(wrapper.text()).toContain('Test Title');
  });
});