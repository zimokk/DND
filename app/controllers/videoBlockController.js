app.controller('videoBlockController',["$scope","slideData","$sce", function($scope,slideData,$sce) {
    $scope.opacityButton = 0;
    $scope.deleteItem = function() {
        var i = 0;
        for(i = 0; i < slideData.length; i++) {
            var k = 0;
            for(k = 0; k < slideData[i].videoData.length; k++){
                if(slideData[i].videoData[k] == $scope.info) {
                    slideData[i].videoData.splice(k,1);
                    break;
                }
            }
        }
    };
    this.setResizedData = function (top, left, width, height, transform) {
        $scope.info.top = top;
        $scope.info.left = left;
        $scope.info.width = width;
        $scope.info.height = height;
        $scope.info.transform = transform;
    };
    this.trustMe = function(src) {
        return $sce.trustAsResourceUrl(src);
    };

    $scope.upBlock = function(){
        $scope.info.zindex += 1;
    };
    $scope.downBlock = function(){
        if($scope.info.zindex != 0)
            $scope.info.zindex -= 1;
    };
}]);