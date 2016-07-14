import angular from 'angular';
import template from './dashboard.html';
import './dashboard.scss';

import * as _ from 'lodash';
import moment from 'moment';


let dashboardComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: function(){
    "ngInject";

	function guid() {
	  function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000)
	      .toString(16)
	      .substring(1);
	  }
	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +s4() + '-' + s4() + s4() + s4();
	}
	var l = 10;
	var a = [];
	var users = [
		{id: 1, name: 'Ruud Havelaar'},
		{id: 2, name: 'Marie Snonkelaar'},
		{id: 3, name: 'Frederik Stijnhaaf'},
		{id: 4, name: 'Fred del Mundo'},
		{id: 5, name: 'Aad Bakkeljauw'}];
	var types = ['transfer', 'malfunction'];
	var malfunctions = {};
	let t = moment();
	for (let n=0; n<l; n++){
		var o = {
			timestamp: t.clone().subtract(n, 'days').unix(),
			reporterId: users[Math.floor(Math.random()*users.length)].id,
			type: types[Math.floor(Math.random()*types.length)]
		};
		switch (o.type){
			case 'transfer':
				o.data = { in: Math.floor(Math.random()*50), out: Math.floor(Math.random()*50) };
				break;
			case 'malfunction':
				if (_.keys(malfunctions).length % 3) {
					// close
					var id = _.keys(malfunctions)[Math.floor(Math.random()*_.keys(malfunctions).length)];
					o.data = { id: id, status: 'close', description: 'bla bla bla' };
				}
				else {
					// open
					var id = guid();
					while (malfunctions[id]){id = guid();}
					malfunctions[id] = 'open';
					o.data = { id: id, status: 'open', description: 'bla bla bla' };
				}
				break;
		}
		a.push(o);
	}

	//console.log(JSON.stringify(a, null, '\t'));

	this.timeline = [
		{
			"timestamp": 1468498694,
			"reporterId": 3,
			"type": "malfunction",
			"data": {
				"id": "10",
				"status": "close",
				"description": "Deck fixed"
			}
		},
		{
			"timestamp": 1468498694,
			"reporterId": 3,
			"type": "malfunction",
			"data": {
				"id": "1",
				"status": "close",
				"description": "Fixed"
			}
		},
		{
			"timestamp": 1468493443,
			"reporterId": 3,
			"type": "malfunction",
			"data": {
				"id": "1",
				"status": "open",
				"description": "bla bla bla"
			}
		},
		{
			"timestamp": 1468320643,
			"reporterId": 1,
			"type": "malfunction",
			"data": {
				"id": "183210b1-688e-d440-84be-c3ee7b5e49ae",
				"status": "open",
				"description": "Major issue"
			}
		},
		{
			"timestamp": 1468234243,
			"reporterId": 5,
			"type": "transfer",
			"data": {
				"in": 22,
				"out": 14
			}
		},
		{
			"timestamp": 1468147843,
			"reporterId": 2,
			"type": "transfer",
			"data": {
				"in": 17,
				"out": 5
			}
		},
		{
			"timestamp": 1468061443,
			"reporterId": 4,
			"type": "transfer",
			"data": {
				"in": 17,
				"out": 52
			}
		},
		{
			"timestamp": 1468051443,
			"reporterId": 4,
			"type": "transfer",
			"data": {
				"in": 22,
				"out": 5
			}
		},
		{
			"timestamp": 1467975043,
			"reporterId": 4,
			"type": "malfunction",
			"data": {
				"id": "0",
				"status": "close",
				"description": "We managed to defend - thanks to army of unicorns"
			}
		},
		{
			"timestamp": 1467888643,
			"reporterId": 1,
			"type": "transfer",
			"data": {
				"in": 46,
				"out": 49
			}
		},
		{
			"timestamp": 1467802243,
			"reporterId": 3,
			"type": "malfunction",
			"data": {
				"id": "0",
				"status": "open",
				"description": "Pirates!"
			}
		},
		{
			"timestamp": 1467852243,
			"reporterId": 3,
			"type": "malfunction",
			"data": {
				"id": "10",
				"status": "open",
				"description": "Deck eaten by bark beatles!"
			}
		},
		{
			"timestamp": 1467715843,
			"reporterId": 3,
			"type": "transfer",
			"data": {
				"in": 22,
				"out": 33
			}
		}
	];

  },
  controllerAs: 'vm'
};

angular.module('app.dashboard', []).component('dashboard', dashboardComponent);

export default dashboardComponent;
