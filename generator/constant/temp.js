import angular from 'angular';

const <%= name %> = 'constant';

angular.module('<%= APP %>.<%= name %>', []).constant('<%= name %>', <%= name %>);
export default <%= name %>;
