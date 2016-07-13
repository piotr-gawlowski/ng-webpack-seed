import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngCookies from 'angular-cookies';
import ngAnimate from 'angular-animate';
import ngTouch from 'angular-touch';
import fileBase64 from 'angular-base64-upload';
import AppComponent from './app.component';

//require modules
import './services';
import './routes';
import './components'

angular.module('app', [
    uiRouter,
    ngCookies,
    ngTouch,
    ngAnimate,
    fileBase64,
    'app.services',
    'app.routes',
    'app.components'
  ])
  .component('app', AppComponent)
  .config(($locationProvider, $stateProvider, $urlRouterProvider) => {
    "ngInject";
    $locationProvider.html5Mode(true).hashPrefix('!');

    //define routes
    $stateProvider
      .state('dashboard', {
        url: '/',
        template: '<dashboard></dashboard>'
      });
    $urlRouterProvider.otherwise('/');

  }).run(() => {
    "ngInject";

    /* catch if needed
    $rootScope.$on('$stateChangeStart', function(e, toState){

    });
    */

  });
