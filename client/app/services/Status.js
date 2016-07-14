import angular from 'angular';

function StatusService(){
  "ngInject";
}

angular.module('app.Status', []).service('Status', StatusService);
export default StatusService;
