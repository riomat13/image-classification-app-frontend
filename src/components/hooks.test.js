import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import { useImageUpload } from './hooks';

describe('useImageUpload()', () => {
  const Component = () => {
    const blob = new Blob([
      Array(50 * 50 * 3)
        .fill('0')
        .join(''),
    ]);

    const [_, loading] = useImageUpload(
      new File([blob], 'test.png', { type: 'image/png' })
    );

    if (loading) return <p id="loading">Loading</p>;
    return <p id="src">Loaded</p>;
  };

  it('return loading = true before finishing load image', () => {
    const wrapper = mount(<Component />);
    // have to be called to start loading
    expect(wrapper.find('p#loading')).toHaveLength(1);
    expect(wrapper.find('p#src')).toHaveLength(0);
  });

  it('update state after finished loading', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(<Component />);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    wrapper.update();

    expect(wrapper.find('p#loading')).toHaveLength(0);
    expect(wrapper.find('p#src')).toHaveLength(1);
  });
});
