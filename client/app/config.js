import angular from 'angular';
import _ from 'lodash';

const config = ($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) => {
	'ngInject';
	$locationProvider.html5Mode(true).hashPrefix('!');
	$urlRouterProvider.otherwise('/');

	// Add http interceptors
	_.each(['endpointInjector', 'bodyCleaningInjector'], i => $httpProvider.interceptors.push(i));
};

module.exports = config;