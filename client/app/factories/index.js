import angular from 'angular';

//IMPORTS
import './bodyCleaningInjector';
import './endpointInjector';

const factories = angular.module('app.factories', [
  'app.factories.bodyCleaningInjector',
  'app.factories.endpointInjector',
]);

export default factories;
