import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Div = styled.div`
  position: relative;
  font-size: 1.8rem;
  top: 40%;
  transform: translateY(-50%);
`;

export const Loading = (props) => {
  const fontSize =
    props.size === 'small' ? 24 : props.size === 'medium' ? 36 : 48;
  return (
    <Div>
      <Spin
        style={{ display: 'block', margin: '0 auto' }}
        indicator={<LoadingOutlined style={{ fontSize }} spin />}
      />
    </Div>
  );
};

Loading.displayName = 'Loading';
Loading.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};
Loading.defaultProps = {
  size: 'small',
};
