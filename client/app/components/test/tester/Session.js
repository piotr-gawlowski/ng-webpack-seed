import angular from 'angular';

const SessionService = function($q) {
  'ngInject';

  this.check = () => $q.resolve('ho');
};

angular.module('app.services.Session', []).service('Session', SessionService);
export default SessionService;
