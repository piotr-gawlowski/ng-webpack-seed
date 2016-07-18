import angular from 'angular';

const StatusService = function() {
  'ngInject';
};

angular.module('app.Status', []).service('Status', StatusService);
export default StatusService;
