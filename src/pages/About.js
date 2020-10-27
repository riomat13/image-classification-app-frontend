import React from 'react';

import { Divider } from '../components/Divider';
import { ContentDiv, Title, H3 } from '../components/styles';
import { WithFrame } from '../components/WithFrame';

const About = () => {
  return (
    <ContentDiv>
      <Title>About</Title>
      <Divider bottom={30} />
      <H3>
        This is an image classification app. The model is 5-layer simple CNN.
      </H3>
      <H3>
        This model is trained with{' '}
        <a href="http://vision.stanford.edu/aditya86/ImageNetDogs/">
          link(Stanford Dogs Dataset)
        </a>
        .
      </H3>
      <H3>
        The repository is at{' '}
        <a href="https://github.com/riomat13/image-classificaion-app">Github</a>
        .
      </H3>
    </ContentDiv>
  );
};

export default WithFrame(About, 'about', 'About');
