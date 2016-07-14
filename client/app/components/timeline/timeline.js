import angular from 'angular';
import template from './timeline.html';
import './timeline.scss';

let timelineComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: function(){
    "ngInject";
    this.name = 'timeline';
  },
  controllerAs: 'vm'
};

angular.module('app.timeline', []).component('timeline', timelineComponent);
export default timelineComponent;
