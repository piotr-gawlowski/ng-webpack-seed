import angular from 'angular';
import template from './dashboard.html';
import './dashboard.scss';
import * as _ from 'lodash';

const dashboardComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: function() {
    'ngInject';

    const day = 24*3600*1000; //eslint-disable-line

    const guid = function() {
      const s4 = function() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      };

      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };


    const l = 40;
    const a = [];
    const users = [
  {id: 1, name: 'Ruud Havelaar'},
  {id: 2, name: 'Marie Snonkelaar'},
  {id: 3, name: 'Frederik Stijnhaaf'},
  {id: 4, name: 'Fred del Mundo'},
  {id: 5, name: 'Aad Bakkeljauw'}];
    const types = ['transfer', 'malfunction', 'transfer', 'transfer', 'transfer'];
    const malfunctions = {};
    let t = new Date().getTime() - (l * 24 * 3600 * 1000);

    for (let n = 0; n < l; n++) {
      const o = {
        timestamp: Math.round(t / 1000),
        reporterId: users[Math.floor(Math.random() * users.length)].id,
        type: types[Math.floor(Math.random() * types.length)]
      };
      switch (o.type) {
      case 'transfer':
        o.data = {in: Math.floor(Math.random() * 50), out: Math.floor(Math.random() * 50)};
        break;
      case 'malfunction':
        if (_.keys(malfunctions).length > 3) {
        // close
          const id = _.keys(malfunctions)[Math.floor(Math.random() * _.keys(malfunctions).length)];
          o.data = {id: id, status: 'close', description: 'bla bla bla'};
          delete malfunctions[id];
        } else {
        // open
          let id = guid();
          while (malfunctions[id]) {id = guid();}
          malfunctions[id] = 'open';
          o.data = {id: id, status: 'open', description: 'bla bla bla'};
        }
        break;
      }
      a.push(o);
      t += Math.round(Math.random() * (6 * day) / 5);
    }
    this.timeline = a.reverse();

    //console.log(JSON.stringify(this.timeline, null, '\t'));
  },
  controllerAs: 'vm'
};

angular.module('app.dashboard', []).component('dashboard', dashboardComponent);

export default dashboardComponent;
