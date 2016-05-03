(function(){
  //declare the root module
  var rootApp = angular.module("rootApp");

  rootApp.controller("postPushController",["$scope","$location",function($scope,$location){

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

    $scope.submit = function(){

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
            "reqType":"insert",
            "postTitle":postTitle,
            "topicId":topicId,
            "postContent":postContent,
            "userId":userId
          },
          success: function(result){
            console.log(result);
            if(result == "cerror"){
              alert("post error");
            }else if(result == "csucceed"){
              alert("post succeed");
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
