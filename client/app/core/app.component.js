import template from './app.html';
import './app.scss';

const appComponent = {
  template,
  controller: function() {
    'ngInject';
  },
  controllerAs: 'vm'
};

export default appComponent;
