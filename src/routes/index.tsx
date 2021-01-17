import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Dashboard from '../pages/Dashboard';
import OrdersList from '../pages/OrdersList';
import ProductsList from '../pages/ProductsList';
import Profile from '../pages/Profile';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />
    <Route path="/forgot-password" exact component={ForgotPassword} />
    <Route path="/reset-password" exact component={ResetPassword} />

    <Route path="/dashboard" exact component={Dashboard} isPrivate />
    <Route path="/orders" exact component={OrdersList} isPrivate />
    <Route path="/products" exact component={ProductsList} isPrivate />
    <Route path="/profile" exact component={Profile} isPrivate />
  </Switch>
);
export default Routes;
