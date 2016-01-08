app.directive('circleBlockDiv', function() {
    return {
        restrict: 'E',
        scope: {
            info: '='
        },
        templateUrl: 'app/templates/directiveTemplates/circleBlockTmpl.html',
        link: function (scope) {
            scope.info;
        }
    };
});