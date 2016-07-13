import angular from 'angular';
import template from './dashboard.html';
import './dashboard.scss';


let dashboardComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: function(){
    "ngInject";
  },
  controllerAs: 'vm'
};

angular.module('app.dashboard', []).component('dashboard', dashboardComponent);

export default dashboardComponent;
