import angular from 'angular';
import {omit} from 'lodash-es';

//This injector removes the _id from the request body, to prevent MongoDB errors when updating
const bodyCleaningInjector = () => ({
  request: config => omit(config, 'data._id'),
  response: config => config.data,
});

angular.module('app.factories.bodyCleaningInjector', []).factory('bodyCleaningInjector', bodyCleaningInjector);
export default bodyCleaningInjector;
