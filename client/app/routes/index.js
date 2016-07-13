import angular from 'angular';

//IMPORTS
import './dashboard/dashboard';

let services = angular.module('app.routes', [
  'app.dashboard',
]);

export default services;
