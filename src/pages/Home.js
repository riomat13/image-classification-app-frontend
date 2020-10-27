import React from 'react';

import { Link } from 'react-router-dom';

import { Divider } from '../components/Divider';
import { ContentDiv, H3, Title } from '../components/styles';
import { WithFrame } from '../components/WithFrame';

const Home = () => {
  return (
    <ContentDiv>
      <Title>Dog image classification app</Title>
      <Divider bottom={60} />
      <H3>
        Go to <Link to="/playground">PLAYGROUND</Link>
      </H3>
    </ContentDiv>
  );
};

export default WithFrame(Home, 'home');
