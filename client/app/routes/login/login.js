import angular from 'angular';
import routeWrap from 'ng-component-routing';
import template from './login.html';
import './login.scss';

const controller = function() {
  'ngInject';

  this.name = 'login';
  this.$onInit = () => {
    console.log(this.resolveSession);
  };
};

const loginComponent = {
  bindings: {},
  routeOpts: {
    name: 'login',
    url: '/login',
    componentBindings: ['resolveSession'],
    resolve: ['resolveSession'],
    pageTitle: 'login',
  },
  template,
  controller,
  controllerAs: 'vm'
};

routeWrap(angular).module('app.routes.login', []).route('login', loginComponent);
export default loginComponent;
