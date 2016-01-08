app.controller('circleBlockController',["$scope","slideData", function($scope,slideData) {

    $scope.blockColor =  $scope.info.info;
    $scope.opacityButton = 0;
    $scope.deleteItem = function() {
        var i = 0;
        for(i = 0; i < slideData.length; i++) {
            var k = 0;
            for(k = 0; k < slideData[i].circleData.length; k++){
                if(slideData[i].circleData[k] == $scope.info) {
                    slideData[i].circleData.splice(k,1);
                    break;
                }
            }
        }
    };
    $scope.getRadius = function()
    {
        var tmpWidth = parseInt($scope.info.width.substring(0, $scope.info.width.length - 2));
        var tmpHeight = parseInt($scope.info.height.substring(0, $scope.info.height.length - 2));
        var strReturn = "" + tmpWidth + "px/" + tmpHeight + "px";
        return(strReturn);

    };
    this.setResizedData = function(top,left,width,height,transform)
    {
        $scope.info.top = top;
        $scope.info.left = left;
        $scope.info.width = width;
        $scope.info.height = height;
        $scope.info.transform = transform;
    };

    $scope.upBlock = function(){
        $scope.info.zindex += 1;
    };
    $scope.downBlock = function(){
        if($scope.info.zindex != 0)
            $scope.info.zindex -= 1;
    };
}]);