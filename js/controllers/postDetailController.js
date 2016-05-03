(function(){
  //declare the root module
  var rootApp = angular.module("rootApp");

  rootApp.controller("postDetailController",["$scope","$location",function($scope,$location){

      $scope.$on('postDetailShow_toChild',function (event,data) {
         var postId = data;
        //  console.log(postId);
         $.ajax({
           url: "php/pull_postDetailAccess.php",
           type: "POST",
           dataType: "json",
           data: {"reqType":"postDetail","postId":postId},
           success: function(result){
             var postDetail = result[0];
            //  console.log(postDetail);
            $(".postDetail_title").text(postDetail.posttitle);
            $("#postDetail_author").text(postDetail.nickname);
            $("#postDetail_time").text(postDetail.posttime);
            $(".postDetail_content").text(postDetail.postcontent);
            // console.log(title);
             $("#blackLayer").show();
             $("#postDetail").toggle(200);
           }
         });
      });

      $scope.close = function(){
        $("#blackLayer").hide();
        $("#postDetail").toggle(200);
      }

  }]);


}());
