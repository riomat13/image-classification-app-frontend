import { restApi } from '../api';

/** Upload image to server
 *  This will not handle error.
 *
 *  @param (string) url, target url to upload
 *  @param (File) file, image blob
 *  @return Object
 */
export const uploadImage = (props) => {
  const { url, file } = props;

  const formData = new FormData();
  formData.append('file', file, file.name);

  return restApi.post(url, formData, {
    timeout: 5000,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
