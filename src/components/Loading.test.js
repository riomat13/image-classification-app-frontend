import React from 'react';
import { shallow } from 'enzyme';

import { Loading } from './Loading';

describe('Loading()', () => {
  it('render component', () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper.find('Spin')).toHaveLength(1);
  });

  it('prop size defined by ["small", "medium", "large"] has to be in order', () => {
    // get font-size passed to loading icon
    const getIconFontSize = (wrapper) => {
      return wrapper.find('Spin').prop('indicator').props.style.fontSize;
    };

    const sm = shallow(<Loading size="small" />);

    const md = shallow(<Loading size="medium" />);
    const lg = shallow(<Loading size="large" />);

    expect(getIconFontSize(md)).toBeGreaterThan(getIconFontSize(sm));
    expect(getIconFontSize(lg)).toBeGreaterThan(getIconFontSize(md));
  });
});
