import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, shallow } from 'enzyme';

import { ImageUploader } from './ImageUploader';
import { Prediction } from './Prediction';
import { PredictResult } from './PredictResult';
import { PreviewImage } from './PreviewImage';
import * as utils from './utils';

describe('Prediction()', () => {
  const blob = new Blob([
    Array(50 * 50 * 3)
      .fill('0')
      .join(''),
  ]);
  const img = new File([blob], 'test.png', { type: 'image/png' });

  /** Create component in a state where an image is uploaded */
  const setupComponentWithImage = async () => {
    const wrapper = mount(<Prediction />);

    await act(async () => {
      // upload image
      wrapper.find(ImageUploader).invoke('onUploaded')(img);
      await new Promise((resolve) => setImmediate(resolve));
    });

    wrapper.update();
    return wrapper;
  };

  const checkInitialState = (wrapper) => {
    expect(wrapper.find(ImageUploader)).toHaveLength(1);
    expect(wrapper.find(PreviewImage)).toHaveLength(0);
    expect(wrapper.find(PredictResult)).toHaveLength(0);
  };

  it('render component in initial state', () => {
    const wrapper = shallow(<Prediction />);
    checkInitialState(wrapper);
  });

  it('render after select image', async () => {
    expect.hasAssertions();
    const wrapper = await setupComponentWithImage();

    expect(wrapper.find(PreviewImage)).toHaveLength(1);
    expect(wrapper.find('button#prediction-btn')).toHaveLength(1);
    expect(wrapper.find('button#reset-img-btn')).toHaveLength(1);
  });

  it('reset selected image and back to initial state', async () => {
    expect.hasAssertions();
    const wrapper = await setupComponentWithImage();

    await act(async () => {
      wrapper.find('button#reset-img-btn').simulate('click');
      await new Promise((resolve) => setImmediate(resolve));
    });

    wrapper.update();

    checkInitialState(wrapper);
  });

  it('submit selected image and get prediction', async () => {
    expect.hasAssertions();
    const wrapper = await setupComponentWithImage();

    const result = [
      ['A', 40.0],
      ['B', 10.0],
      ['C', 5.0],
    ];

    const mockUpload = jest.spyOn(utils, 'uploadImage');
    mockUpload.mockImplementation(() => {
      return new Promise((resolve) => {
        resolve({ data: { result } });
      });
    });

    expect(wrapper.find(PredictResult)).toHaveLength(0);

    await act(async () => {
      wrapper.find('button#prediction-btn').simulate('click');
      await new Promise((resolve) => setImmediate(resolve));
    });

    wrapper.update();

    expect(wrapper.find(PredictResult)).toHaveLength(1);
    expect(wrapper.find(PredictResult).prop('result')).toMatchObject(result);
  });

  it('clear all prediction result after click retry button', async () => {
    expect.hasAssertions();
    const wrapper = await setupComponentWithImage();

    const mockUpload = jest.spyOn(utils, 'uploadImage');
    mockUpload.mockImplementation(() => {
      return new Promise((resolve) => {
        resolve({ data: { result: [] } });
      });
    });

    expect(wrapper.find('button#clear-prediction-btn')).toHaveLength(0);

    // send request to make prediction
    await act(async () => {
      wrapper.find('button#prediction-btn').simulate('click');
      await new Promise((resolve) => setImmediate(resolve));
    });

    wrapper.update();

    expect(wrapper.find('button#clear-prediction-btn')).toHaveLength(1);

    // click target RETRY button and clear all result
    await act(async () => {
      wrapper.find('button#clear-prediction-btn').simulate('click');
      await new Promise((resolve) => setImmediate(resolve));
    });

    wrapper.update();
    expect(wrapper.find('button#clear-prediction-btn')).toHaveLength(0);
    checkInitialState(wrapper);
  });

  it('handle error when prediction request fails', async () => {
    const wrapper = await setupComponentWithImage();
    expect.hasAssertions();

    const mockUpload = jest.spyOn(utils, 'uploadImage');
    mockUpload.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        reject('Mock Error');
      });
    });

    expect(wrapper.find('button#clear-prediction-btn')).toHaveLength(0);

    // send request to make prediction
    await act(async () => {
      wrapper.find('button#prediction-btn').simulate('click');
      await new Promise((resolve) => setImmediate(resolve));
    });

    wrapper.update();

    // alert should be popped up when error occured during request
    expect(wrapper.find('Alert#prediction-error-alert')).toHaveLength(1);

    // clicking reset button after failed should also get back to initial state
    await act(async () => {
      wrapper.find('button#reset-img-btn').simulate('click');
      await new Promise((resolve) => setImmediate(resolve));
    });

    wrapper.update();

    checkInitialState(wrapper);
  });
});
