import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { Modal } from '#components';

describe('Modal.vue', () => {
  it('renders properly when passed props', () => {
    const wrapper = mount(Modal, {
      props: {
        title: 'Test Modal',
        visible: true,
      },
    });
    expect(wrapper.text()).toContain('Test Modal');
    expect(wrapper.isVisible()).toBe(true);
  });

  it('hides when visible is false', () => {
    const wrapper = mount(Modal, {
      props: {
        title: 'Test Modal',
        visible: false,
      },
    });
    expect(wrapper.isVisible()).toBe(false);
  });
});