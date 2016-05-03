(function(){
  //declare the root module
  var rootApp = angular.module("rootApp");

  rootApp.controller("postUpdateController",["$scope","$location",function($scope,$location){

    var postId = "";
    $scope.initPostDetail = function(){
      $.ajax({
        url: "php/topicAccess.php",
        type: "POST",
        dataType: "json",
        data: {"reqType":"getTopics"},
        success: function(result){
          // console.log(result);
          $scope.topics = result;
        }
      });

      // important: I have no idea why the postid broadcast from postOperationController when click update button could
      // not be received at here. But the logined user infomation broadcast from loginController could
      // be received by postOperationController to initialize the RBAC of every single post, the postUpdateController
      // and postOperationController are loginController are all ng-view, why postOperationController and loginController
      // could communicate by broadcast, but the postOperationController and postUpdateController coudl not communicate,
      // rediculous

      // $scope.$on('postDetailUpt_toChild',function (event,data) {
      //   var postIdtoUpt = data;
      //   localStorage.setItem("postIdtoUpt",postIdtoUpt);
      // });

      // here I could only use localStorage to communicate
      postId = localStorage.getItem("postIdtoUpt");
      // console.log(postId);
      $.ajax({
        url: "php/pull_postDetailAccess.php",
        type: "POST",
        dataType: "json",
        data: {"reqType":"postInitToUpt","postId":postId},
        success: function(result){
          // console.log(result);
          $scope.postDetailUpt = result[0];
          $scope.postTitle = result[0].posttitle;
          $scope.postTopicId = result[0].topicid;
          $scope.postContent = result[0].postcontent;
        }
      });


    };

    $scope.initPostDetail();

    $scope.update = function(){

      var postTitle = $scope.postTitle;
      var topicId = $scope.postTopicId;
      var postContent = $scope.postContent;
      var userId = localStorage.getItem("userid");

      if(postTitle == null || topicId == null || postContent == null || userId == null
        ||postTitle == "" || topicId == "" || postContent == "" || userId == "")
      {
        alert("every item is required");
      }
      else{
        $.ajax({
          url: "php/push_postAccess.php",
          type: "POST",
          dataType: "json",
          data: {
            "reqType":"update",
            "postId":postId,
            "postTitle":postTitle,
            "topicId":topicId,
            "postContent":postContent,
          },
          success: function(result){
            // console.log(result);
            if(result == "uerror"){
              alert("update error");
            }else if(result == "usucceed"){
              alert("update succeed");
              window.location.href = "/";
            }
          }
        });
      }

    };

    $scope.clear = function(){
      $scope.postTitle = "";
      $scope.postTopicId = "";
      $scope.postContent = "";
    }


  }]);


}());
