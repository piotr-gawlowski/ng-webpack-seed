import angular from 'angular';
import {extend, has} from 'lodash';

const run = ($rootScope, $state, $stateParams) => {
  'ngInject';
  $rootScope.$state = $state;

  const previous = (fromState, fromParams) => extraParams => {
    return $state.go(fromState.name || 'home', extend(fromParams, extraParams || {}));
  };

  $rootScope.$on('$stateChangeStart', function (e, toState, toParams) {
    console.info('To state', toState.name);
    $stateParams = extend($stateParams, toParams);
  });

  $rootScope.$on('$stateChangeSuccess', (e, toState, toParams, fromState, fromParams) => {
    window.scroll(0, 0);
    $state.previous = previous(fromState, fromParams);
  });

  $rootScope.$on('$stateChangeError', (e, toState, toParams, fromState, fromParams, error) => {
    e.preventDefault();
    if(has(error, 'redirect')) {
      console.info('Redirecting to', error.redirect);
      return $state.go(error.redirect, error.params || {});
    }
    console.error(error);
  });
};

export default run;
