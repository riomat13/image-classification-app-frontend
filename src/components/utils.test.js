import { uploadImage } from './utils';
import { restApi } from '../api';

jest.mock('../api');

describe('uploadImage()', () => {
  it('send image', () => {
    const data = {
      data: { result: 'success' },
    };

    let formData;
    let options;

    restApi.post.mockImplementationOnce((...inputs) => {
      // inputs are [url, data, options]
      formData = inputs[1];
      options = inputs[2];
      return data;
    });

    const blob = new Blob(
      [
        Array(50 * 50 * 3)
          .fill('0')
          .join(''),
      ],
      { type: 'image/jpeg' }
    );
    const file = new File([blob], 'test.jpg', { type: 'image/jpeg' });

    const resp = uploadImage({ file, url: '/tmp' });

    expect(resp.data.result).toBe('success');
    expect(formData.get('file')).toMatchObject(file);
    expect(options.headers).toMatchObject({
      'Content-Type': 'multipart/form-data',
    });
  });
});
