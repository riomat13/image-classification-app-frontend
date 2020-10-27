import React from 'react';
import { PropTypes } from 'prop-types';

import { Image } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';

import { useImageUpload } from './hooks';
import { Loading } from './Loading';

export const PreviewImage = (props) => {
  const [src, loading] = useImageUpload(props.img);

  if (loading) return <Loading size="medium" />;

  return (
    <>
      <Image
        id="upload-img"
        width={400}
        src={src}
        style={{
          border: 'solid 1px #f0f0f0',
        }}
      />
      <h4>
        <PaperClipOutlined />
        {props.img.name}
      </h4>
    </>
  );
};

PreviewImage.displayName = 'PreviewIamge';
PreviewImage.propTypes = {
  /** image file object (blob) */
  img: PropTypes.object.isRequired,
};
