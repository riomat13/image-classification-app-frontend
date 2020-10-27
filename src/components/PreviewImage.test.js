import React from 'react';
import { mount, shallow } from 'enzyme';

import * as hooks from './hooks';
import { PreviewImage } from './PreviewImage';
import { Loading } from './Loading';

describe('PreviewImage()', () => {
  const blob = new Blob([
    Array(50 * 50 * 3)
      .fill('0')
      .join(''),
  ]);
  const img = new File([blob], 'test.png', { type: 'image/png' });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('render component', () => {
    const mockUploadHook = jest.spyOn(hooks, 'useImageUpload');
    mockUploadHook.mockReturnValueOnce([null, false]);

    const wrapper = shallow(<PreviewImage img={img} />);

    expect(wrapper.find('Image#upload-img')).toHaveLength(1);
  });

  it('render Loading component during loading', () => {
    const mockUploadHook = jest.spyOn(hooks, 'useImageUpload');
    mockUploadHook.mockReturnValueOnce([null, true]);

    const wrapper = mount(<PreviewImage img={img} />);

    expect(mockUploadHook).toHaveBeenCalledTimes(1);
    expect(wrapper.find(Loading)).toHaveLength(1);
  });
});
