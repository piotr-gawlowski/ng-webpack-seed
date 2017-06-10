import angular from 'angular';
import template from './test.html';
import './test.scss';

const testComponent = {
  bindings: {},
  template,
  controller: function() {
    'ngInject';

    this.name = 'test';
  },
  controllerAs: 'vm'
};

angular.module('app.components.test', []).component('test', testComponent);
export default testComponent;
