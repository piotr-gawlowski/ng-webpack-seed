import angular from 'angular';

const <%= name %> = 'yes';

angular.module('<%= APP %>.<%= name %>', []).constant('<%= name %>', <%= name %>);
export default <%= name %>;
