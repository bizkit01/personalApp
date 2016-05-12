(function(){
  //declare the root module
  var rootApp = angular.module("rootApp");

  rootApp.controller("rootController",["$scope","$location",function($scope,$location,$rootScope){

    $scope.$on('loginedUserInfo_toRoot',function(event,data){
        //  console.log(data);
        var loginedUserInfo = data;
        $scope.$broadcast("loginedUserInfo_toChild",loginedUserInfo);
    });

    $scope.$on('postDetailShow_toRoot',function(event,data){
        //  console.log(data);
        var postId = data;
        $scope.$broadcast("postDetailShow_toChild",postId);
    });

  }]);


  rootApp.controller("leftBarController",["$scope","$location",function($scope,$location){

    // important: I have no idear why the jQuery and Javascript functions are both unavailable at init() function
    // whatever you use $() or document.getElementById(), it cannot get the element dom object from leftBar.html
    // but angular is available at here, it could bind the data to leftBar.html
    // why???????????? I hope I could figure it out in the future, or maybe just forget it,hahaha
    // $(document).ready(function(){
        $('#id_leftBarBtn').click(function(){
           $('#id_leftBar').toggle(200);
        });

         $scope.topicAddBtnHide = true;
         $scope.topicOptBtnHide = true;
         var nickname = "rabbit";
         var loginStatue = "logouted";
         var userRole = "";
         var topicId = "";
         var addUptConfirmFlag = "";

        $scope.init = function(){
          $.ajax({
            url: "php/topicAccess.php",
            type: "POST",
            dataType: "json",
            data: {"reqType":"getTopics"},
            success: function(result){
              // console.log(result);
              $scope.topics = result;
              // emit the topic list to root controller

            }
          });

          // important: two ways to save data which could be call by different js file

          // initiate 1: the nickname of leftbar from cookie(be reserved forever excepet clear)
          // var cookieStr = document.cookie;
          // if(cookieStr !== ""){
          //   var charStart = cookieStr.indexOf("{");
          //   var charEnd = cookieStr.lastIndexOf("}");
          //   var cookieJsonStr = cookieStr.substring(charStart,charEnd+1);
          //   // console.log(cookieJsonStr);
          //   var cookieJsonObj = JSON.parse(cookieJsonStr);
          //   // set nickname of leftbar
          //   if(nickname !== ""){
          //     $scope.nickname = nickname;
          //     // $("#id_nickname").html(nickname);
          //   }
          //   else{
          //     $scope.nickname = "rabbit";
          //     // $("#id_nickname").html("rabbit");
          //   }
          //   // console.log(nickname);
          // }

          // initiate 2: initiate nickname of leftbar from localStorage(be reserved only in this session)
          nickname = localStorage.getItem("nickname");
          if(nickname !== ""){
            $scope.nickname = nickname;
            // $("#id_nickname").html(nickname);
          }
          else{
            $scope.nickname = "rabbit";
            // $("#id_nickname").html("rabbit");
          }

          $scope.$on('loginedUserInfo_toChild',function(event,data){
              var userInfo = data;
              localStorage.setItem("userId",userInfo.userId);
              localStorage.setItem("userRole",userInfo.userType);
          });

          $.ajax({
            url: "php/userAccess.php",
            type: "POST",
            dataType: "json",
            data: {"reqType":"initiate"},
            success: function(result){
              // console.log(result);
              if(result[0].loginstatue !== null){
                loginStatue = result[0].loginstatue;
                // console.log(loginStatue);
                // set user login statue
                if(loginStatue == "logined"){

                  var userId = localStorage.getItem("userId");
                  userRole = localStorage.getItem("userRole");
                  $scope.accountBtnDisabled = false;

                  $scope.loginBtn = "signout";
                  if(userRole == "admin"){
                    $scope.postBtnDisabled = false;
                    $scope.userMngBtnDisabled = false;
                    $scope.topicBtnDisabled = false;
                  }else if(userRole == "moderator"){
                    $scope.postBtnDisabled = true;
                    $scope.userMngBtnDisabled = false;
                    $scope.topicBtnDisabled = false;
                  }else if(userRole == "author"){
                    $scope.postBtnDisabled = false;
                    $scope.userMngBtnDisabled = true;
                    $scope.topicBtnDisabled = true;
                  }else if(userRole == "normal"){
                    $scope.postBtnDisabled = true;
                    $scope.userMngBtnDisabled = true;
                    $scope.topicBtnDisabled = true;
                  }


                }
                else if(loginStatue == "logouted"){
                  $scope.loginBtn = "signin";
                  $scope.nickname = "rabbit";
                  localStorage.setItem("userId","");
                  localStorage.setItem("userRole","");
                  $scope.postBtnDisabled = true;
                  $scope.userMngBtnDisabled = true;
                  $scope.topicBtnDisabled = true;
                  $scope.topicOptBtnHide = true;
                  $scope.accountBtnDisabled = true;
                }
              }
              else{
                $scope.loginBtn = "signin";
                $scope.nickname = "rabbit";
                localStorage.setItem("userId","");
                localStorage.setItem("userRole","");
                $scope.postBtnDisabled = true;
                $scope.userMngBtnDisabled = true;
                $scope.topicBtnDisabled = true;
                $scope.topicOptBtnHide = true;
                $scope.accountBtnDisabled = true;
              }
            }
          });

        };

        $scope.init();

        $scope.login_out = function(){
          //login
          if(loginStatue == "logouted"){
            $location.path("html/modules/login.html");
          }
          //logout
          else if(loginStatue == "logined"){

            $.ajax({
              url: "php/userAccess.php",
              type: "POST",
              dataType: "json",
              data: {"reqType":"logout"},
              success: function(result){
                console.log(result);
                if(result[0].loginstatue == "logouted"){
                  localStorage.setItem("userId","");
                  localStorage.setItem("userRole","");
                  window.location.href = "/";

                }
              }
            });
          }
          else{
            alert("what happened");
          }
        };

        $scope.post = function(){
          $location.path("html/modules/postPush.html");
        }

        $scope.userManage = function(){
          $location.path("html/modules/rbacManage.html");
        }

        $scope.topicManage = function(){
          $scope.topicAddBtnHide = !$scope.topicAddBtnHide;
          $scope.topicOptBtnHide = !$scope.topicOptBtnHide;
        }

        $scope.accountManage = function(){
          alert("abandon temporarily");
        }

        $scope.topicSelected_post = function(topic){

          var topicId = topic.topicid;
          localStorage.setItem("topicId",topicId);
          $location.path("html/modules/topic_post.html");
          location.reload();
        };

       $scope.addTopic = function(){
         $scope.topicAddUptInputHide = !$scope.topicAddUptInputHide;
         $scope.topicName = "";
         $("#id_topicAddUptInput").attr("placeholder","add topic");
         addUptConfirmFlag = "addTopic";
       }

        $scope.updateTopic = function(topic){
          topicId = topic.topicid;
          $scope.topicName = topic.topicname;
          $scope.topicAddUptInputHide = !$scope.topicAddUptInputHide;
          addUptConfirmFlag = "updateTopic";
        }

        $scope.inputConfirm = function(){
          var topicName = $scope.topicName;
          var userId = localStorage.getItem("userId");

          if(addUptConfirmFlag == "addTopic"){
            $.ajax({
              url: "php/topicAccess.php",
              type: "POST",
              dataType: "json",
              data: {
                "reqType":"addTopic",
                "topicName":topicName,
                "topicType":"1",
                "userId":userId
              },
              success: function(result){
                if(result == "csucceed"){
                    alert("add topic succeed");
                    location.reload();
                }else if(result == "cerror"){
                  alert("add topic error");
                }
              }
            });
          }else if(addUptConfirmFlag == "updateTopic"){
            $.ajax({
              url: "php/topicAccess.php",
              type: "POST",
              dataType: "json",
              data: {
                "reqType":"updateTopic",
                "topicId":topicId,
                "topicName":topicName,
                "topicType":"1",
                "userId":userId
              },
              success: function(result){
                if(result == "usucceed"){
                    alert("update topic succeed");
                    location.reload();
                }else if(result == "uerror"){
                  alert("update topic error");
                }
              }
            });
          }

        }

        $scope.deleteTopic = function(topic){
          var topicId = topic.topicid;

          $.ajax({
            url: "php/topicAccess.php",
            type: "POST",
            dataType: "json",
            data: {"reqType":"deleteTopic","topicId":topicId},
            success: function(result){
              if(result == "dsucceed"){
                  alert("delete topic succeed");
                  location.reload();
              }else if(result == "derror"){
                alert("delete topic error");
              }
            }
          });

        }

        $scope.showAllpost = function(){
          $location.path("/");
        }
    // });

  }]);

}());
