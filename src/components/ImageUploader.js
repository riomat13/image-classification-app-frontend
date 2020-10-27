import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import { Alert, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { H3 } from './styles';

const Div = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

export const ImageUploader = (props) => {
  const [error, setError] = useState();

  /** Check if the file is valid image */
  const verifyImage = (file) => {
    if (!file.type.startsWith('image')) {
      setError(`${file.name} is not an image file.`);
    } else {
      props.onUploaded(file);
    }
    // return false to prevent upload by `Upload`
    return false;
  };

  return (
    <React.Fragment>
      {error && (
        <Alert id="img-upload-alert" type="warning" message={error} showIcon />
      )}
      <H3>Select Image</H3>
      <Div>
        <Upload
          name={props.name}
          action=""
          headers={{}}
          beforeUpload={verifyImage}
        >
          <Button id="img-upload-btn" size="large" icon={<UploadOutlined />}>
            Upload
          </Button>
        </Upload>
      </Div>
    </React.Fragment>
  );
};

ImageUploader.displayName = 'ImageUploader';
ImageUploader.propTypes = {
  /** Handle uploaded image if the image file is valid
   *
   *  The argument is a selected image.
   */
  onUploaded: PropTypes.func.isRequired,
};
