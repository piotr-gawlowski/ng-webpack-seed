import angular from 'angular';
import template from './timeline.html';
import './timeline.scss';

import * as _ from 'lodash';
import $ from 'jquery';
import moment from 'moment';

const timelineComponent = {
  restrict: 'E',
  bindings: {
    data: '<'
  },
  template,
  controller: function() {
    'ngInject';
    const calendar = {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'MMMM D',
      lastDay: '[Yesterday]',
      lastWeek: 'MMMM D',
      sameElse: 'MMMM D'
    };

    this.filters = {
      issues: true,
      done: false
    };

    this.toggleIssues = () => {

    };

    this.users = {
      1: 'Ruud Havelaar',
      2: 'Marie Snonkelaar',
      3: 'Frederik Stijnhaaf',
      4: 'Fred del Mundo'
    };

    this.open = (e, day) => {
      if(!e.isDefaultPrevented()) {
        day.$$active = true;
      }
    };

    this.close = (e, day) => {
      if(day.$$active) {e.preventDefault();}
      day.$$active = false;
    };

    this.$onInit = () => {
      this.timeline = [];

      //transform data
      _.each(this.data, d => {
        d.$$when = moment(d.timestamp * 1000).calendar(null, calendar);
      });

      const events = _.groupBy(this.data, 'type');

      const temp = [];
      const grouped = _.groupBy(this.data, '$$when');
      const gm = _.groupBy(events.malfunction, m => {
        return m.data.id;
      });
      const idx = {};
      _.each(grouped, day => {
        const transfers = _.sumBy(day, d => d.data.in + d.data.out);
        const dayStart = moment.unix(_.minBy(day, 'timestamp').timestamp);

        const issues = [];
        let i = 0;

        _.each(day, d => {
          d.$$time = moment.unix(d.timestamp).format('HH:mm');
        });

        _.each(gm, (issue, key) => {

          const open = _.find(day, i => i.data.status === 'open' && i.data.id === key);
          const close = _.find(day, i => i.data.status === 'close' && i.data.id === key);

          if((close && close.data.id === key) || (open && open.data.id === key)) {
            issues[i] = {event: true, id: key};
            issues[i].open = Boolean(open);
            issues[i].close = Boolean(close);
            issues[i].single = ((close && close.data.id === key) && (open && open.data.id === key)) || issue.length === 1;
            idx[i] = issues[i].close && !issues[i].single;

          } else {
            issues[i] = {hide: !idx[i]};
          }

          i++;
        });

        temp.push({
          transfers,
          issues,
          when: dayStart.unix(),
          $$when: dayStart.calendar(null, calendar),
          events: day
        });
      });

      this.timeline = _.orderBy(temp, 'when').reverse();
    };
  },
  controllerAs: 'vm'
};


angular.module('app.timeline', [])
  .component('timeline', timelineComponent)
  .filter('closedFilter', function() {

    return function(input, bool) {
      let list = input;
      if(!bool) {
        list = _.filter(input, e => e.single && !e.close);
      }

      return list;
    };

  });
export default timelineComponent;
