import {extend, has} from 'lodash';

const run = ($rootScope, $state, $stateParams) => {
  'ngInject';

  $rootScope.$state = $state;

  const previous = (fromState, fromParams) => extraParams =>
    $state.go(fromState.name || 'home', extend(fromParams, extraParams || {}));

  $rootScope.$on('$stateChangeStart', (e, toState, toParams) => {
    console.info('To state', toState.name);
    //eslint-disable-next-line no-param-reassign
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
      $state.go(error.redirect, error.params || {});
    }
    console.error(error);
  });
};

export default run;
