import angular from 'angular';

function <%= name %>Service(){
  "ngInject";
}

angular.module('<%= APP %>.<%= name %>', []).service('<%= name %>', <%= name %>Service);
export default <%= name %>Service;
