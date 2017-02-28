import angular from 'angular';
import routeWrap from 'ng-component-routing';
import template from './dashboard.html';
import './dashboard.scss';

const controller = function() {
  'ngInject';

  this.name = 'dashboard';
};

const dashboardComponent = {
  bindings: {},
  routeOpts: {
    name: 'dashboard',
    url: '/',
    pageTitle: 'dashboard',
  },
  template,
  controller,
  controllerAs: 'vm'
};

routeWrap(angular).module('app.routes.dashboard', []).route('dashboard', dashboardComponent);
export default dashboardComponent;
