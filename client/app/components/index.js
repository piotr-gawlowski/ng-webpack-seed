import angular from 'angular';

//IMPORTS
import './top-bar/top-bar';
import './status/status';
import './timeline/timeline';

let services = angular.module('app.components', [
  'app.timeline',
  'app.status',
  'app.top-bar',
]);

export default services;
