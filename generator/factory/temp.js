import angular from 'angular';

const <%= name %> = function() {
  'ngInject';

};

angular.module('<%= APP %>.<%= name %>', []).factory('<%= name %>', <%= name %>);
export default <%= name %>;
