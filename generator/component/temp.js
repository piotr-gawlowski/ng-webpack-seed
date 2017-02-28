import angular from 'angular';
import template from './<%= name %>.html';
import './<%= name %>.scss';

const <%= nameCamelCase %>Component = {
  bindings: {},
  template,
  controller: function() {
    'ngInject';
    this.name = '<%= name %>';
  },
  controllerAs: 'vm'
};

angular.module('<%= APP %>.<%= name %>', []).component('<%= nameCamelCase %>', <%= nameCamelCase %>Component);
export default <%= nameCamelCase %>Component;
