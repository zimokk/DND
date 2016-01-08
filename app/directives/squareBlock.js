app.directive('squareBlockDiv', function() {
    return {
        restrict: 'E',
        scope: {
            info: '='
        },
        templateUrl: 'app/templates/directiveTemplates/squareBlockTmpl.html',
        link: function (scope) {
            scope.info;
        }
    };
});