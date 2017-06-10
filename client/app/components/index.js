import angular from 'angular';

//IMPORTS
import './test/tester/tester';
import './test/test';

const components = angular.module('app.components', [
  'app.components.test',
  'app.components.tester',
]);

export default components;
