import React, { FC } from 'react';
import * as paths from './paths';
import { History } from 'history';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductPage from '../components/products/ProductPage';
import DashboardLayout from '../components/dashboard/layout/DashboardLayout';
import CartPage from '../components/cart/CartPage';

interface AppRouterProps {
  history: History;
}

interface RouteType {
  path: string;
  name: string;
  exact?: boolean;
  Component: any;
  Layout?: any;
}

const routes: RouteType[] = [
  {
    path: paths.MAIN,
    name: 'Products Page',
    exact: true,
    Component: ProductPage,
    Layout: DashboardLayout,
  },
  {
    path: paths.CART,
    name: 'Cart',
    exact: true,
    Component: CartPage,
    Layout: DashboardLayout,
  },
];

const AppRouter: FC<AppRouterProps> = ({ history }) => {
  console.log(history);
  return (
    <Router>
      <Switch>
        {routes.map(({ path, Component, Layout, exact }) => {
          const WrappedComponent = Layout ? (
            <Layout>
              <Component history={history} />
            </Layout>
          ) : (
            <Component history={history} />
          );

          return (
            <Route
              key={path}
              exact={exact}
              path={path}
              component={() => WrappedComponent}
            />
          );
        })}
      </Switch>
    </Router>
  );
};

export default AppRouter;
