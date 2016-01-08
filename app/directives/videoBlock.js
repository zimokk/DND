app.directive('videoBlockDiv', function() {
    return {
        restrict: 'E',
        scope: {
            info: '='
        },
        templateUrl: 'app/templates/directiveTemplates/videoBlockTmpl.html',
        link: function (scope) {
            scope.info;
        }
    };
});