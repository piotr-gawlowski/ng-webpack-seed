import angular from 'angular';
import template from './<%= name %>.html';
import './<%= name %>.scss';

const <%= nameCamelCase %>Component = {
  bindings: {},
  template,
  controller: function() {
    'ngInject';

    this.name = '<%= nameCamelCase %>';
  },
  controllerAs: 'vm'
};

angular.module('<%= APP %>.<%= nameCamelCase %>', []).component('<%= nameCamelCase %>', <%= nameCamelCase %>Component);
export default <%= nameCamelCase %>Component;
