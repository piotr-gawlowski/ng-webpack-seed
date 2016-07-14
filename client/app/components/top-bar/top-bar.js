import angular from 'angular';
import template from './top-bar.html';
import './top-bar.scss';

let topBarComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: function(){
    "ngInject";
    this.name = 'top-bar';
  },
  controllerAs: 'vm'
};

angular.module('app.top-bar', []).component('topBar', topBarComponent);
export default topBarComponent;
