import React, { useEffect } from 'react';

import { Layout, Header, Content } from './Layout';

import { AppBar } from './AppBar';

export const WithFrame = (Component, activeKey, title) => {
  const Wrapper = (props) => {
    useEffect(() => {
      document.title =
        (title ? `${title} - ` : '') + 'Dog Image Classification App';
    });

    return (
      <Layout>
        <Header>
          <AppBar active={activeKey} />
        </Header>
        <Layout>
          <Content>
            <Component {...props} />
          </Content>
        </Layout>
      </Layout>
    );
  };

  Wrapper.displayName = `WithFrame(${Component.displayName || Component.name})`;

  return Wrapper;
};
