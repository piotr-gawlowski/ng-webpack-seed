import angular from 'angular';

//IMPORTS
import './endpoint';

const constants = angular.module('app.constants', [
  'app.constants.endpoint',
]);

export default constants;
