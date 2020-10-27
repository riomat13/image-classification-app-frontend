import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Div = styled.div`
  margin: 0;
  padding: 40px;
  width: 100%;
`;

const ErrorTitle = styled.h1`
  font-size: 2rem;
`;

const P = styled.p`
  font-size: 1.1rem;
`;

const Error404 = () => {
  return (
    <Div>
      <ErrorTitle>404 Page Not Found</ErrorTitle>
      <P>
        Go to <Link to="/">home</Link>.
      </P>
    </Div>
  );
};

export default Error404;
