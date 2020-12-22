import React, { FC } from 'react';
import * as paths from './paths';
import { History } from 'history';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ProductPage from '../components/products/ProductPage';

interface AppRouterProps {
  history: History;
}

const AppRouter: FC<AppRouterProps> = ({ history }) => (
  <Router>
    <Switch>
      <Route exact path={paths.MAIN}>
        <ProductPage history={history} />
      </Route>
      <Route path={paths.CART}>
        <div>Cart</div>
      </Route>
    </Switch>
  </Router>
);

export default AppRouter;
