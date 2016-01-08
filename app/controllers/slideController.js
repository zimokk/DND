app.controller('SlideCtrl',["$scope","$upload","slideData","$timeout", function($scope,$upload,slideData,$timeout) {

    $scope.updatePresentations = function() {
        var db = openDatabase('presentationDB', '1.0', 'Description', 2*1024*1024);
        var tempMas = [];
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM present", [], function (tx, result) {
                var count = result.rows.length;
                for (var i = 0; i < count; i++) {
                    tempMas.push(result.rows.item(i).presentName);
                }
                $scope.PresentMas = tempMas;
            });
        });
    };
    $scope.choosePresent = function(data) {
        var db = openDatabase('presentationDB', '1.0', 'Description', 2*1024*1024);
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM present ", [], function (tx, result) {
                var count = result.rows.length;
                for (var i = 0; i < count; i++) {
                    if(result.rows.item(i).presentName == data)
                    {
                        cleanSlideData();
                        setSlideData(JSON.parse(result.rows.item(i).presentBody));
                        $scope.presentationName =  result.rows.item(i).presentName;
                        return;
                    }
                }
            });
        });
    };
    $scope.deletePresent = function (data) {
        if (confirm("Delete?") == true) {
            var db = openDatabase('presentationDB', '1.0', 'Description', 2 * 1024 * 1024);
            db.transaction(function (tx) {
                tx.executeSql('DELETE FROM present WHERE presentName = ?', [data]);
            });
            updatePresentations();
        }
    };
    $scope.showActiveSlide = [];

    $scope.addTag = function(tagName)
    {
        if(tagName != "" && typeof tagName != 'undefined')
        {
            var i = 0;
            for(i = 0; i < slideData[0].tagData.length; i++)
            {
                if(slideData[0].tagData[i] == tagName)
                    return
            }
            slideData[0].tagData.push(tagName);
            $scope.tagName = "";
        }
    };
    function cleanSlideData()
    {
        var i;
        for(i = 0; i < slideData.length; i++)
        {
            var k;
            for(k=0; i<slideData[i].textData.length;k++)
            {
                slideData[i].textData.pop();
            }
            for(k=0; i<slideData[i].pictureData.length;k++)
            {
                slideData[i].pictureData.pop();
            }
            for(k=0; i<slideData[i].videoData.length;k++)
            {
                slideData[i].videoData.pop();
            }
            for(k=0; i<slideData[i].squareData.length;k++)
            {
                slideData[i].squareData.pop();
            }
            for(k=0; i<slideData[i].circleData.length;k++)
            {
                slideData[i].circleData.pop();
            }
        }
        slideData.splice(0,slideData.length);
    }

    function setSlideData(newSlide)
    {
        var i;
        for(i = 0; i < newSlide.length; i++)
        {
            slideData.push(newSlide[i]);
        }
    }
    $scope.add_slide = function(){
        slideData.push({pictureData:[], textData: [], videoData: [],circleData:[],squareData:[],slideData:[],tagData:[], buttonUrl: "",animation: "", index: slideData.length});
    };
    $scope.savePresent = function()
    {
        var db = openDatabase('presentationDB', '1.0', 'Description', 2*1024*1024);

        db.transaction(function (tx){
            tx.executeSql("CREATE TABLE IF NOT EXISTS present ( presentName TEXT(50) PRIMARY KEY, presentBody TEXT(5000))");
        }, error_log);
        if(!$scope.presentationName)
        {
            alert("Enter Name");
        }
        else {
            db.transaction(function (tx) {
                tx.executeSql("SELECT * FROM present", [], function (tx, result) {
                    var count = result.rows.length;
                    for (var i = 0; i < count; i++) {
                        if($scope.presentationName == result.rows.item(i).presentName){
                            if(confirm("Rewrite?") == true) {
                                db.transaction(function (tx){
                                    tx.executeSql('DELETE FROM present WHERE presentName = ?', [result.rows.item(i).presentName]);
                                });
                                db.transaction(function (tx) {
                                    tx.executeSql('INSERT INTO present (presentName, presentBody) VALUES (?, ?)', [$scope.presentationName, JSON.stringify(slideData)]);
                                });
                                updatePresentations();
                            }
                            else {
                                return;
                            }
                            return;
                        }
                    }
                });
            });
            db.transaction(function (tx) {
                tx.executeSql('INSERT INTO present (presentName, presentBody) VALUES (?, ?)', [$scope.presentationName, JSON.stringify(slideData)]);
            });
        }
        function error_log(error)
        {
            console.log(error.message);
        }
    };
    $scope.closeShow = function()
    {
        if($scope.showHide)
            $scope.showHide = false;
        else
            $scope.showHide = true;
        $timeout(function(){
            $scope.showWidth = "0%";
            $scope.showHeight = "0%";},3000);
    };
    $scope.startShow = function()
    {
        $scope.showWidth = "100%";
        $scope.showHeight = "100%";
        if($scope.showHide)
            $scope.showHide = false;
        else
            $scope.showHide = true;
    };
    $scope.contin = function()
    {
        if($scope.index == slideData.length) {
            $scope.index = 0;
            $scope.closeShow();
            $timeout(function(){
                $scope.showBackHeight = "0px";
                $scope.showBackWidth = "0px";},3000)

        }
        else{
            $scope.closeShow();
            console.log($scope.index);
            $timeout(function(){if(typeof slideData[$scope.index].animation != 'undefined' && slideData[$scope.index].animation != '')
                $scope.animationClass = slideData[$scope.index].animation;},3100);
            console.log(slideData[$scope.index].animation);
            $timeout(function(){
                $scope.startShow();
                $scope.activeSlide = slideData[$scope.index];
                $scope.showActiveSlide = $scope.transformForShow();
                $scope.index++;},3500);
            console.log("time");
        }
    };
    $scope.transformForShow = function() {
        var i = 0;
        height = document.body.clientHeight;
        width = document.body.clientWidth;
        var tempSlide = angular.copy($scope.activeSlide);
        if (tempSlide.textData.length > 0) {
            for (i = 0; i < tempSlide.textData.length; i++) {
                tempSlide.textData[i].top = parseInt(tempSlide.textData[i].top.substring(0, tempSlide.textData[i].top.length - 2)) * height / 500;
                tempSlide.textData[i].top += "px";
                tempSlide.textData[i].height = parseInt(tempSlide.textData[i].height.substring(0, tempSlide.textData[i].height.length - 2)) * height / 500;
                tempSlide.textData[i].height += "px";
                tempSlide.textData[i].width = parseInt(tempSlide.textData[i].width.substring(0, tempSlide.textData[i].width.length - 2)) * 10 / 7;
                tempSlide.textData[i].width += "px";
                tempSlide.textData[i].left = parseInt(tempSlide.textData[i].left.substring(0, tempSlide.textData[i].left.length - 2)) * 10 / 7;
                tempSlide.textData[i].left += "px";
                tempSlide.textData[i].fontSize = parseInt(tempSlide.textData[i].fontSize.substring(0, tempSlide.textData[i].fontSize.length - 2)) * (10 / 7 + height / 500) / 2;
                tempSlide.textData[i].fontSize += "px";
            }
        }
        if (tempSlide.pictureData.length > 0) {
            for (i = 0; i < tempSlide.pictureData.length; i++) {

                tempSlide.pictureData[i].top = parseInt(tempSlide.pictureData[i].top.substring(0, tempSlide.pictureData[i].top.length - 2)) * height / 500;
                tempSlide.pictureData[i].top += "px";
                tempSlide.pictureData[i].height = parseInt(tempSlide.pictureData[i].height.substring(0, tempSlide.pictureData[i].height.length - 2)) * height / 500;
                tempSlide.pictureData[i].height += "px";
                tempSlide.pictureData[i].width = parseInt(tempSlide.pictureData[i].width.substring(0, tempSlide.pictureData[i].width.length - 2)) * 10 / 7;
                tempSlide.pictureData[i].width += "px";
                tempSlide.pictureData[i].left = parseInt(tempSlide.pictureData[i].left.substring(0, tempSlide.pictureData[i].left.length - 2)) * 10 / 7;
                tempSlide.pictureData[i].left += "px";
            }
        }
        if (tempSlide.videoData.length > 0) {
            for (i = 0; i < tempSlide.videoData.length; i++) {

                tempSlide.videoData[i].top = parseInt(tempSlide.videoData[i].top.substring(0, tempSlide.videoData[i].top.length - 2)) * height / 500;
                tempSlide.videoData[i].top += "px";
                tempSlide.videoData[i].height = parseInt(tempSlide.videoData[i].height.substring(0, tempSlide.videoData[i].height.length - 2)) * height / 500;
                tempSlide.videoData[i].height += "px";
                tempSlide.videoData[i].width = parseInt(tempSlide.videoData[i].width.substring(0, tempSlide.videoData[i].width.length - 2)) * 10 / 7;
                tempSlide.videoData[i].width += "px";
                tempSlide.videoData[i].left = parseInt(tempSlide.videoData[i].left.substring(0, tempSlide.videoData[i].left.length - 2)) * 10 / 7;
                tempSlide.videoData[i].left += "px";
            }
        }
        if (tempSlide.squareData.length > 0) {
            for (i = 0; i < tempSlide.squareData.length; i++) {
                tempSlide.squareData[i].top = parseInt(tempSlide.squareData[i].top.substring(0, tempSlide.squareData[i].top.length - 2)) * height / 500;
                tempSlide.squareData[i].top += "px";
                tempSlide.squareData[i].height = parseInt(tempSlide.squareData[i].height.substring(0, tempSlide.squareData[i].height.length - 2)) * height / 500;
                tempSlide.squareData[i].height += "px";
                tempSlide.squareData[i].width = parseInt(tempSlide.squareData[i].width.substring(0, tempSlide.squareData[i].width.length - 2)) * 10 / 7;
                tempSlide.squareData[i].width += "px";
                tempSlide.squareData[i].left = parseInt(tempSlide.squareData[i].left.substring(0, tempSlide.squareData[i].left.length - 2)) * 10 / 7;
                tempSlide.squareData[i].left += "px";
            }
        }
        if (tempSlide.circleData.length > 0) {
            for (i = 0; i < tempSlide.circleData.length; i++) {
                tempSlide.circleData[i].top = parseInt(tempSlide.circleData[i].top.substring(0, tempSlide.circleData[i].top.length - 2)) * height / 500;
                tempSlide.circleData[i].top += "px";
                tempSlide.circleData[i].height = parseInt(tempSlide.circleData[i].height.substring(0, tempSlide.circleData[i].height.length - 2)) * height / 500;
                tempSlide.circleData[i].height += "px";
                tempSlide.circleData[i].width = parseInt(tempSlide.circleData[i].width.substring(0, tempSlide.circleData[i].width.length - 2)) * 10 / 7;
                tempSlide.circleData[i].width += "px";
                tempSlide.circleData[i].left = parseInt(tempSlide.circleData[i].left.substring(0, tempSlide.circleData[i].left.length - 2)) * 10 / 7;
                tempSlide.circleData[i].left += "px";
            }
        }
        return(tempSlide);
    };
    $scope.fun = function() {
        if($scope.showWidth == "100%")
            return($scope.contin());
        $scope.showBackHeight = "100%";
        $scope.showBackWidth = "100%";
        if(typeof slideData[$scope.index].animation != 'undefined'  && slideData[$scope.index].animation != '') {
            $scope.animationClass = slideData[$scope.index].animation;
        }
        $timeout(function(){
        $scope.startShow();
        $scope.activeSlide = slideData[0];
        $scope.showActiveSlide =  $scope.transformForShow();
        $scope.index++;},500);
    };

    $scope.setActiveButtonImage = function() {
        html2canvas([document.getElementById('dnd-container')], {
            onrendered: function (canvas) {
                var data = canvas.toDataURL('image/png');
                $scope.activeSlide.buttonUrl = data;
            }
        });
    };

    this.slideMas = slideData;

    this.text = 'text';
    this.picture = "picture";
    this.video = "video";
    this.square = "square";
    this.circle = "circle";

    $scope.index = 0;
    $scope.showHeight = "0px";
    $scope.showWidth = "0px";
    $scope.showBackHeight = "0px";
    $scope.showBackWidth = "0px";
    $scope.showHide = true;
    $scope.PresentMas = [];
    $scope.animationClass = "animation-fade";

    $scope.activeSlide = slideData[0];

    this.setActiveSlide = function(someSlide) {
        $scope.activeSlide = someSlide;
    };

    this.deleteSlide = function(someSlide){
        var i;
        for(i=0; i<slideData.length;i++){
            if(slideData[i] == someSlide){
                slideData.splice(i,1);
                if(slideData.length == 0)
                {
                    $scope.activeSlide = null;
                }
                else
                {
                    $scope.activeSlide = slideData[0];
                }
                break;
            }
        }
    };
    this.dropmodels = [ 'dropmodel1'];


    //---------------------------------------------
    this.dragstart = function(){
        console.log('dragstart', arguments);
    };

    this.drag = function(){
        console.log('drag', arguments);
    };

    this.dragend = function(){
        console.log('dragend', arguments);

        if(!arguments[0]) this.dropped = false;
    };

    this.dragenter = function(dropmodel){
        console.log('dragenter', arguments);
        this.active = dropmodel;
    };

    this.dragover = function(){
        console.log('dragover', arguments);
    };

    this.dragleave = function(){
        console.log('dragleave', arguments);
        this.active = undefined;
    };

    this.drop = function(dragmodel, model){
        console.log('drop', arguments);

        this.dropped = model;
        if(model == "text") {
            $scope.activeSlide.textData.push({index: $scope.activeSlide.textData.length+1, info:"Enter New Text Here",
                top: "0px", left: "0px", width: "100px", height: "100px",transform:0,fontSize:"10px", zindex:0});
        }
        else if(model == "picture") {
            if(!document.getElementById("pictureFile").files[0]) {
                alert("Choose picture");
            }
            else {
                $upload.upload({
                    url: "https://api.cloudinary.com/v1_1/zimokk/upload",
                    data: {upload_preset: "gdm3kidu", tags: 'myphotoalbum', context: 'photo=myfoto'},
                    file: document.getElementById("pictureFile").files[0]
                }).success(function (data, status, headers, config) {
                    data.context = {custom: {photo: 'myfoto'}};
                    $scope.activeSlide.pictureData.push({index: $scope.activeSlide.pictureData.length + 1,
                        info: data.url, top: "px", left: "px", width: "100px", height: "100px",transform:0,zindex:0});
                });
            }
        }
        else if(model == "video") {
            videoUrl = this.videoUrl;
            if(!videoUrl) {
                alert("choose file");
            }
            else {
                videoUrl = videoUrl.replace("watch?v=", "embed/");
                $scope.activeSlide.videoData.push({index: $scope.activeSlide.videoData.length + 1,
                    info: videoUrl,top: "0px", left: "0px", width: "100px", height: "100px",transform:0, zindex:0});
            }
        }
        else if(model == "square") {
            $scope.activeSlide.squareData.push({index: $scope.activeSlide.squareData.length+1, info:"white",
                top: "0px", left: "0px", width: "100px", height: "100px",transform:0, zindex:0});
        }
        else if(model == "circle") {
            $scope.activeSlide.circleData.push({index: $scope.activeSlide.circleData.length+1, info:"white",
                top: "0px", left: "0px", width: "100px", height: "100px",transform:0, zindex:0});
        }
        $scope.setActiveButtonImage();
    };

    this.isDropped = function(model){
        return this.dropped === model;
    };

    this.isActive = function(model){
        return this.active === model;
    };

    //-------------------------------
    this.onSortStart = function () {
        console.log('sort start');
    };

    this.onSort = function () {
        console.log('sort');
    };

    this.onSortChange = function () {
        console.log('sortchange');
    };

    this.onSortEnd = function () {
        console.log('sort end');
    };
    this.onSortEnter = function () {
        console.log('sortenter');
    };
}]);