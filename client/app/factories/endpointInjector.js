import angular from 'angular';

//This injector enhances the url with the endpoint of the api server
const endpointInjector = ($q, endpoint) => {
  'ngInject';

  return {
    request: config => {
      config.url = endpoint + config.url;
      return config;
    }
  };
};

angular.module('app.factories.endpointInjector', []).factory('endpointInjector', endpointInjector);
export default endpointInjector;
