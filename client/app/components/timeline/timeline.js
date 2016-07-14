import angular from 'angular';
import template from './timeline.html';
import './timeline.scss';

import * as _ from 'lodash';
import moment from 'moment';

let timelineComponent = {
  restrict: 'E',
  bindings: {
  	data: '<'
  },
  template,
  controller: function(){
    "ngInject";
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
        transfers: true,
        done: true
    };

    this.toggle = (e, day, isStrict) => {
      e.preventDefault();
      e.stopPropagation();

      if(isStrict && day.$$active) return;
      day.$$active = !day.$$active;
    };

    this.$onInit = () => {
      this.timeline = [];

      //transform data 
      let now = moment();

      _.each(this.data, (d) => {
        d.$$when = moment(d.timestamp * 1000).calendar(null, calendar);
      });

      let events = _.groupBy(this.data, 'type');

      let temp =[];
      let grouped = _.groupBy(this.data, '$$when');

      let rows = _.max(_.map(_.values(_.groupBy(events.malfunction, '$$when')), (g) => g.length));

      let gm = _.groupBy(events.malfunction, (m) => {
        return m.data.id;
      });
      let k = 0;
      let idx = {};
      _.each(grouped, (day) => {
          let transfers = _.sumBy(day, (d) => d.data.in + d.data.out);
          let dayStart = moment.unix(_.minBy(day, 'timestamp').timestamp);

          let issues = [];
          let i = 0;
          _.each(gm, (issue, key) => {

            let open = _.find(day, (i) => i.data.status === 'open' && i.data.id === key);
            let close = _.find(day, (i) => i.data.status === 'close' && i.data.id === key);

            if((close && close.data.id === key) || (open && open.data.id === key)) {
              issues[i] = {event: true, id: key};
              issues[i].open = !!open;
              issues[i].close = !!close;
              issues[i].single = ((close && close.data.id === key) && (open && open.data.id === key)) || issue.length == 1;
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
          k++;
      });

      this.timeline = _.orderBy(temp, 'when').reverse();
      console.log(this.timeline);
    }
  },
  controllerAs: 'vm'
};

angular.module('app.timeline', []).component('timeline', timelineComponent);
export default timelineComponent;
