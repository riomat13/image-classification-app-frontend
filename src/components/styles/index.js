import styled from 'styled-components';

export const ContentDiv = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  width: 90%;
  max-width: 1000px;
`;

export const Title = styled.h1`
  font-size: 1.7rem;
`;

export const H2 = styled.h3`
  font-size: 1.4rem;
`;

export const H3 = styled.h3`
  font-size: 1.2rem;
`;

export const P = styled.p`
  font-size: 1rem;
`;

export const BtnGroup = styled.div`
  ${(props) =>
    props.center &&
    `
    display: flex;
    justify-content: center;
    `}
  button {
    margin: 10px;
  }
`;
