import React from 'react';
import styled from 'styled-components';

import { Divider } from '../components/Divider';
import { Prediction } from '../components/Prediction';
import { WithFrame } from '../components/WithFrame';
import { ContentDiv, P, Title } from '../components/styles';

const Div = styled.div`
  margin: 0 auto;
  margin-top: 40px;
`;

const Playground = () => {
  return (
    <ContentDiv>
      <Title>Playground</Title>
      <Divider bottom={30} />
      <P>Try out the prediction model to classify dog breed.</P>
      <Div>
        <Prediction />
      </Div>
    </ContentDiv>
  );
};

export default WithFrame(Playground, 'playground', 'Playground');
