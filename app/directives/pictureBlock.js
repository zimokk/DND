app.directive('pictureBlockDiv', function() {
    return {
        restrict: 'E',
        scope: {
            info: '='
        },
        templateUrl: 'app/templates/directiveTemplates/pictureBlockTmpl.html',
        link: function (scope) {
            scope.info;
        }
    };
});