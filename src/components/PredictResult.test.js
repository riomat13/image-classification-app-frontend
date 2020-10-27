import React from 'react';
import { shallow } from 'enzyme';

import { PredictResult } from './PredictResult';

describe('PredictResult()', () => {
  const result = [
    ['Type 1', 43.22],
    ['Type 2', 32.09],
    ['Type 3', 10.86],
  ];
  it('render component', () => {
    const wrapper = shallow(<PredictResult result={result} />);
  });
});
