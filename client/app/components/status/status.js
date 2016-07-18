import angular from 'angular';
import template from './status.html';
import './status.scss';

const statusComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: function() {
    'ngInject';
    this.name = 'status';
  },
  controllerAs: 'vm'
};

angular.module('app.status', []).component('status', statusComponent);
export default statusComponent;
