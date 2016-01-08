app.directive('slideBlockDiv', function() {
    return {
        restrict: 'E',
        scope: {
            info: '='
        },
        templateUrl: 'app/templates/directiveTemplates/slideBlockTmpl.html',
        link: function (scope) {
            scope.info;
        }
    };
});