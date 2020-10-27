import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow } from 'enzyme';

import { ImageUploader } from './ImageUploader';
import { PreviewImage } from './PreviewImage';

describe('ImageUploader()', () => {
  /** Rendered component with image upload */
  const uploadImage = async (onUploaded = () => {}) => {
    const wrapper = shallow(<ImageUploader onUploaded={onUploaded} />);
    expect(wrapper.find(PreviewImage)).toHaveLength(0);

    const blob = new Blob([
      Array(50 * 50 * 3)
        .fill('0')
        .join(''),
    ]);
    const file = new File([blob], 'test.jpg', { type: 'image/jpeg' });

    await act(async () => {
      await wrapper.find('Upload').invoke('beforeUpload')(file);
      await new Promise((resolve) => setImmediate(resolve));
    });

    wrapper.update();
    return [wrapper, file];
  };

  it('render component', () => {
    const wrapper = shallow(<ImageUploader onUploaded={() => {}} />);
    expect(wrapper.find('Button#img-upload-btn')).toHaveLength(1);
    expect(wrapper.find('Button#prediction-btn')).toHaveLength(0);
  });

  it('upload valid image file and execute function with the image', async () => {
    expect.hasAssertions();

    const mockFn = jest.fn();
    const wrapper = shallow(<ImageUploader onUploaded={mockFn} />);
    const blob = new Blob([
      Array(50 * 50 * 3)
        .fill('0')
        .join(''),
    ]);
    const file = new File([blob], 'test.png', { type: 'image/png' });

    await act(async () => {
      await wrapper.find('Upload').invoke('beforeUpload')(file);
      await new Promise((resolve) => setImmediate(resolve));
    });

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith(file);
    // should not pop up alert
    expect(wrapper.find('Alert#img-upload-alert')).toHaveLength(0);
  });

  it('not show submit button and pop up alert if file is not image', async () => {
    expect.hasAssertions();

    const wrapper = shallow(<ImageUploader onUploaded={() => {}} />);
    const blob = new Blob([
      Array(50 * 50 * 3)
        .fill('a')
        .join(''),
    ]);

    await act(async () => {
      await wrapper.find('Upload').invoke('beforeUpload')(
        new File([blob], 'test.txt', { type: 'text/plain' })
      );
      await new Promise((resolve) => setImmediate(resolve));
    });

    expect(wrapper.find('Button#prediction-btn')).toHaveLength(0);
    expect(wrapper.find('Alert#img-upload-alert')).toHaveLength(1);
  });
});
