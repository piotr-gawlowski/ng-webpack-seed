import angular from 'angular';

//IMPORTS
import './login/login';
import './dashboard/dashboard';

const routes = angular.module('app.routes', [
  'app.routes.dashboard',
  'app.routes.login',
]);

export default routes;
