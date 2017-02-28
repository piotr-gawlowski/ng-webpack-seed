import angular from 'angular';

//IMPORTS
import './dashboard/dashboard';

const routes = angular.module('app.routes', [
  'app.dashboard',
]);

export default routes;
