import template from './app.html';
import './app.scss';

let appComponent = {
  template,
  controller: function() {
    'ngInject';
  },
  controllerAs: 'vm'
};

export default appComponent;
