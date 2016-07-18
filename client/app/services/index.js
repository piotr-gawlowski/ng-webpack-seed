import angular from 'angular';

//IMPORTS
import './Status';

const services = angular.module('app.services', [
  'app.Status',
]);

export default services;
