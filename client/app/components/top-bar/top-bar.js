import angular from 'angular';
import template from './top-bar.html';
import './top-bar.scss';

const topBarComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: function() {
    'ngInject';
    this.settings = () => {
      console.log('hello');
    };
  },
  controllerAs: 'vm'
};

angular.module('app.topBar', []).component('topBar', topBarComponent);
export default topBarComponent;
