app.controller('textBlockController',["$scope","slideData", function($scope,slideData) {
    $scope.opacityFont = 0;
    $scope.deleteItem = function() {
        var i = 0;
        for(i = 0; i < slideData.length; i++) {
            var k = 0;
            for(k = 0; k < slideData[i].textData.length; k++){
                if(slideData[i].textData[k] == $scope.info) {
                    slideData[i].textData.splice(k,1);
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
    this.changeFontSize = function(){
        var str = $scope.fontSize + "px";
        $scope.info.fontSize = str;
    };
    $scope.upBlock = function(){
        $scope.info.zindex += 1;
    };
    $scope.downBlock = function(){
        if($scope.info.zindex != 0)
            $scope.info.zindex -= 1;
    };
}]);
