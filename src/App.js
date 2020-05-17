import React from 'react';
import Layout from '../src/hoc/Layout/Layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import { Route, Switch } from 'react-router-dom';
import Auth from '../src/containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
