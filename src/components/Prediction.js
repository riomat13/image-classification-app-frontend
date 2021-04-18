import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Alert, Button } from 'antd';

import { ImageUploader } from './ImageUploader';
import { PredictResult } from './PredictResult';
import { BtnGroup, H2 } from './styles';
import { uploadImage } from './utils';
import { PreviewImage } from './PreviewImage';

const ImgDiv = styled.div`
  display: block;
  width: 400px;
  max-width: 90%;
  margin: 0 auto;
`;

const PredictDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const ResDiv = styled.div`
  margin-top: 20px;
  display: block;
`;

const ResTableDiv = styled.div`
  padding: 0 20px;
`;

const RetryBtn = styled.div`
  margin-top: 40px;
`;

export const Prediction = (props) => {
  const [error, setError] = useState();
  const [predicting, setPredicting] = useState(false);
  const [img, setImg] = useState();
  const [result, setResult] = useState();

  // clear all current state and back to initial state
  const resetAllState = () => {
    setError();
    setPredicting(false);
    setImg();
    setResult();
  };

  // submit image and fetch the prediction result
  const handleSubmit = () => {
    setPredicting(true);
    setError();

    uploadImage({ url: `/prediction/${props.model_type}/serve`, file: img })
      .then((resp) => {
        setPredicting(false);
        setResult(resp.data.result);
      })
      .catch(() => {
        setError(
          'Sorry, something wrong. Please retry it later or try with different image.'
        );
        setPredicting(false);
      });
  };

  return (
    <React.Fragment>
      <ImgDiv id="image-group">
        {img ? (
          <PreviewImage img={img} />
        ) : (
          <ImageUploader
            onUploaded={(file) => {
              setImg(file);
            }}
          />
        )}
      </ImgDiv>
      {error && (
        <Alert
          id="prediction-error-alert"
          message={error}
          type="error"
          showIcon
          style={{ margin: '30px auto', width: '80%', maxWidth: '500px' }}
        />
      )}
      <PredictDiv>
        {result ? (
          <ResDiv>
            <H2>Result</H2>
            <ResTableDiv>
              <PredictResult result={result} />
            </ResTableDiv>
            <RetryBtn>
              <Button
                id="clear-prediction-btn"
                onClick={resetAllState}
                style={{ display: 'block', margin: '0 auto' }}
                block
              >
                RETRY
              </Button>
            </RetryBtn>
          </ResDiv>
        ) : img ? (
          <BtnGroup id="prediction-btn-group" center>
            <Button
              id="prediction-btn"
              onClick={handleSubmit}
              loading={predicting}
            >
              PREDICT
            </Button>
            <Button id="reset-img-btn" onClick={resetAllState} danger>
              RESET
            </Button>
          </BtnGroup>
        ) : null}
      </PredictDiv>
    </React.Fragment>
  );
};

Prediction.propTypes = {
  model_type: PropTypes.string.isRequired,
};
Prediction.displayName = 'Prediction';
