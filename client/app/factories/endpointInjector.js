import angular from 'angular';
import _ from 'lodash';

//This injector enhances the url with the endpoint of the api server
const endpointInjector = ($q, endpoint) => {
	'ngInject';
	return {
		request: function(config){
			console.log(config.url);
			config.url = endpoint + config.url;
			return config;
		}
	};
};

angular.module('app.endpointInjector', []).factory('endpointInjector', endpointInjector);
export default endpointInjector;
