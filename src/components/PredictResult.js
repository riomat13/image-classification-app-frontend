import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  min-width: 400px;
`;

const Thead = styled.thead`
  font-size: 1.2rem;
`;

const Tbody = styled.tbody`
  font-size: 1.1rem;
`;

export const PredictResult = (props) => {
  return (
    <Table>
      <Thead>
        <tr>
          <th>Class</th>
          <th>Probability</th>
        </tr>
      </Thead>
      <Tbody>
        {props.result.map((res, idx) => (
          <tr key={idx}>
            <td>{res[0]}</td>
            <td>{res[1]}%</td>
          </tr>
        ))}
      </Tbody>
    </Table>
  );
};

PredictResult.displayName = 'PredictResult';
PredictResult.propTypes = {
  result: PropTypes.arrayOf(PropTypes.array).isRequired,
};
