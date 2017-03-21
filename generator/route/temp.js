import angular from 'angular';
import routeWrap from 'ng-component-routing';
import template from './<%= name %>.html';
import './<%= name %>.scss';

const controller = function() {
  'ngInject';

  this.$onInit = () => {
    //bindings available here
  };
};

const <%= name %>Component = {
  bindings: {},
  routeOpts: {
    name: '<%= name %>',
    url: '/<%= name %>',
    //componentBindings: [],
    //resolve: [],
    pageTitle: '<%= name %>',
  },
  template,
  controller,
  controllerAs: 'vm'
};

routeWrap(angular).module('<%= APP %>.<%= name %>', []).route('<%= name %>', <%= name %>Component);
export default <%= name %>Component;
