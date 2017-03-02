import angular from 'angular';

const <%= name %>Service = function() {
  'ngInject';

};

angular.module('<%= APP %>.<%= name %>', []).service('<%= name %>', <%= name %>Service);
export default <%= name %>Service;
