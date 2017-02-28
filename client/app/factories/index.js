import angular from 'angular';

//IMPORTS
import './bodyCleaningInjector';
import './endpointInjector';

const factories = angular.module('app.factories', [
  'app.bodyCleaningInjector',
  'app.endpointInjector',
]);

export default factories;
