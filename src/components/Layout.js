import styled from 'styled-components';

import { Layout as BaseLayout } from 'antd';

const Layout = BaseLayout;

const Header = styled(BaseLayout.Header)`
  &&& {
    position: fixed;
    top: 0;
    height: 64px;
    width: 100%;
    margin: 0;
    padding: 0;
    font-size: 1rem;
    z-index: 1;
  }
`;

const Content = styled(BaseLayout.Content)`
  &&& {
    margin: 0;
    margin-top: 64px;
    padding: 0;
    background: #fff;
  }
`;

export { Layout, Header, Content };
