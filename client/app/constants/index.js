import angular from 'angular';

//IMPORTS
import './endpoint';

const constants = angular.module('app.constants', [
  'app.endpoint',
]);

export default constants;
