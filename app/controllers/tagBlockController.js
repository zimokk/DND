app.controller('tagBlockController',["$scope","slideData", function($scope,slideData) {
    $scope.deleteItem = function() {
        var k = 0;
        for(k = 0; k < slideData[0].tagData.length; k++){
            if(slideData[0].tagData[k] == $scope.info) {
                slideData[0].tagData.splice(k,1);
                break;
            }
        }
    };
}]);
