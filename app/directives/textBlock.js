app.directive('textBlockDiv', function() {
    return {
        restrict: 'E',
        scope: {
            info: '='
        },
        templateUrl: 'app/templates/directiveTemplates/textBlockTmpl.html',
        link: function (scope) {
            scope.info;
        }
    };
});