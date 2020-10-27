import React from 'react';
import { shallow } from 'enzyme';

import { AppBar } from './AppBar';

describe('AppBar()', () => {
  it('render component', () => {
    const wrapper = shallow(<AppBar />);
    expect(wrapper.find('.appbar-tab-item')).toHaveLength(3);
  });

  it('selected active tab', () => {
    let wrapper;
    ['home', 'about', 'playground'].forEach((key) => {
      wrapper = shallow(<AppBar active={key} />);
      expect(wrapper.find('Menu#appbar').prop('selectedKeys')).toMatchObject([
        key,
      ]);
    });
  });
});
