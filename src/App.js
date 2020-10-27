import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { routes } from './routes';
import { BaseStyle } from './components/styles/BaseStyle';
import { Loading } from './components/Loading';

const Error404 = lazy(() => import('./pages/errors/404'));

const App = () => {
  return (
    <React.Fragment>
      <BaseStyle />
      <Suspense fallback={<Loading size="large" />}>
        <Router>
          <Switch>
            {routes.map(({ key, path, exact, Component }) => (
              <Route
                key={key}
                path={path}
                exact={exact}
                render={(props) => <Component {...props} />}
              />
            ))}
            <Route render={() => <Error404 />} />
          </Switch>
        </Router>
      </Suspense>
    </React.Fragment>
  );
};

export default App;
