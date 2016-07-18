import angular from 'angular';

let <%= name %>Service = function() {
  "ngInject";
};

angular.module('<%= APP %>.<%= name %>', []).service('<%= name %>', <%= name %>Service);
export default <%= name %>Service;
