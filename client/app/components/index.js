import angular from 'angular';

//IMPORTS
import './test-test123/test-test123';
import './test-test/test-test';

let services = angular.module('app.components', [
  'app.test-test',
  'app.test-test123',
]);

export default services;
