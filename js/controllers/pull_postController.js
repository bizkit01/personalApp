(function(){
  //declare the root module
  var rootApp = angular.module("rootApp");

  rootApp.controller("pull_postControllerInit",["$scope","$location",function($scope,$location){

      $scope.initPost = function(){

        $.ajax({
          url: "php/pull_postAccess.php",
          type: "POST",
          dataType: "json",
          data: {"reqType":"initiatePost"},
          success: function(result){
            // console.log(result);
            $scope.posts = result;
          }
        });
      };

      $scope.initPost();

  }]);

  rootApp.controller("pull_postControllerByTopic",["$scope","$location",function($scope,$location){

      var topicId = localStorage.getItem("topicId");
      $scope.filtPostByTopic = function(){
        $.ajax({
          url: "php/pull_postAccess.php",
          type: "POST",
          dataType: "json",
          data: {"reqType":"topicPost","topicid":topicId},
          success: function(result){
            // console.log(result);
            $scope.posts = result;
          }
        });
      };

      $scope.filtPostByTopic();

  }]);

  rootApp.controller("postOperationController",["$scope","$location",function($scope,$location){

      var userRole = "";

      $scope.initRBAC = function(){
        $scope.$on('loginedUserInfo_toChild',function (event,data) {
          var userInfo = data;
          localStorage.setItem("userId",userInfo.userId);
          localStorage.setItem("userRole",userInfo.userType);
          // console.log(userInfo);
        });

        userRole = localStorage.getItem("userRole");
        // console.log(userRole);
      };

      $scope.initRBAC();



      $scope.showPostDetail = function(post){
        var postId = post.postid;
        $scope.$emit("postDetailShow_toRoot",postId);
      };

      $scope.updatePost = function(post){
        var postId = post.postid;
        if(userRole == "admin" || userRole == "author"){
            localStorage.setItem("postIdtoUpt",postId);
            $location.path("html/modules/postUpdate.html");
        }else{
            alert("only administrator and author can edit post");
        }
      };

      $scope.deletePost = function(post){
        if(userRole == "admin" || userRole == "author"){
          var postId = post.postid;
            $.ajax({
                url: "php/push_postAccess.php",
                type: "POST",
                dataType: "json",
                data: {"reqType":"delete","postId":postId},
                success: function(result){
                  console.log(result);
                  if(result == "derror"){
                    alert("delete error");
                  }else if(result == "dsucceed"){
                    alert("delete succeed");
                    window.location.href = "/";
                  }
                }
            });
        }
        else{
            alert("only administrator and author can delete post");
        }

      };

  }]);

}());
