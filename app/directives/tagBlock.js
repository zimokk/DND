app.directive('tagBlockDiv', function() {
    return {
        restrict: 'E',
        scope: {
            info: '='
        },
        templateUrl: 'app/templates/directiveTemplates/tagBlockTmpl.html',
        link: function (scope) {
            scope.info;
        }
    };
});