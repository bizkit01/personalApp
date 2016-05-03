(function(){
  //declare the root module
  var rootApp = angular.module("rootApp");

  rootApp.controller("commentAreaController",["$scope","$location",function($scope,$location){

    var postId = "";
    var userId = "";
    var userRole = "";
    var commmentContent = "";

    $scope.$on('postDetailShow_toChild',function (event,data) {
      postId = data;
      //  console.log(postId);
      $scope.commentShow = false;
    });

    $scope.$on('loginedUserInfo_toChild',function (event,data) {
      var userInfo = data;
      localStorage.setItem("userId",userInfo.userId);
      localStorage.setItem("userRole",userInfo.userType);
      // console.log(userInfo);
    });

    $scope.submit = function(){
      userId = localStorage.getItem("userId");
      userRole = localStorage.getItem("userRole");
      commentContent = $("#id_commentInput").val();
      console.log(commentContent);
      console.log(userRole);

      if(commentContent == ""){
         alert("comment is required");
      }
      else if(userRole == "normal" || userRole == "admin"){
          $.ajax({
            url: "php/push_commentAccess.php",
            type: "POST",
            dataType: "json",
            data: {"reqType":"insert","userId":userId,"postId":postId,"commentContent":commentContent},
            success: function(result){
              console.log(result);
              if(result == "cerror"){
                   alert("comment failed");
              }else if(result == "csucceed"){
                   alert("comment submitted");
              }
            }
          });
        }else{
          alert("only normal user and administrator can comment");
        }
    };

    $scope.clear = function(){
       $scope.commentInput = "";
    };

    $scope.loadComments = function(){
      // console.log(postId);
      $.ajax({
        url: "php/pull_commentAccess.php",
        type: "POST",
        dataType: "json",
        data: {"reqType":"commentByPost","postId":postId},
        success: function(result){
           console.log(result);
          $scope.comments = result;
          $scope.commentShow = true;
          //  console.log($scope);
        }
      });
    }

  }]);

}());
