import {each} from 'lodash';

const config = ($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) => {
  'ngInject';

  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  // Add http interceptors
  each(['endpointInjector', 'bodyCleaningInjector'], i => $httpProvider.interceptors.push(i));
};

module.exports = config;
