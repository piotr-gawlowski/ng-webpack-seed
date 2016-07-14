import angular from 'angular';

//IMPORTS
import './Status';

let services = angular.module('app.services', [
  'app.Status',
]);

export default services;