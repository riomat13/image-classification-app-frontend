import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

import { Menu } from 'antd';

import { routes } from '../routes';

export const AppBar = (props) => {
  return (
    <Menu
      id="appbar"
      selectedKeys={[props.active]}
      mode="horizontal"
      theme="dark"
    >
      {routes.map(({ key, label, path }) => (
        <Menu.Item className="appbar-tab-item" key={key}>
          <Link to={path}>{label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

AppBar.displayName = 'AppBar';
AppBar.propTypes = {
  /** Active tab key on the appbar */
  active: PropTypes.string,
};
