import angular from 'angular';
import template from './<%= name %>.html';
import './<%= name %>.scss';

let <%= name %>Component = {
  restrict: 'E',
  bindings: {},
  template,
  controller: function(){
    "ngInject";
    this.name = '<%= name %>';
  },
  controllerAs: 'vm'
};

angular.module('<%= APP %>.<%= name %>', []).component('<%= name %>', <%= name %>Component);
export default <%= name %>Component;
