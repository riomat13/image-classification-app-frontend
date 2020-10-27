import { useEffect, useState } from 'react';

/** Hook to upload image
 *  During loading data, the `loading` state is true.
 *
 *  @param (Blob) file, target image file blob
 *  @return (string) src, base64 encoded string containing image data
 *  @return (bool) loading, return true during loading data otherwise false
 */
export const useImageUpload = (file) => {
  const [src, setSrc] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function readFile() {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      // TODO: handle error to upload (set timeout and raise exception)
      while (reader.readyState < 2) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      setSrc(reader.result);
      setLoading(false);
    }

    readFile();
  });

  return [src, loading];
};
