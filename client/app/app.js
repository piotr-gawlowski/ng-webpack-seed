import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngCookies from 'angular-cookies';
import ngAnimate from 'angular-animate';
import ngMaterial from 'angular-material';
import AppComponent from './app.component';

//require modules
import './services';
import './routes';
import './components';

angular.module('app', [
  uiRouter,
  ngCookies,
  ngAnimate,
  ngMaterial,
  'app.services',
  'app.routes',
  'app.components'
])
  .component('app', AppComponent)
  .config(($locationProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider) => {
    'ngInject';
    $locationProvider.html5Mode(true).hashPrefix('!');

    //define routes
    $stateProvider
      .state('dashboard', {
        url: '/',
        template: '<dashboard></dashboard>'
      });
    $urlRouterProvider.otherwise('/');

    //theme
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('blue-grey');

  }).run(() => {
    'ngInject';

    /* catch if needed
    $rootScope.$on('$stateChangeStart', function(e, toState){

    });
    */

  });
