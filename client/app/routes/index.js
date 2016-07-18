import angular from 'angular';

//IMPORTS
import './dashboard/dashboard';

const services = angular.module('app.routes', [
  'app.dashboard',
]);

export default services;
