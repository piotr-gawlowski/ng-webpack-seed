import angular from 'angular';
import _ from 'lodash';

const run = ($rootScope, $state, $stateParams) => {
  'ngInject';
  $rootScope.$state = $state;

  const previous = (fromState, fromParams) => extraParams => {
    return $state.go(fromState.name || 'home', _.extend(fromParams, extraParams || {}));
  };

  $rootScope.$on('$stateChangeStart', function (e, toState, toParams) {
    console.info('To state', toState.name);
    $stateParams = _.extend($stateParams, toParams);
  });

  $rootScope.$on('$stateChangeSuccess', (e, toState, toParams, fromState, fromParams) => {
    window.scrollTop = 0;
    $state.previous = previous(fromState, fromParams);
  });

  $rootScope.$on('$stateChangeError', (e, toState, toParams, fromState, fromParams, error) => {
    e.preventDefault();
    if(_.has(error, 'redirect')) {
      console.info('Redirecting to', error.redirect);
      return $state.go(error.redirect, error.params || {});
    }
    console.error(error);
  });
};

export default run;