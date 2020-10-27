import { PropTypes } from 'prop-types';
import styled from 'styled-components';

export const Divider = styled.div`
  margin-top: ${(props) => props.top}px;
  margin-bottom: ${(props) => props.bottom}px;
  height: 0;
  width: 100%;
  border-bottom: 1px solid #f0f0f0;
`;

Divider.displayName = 'Divider';
Divider.propTypes = {
  top: PropTypes.number,
  bottom: PropTypes.number,
};
Divider.defaultProps = {
  top: 2,
  bottom: 2,
};
