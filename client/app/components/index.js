import angular from 'angular';

//IMPORTS
import './search/search';
import './top-bar/top-bar';
import './status/status';
import './timeline/timeline';

const services = angular.module('app.components', [
  'app.timeline',
  'app.status',
  'app.topBar',
  'app.search',
]);

export default services;
