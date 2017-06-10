import angular from 'angular';
import template from './tester.html';
import './tester.scss';
import './Session';

const testerComponent = {
  bindings: {},
  template,
  controller: function() {
    'ngInject';

    this.name = 'tester';
  },
  controllerAs: 'vm'
};

angular.module('app.components.tester', ['app.services.Session']).component('tester', testerComponent);
export default testerComponent;
