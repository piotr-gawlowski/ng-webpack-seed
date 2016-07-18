import angular from 'angular';
import template from './search.html';
import './search.scss';

import $ from 'jquery';

const searchComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: function($scope) {
    'ngInject';
    this.active = false;
    const self = this;
    const deactivate = function(e) {
      if ($(e.target).closest('.search-box').length < 1) {
        self.active = false;
        $scope.$digest();
      }
    };

    $(document).on('click', deactivate);

    this.$onDestroy = function() {
      $(document).off('click', deactivate);
    };

  },
  controllerAs: 'vm'
};

angular.module('app.search', []).component('search', searchComponent);
export default searchComponent;
