(function(){
  //declare the root module
  var rootApp = angular.module("rootApp");

  rootApp.controller("loginController",["$scope","$location",function($scope,$location){
    // $(document).ready(function() {
      //user login
      $('#loginBtn_login').click(function(){
        var username = $('#usernameInput').val();
        var password = $('#pwdInput').val();

        if(username == "" || password == ""){
          $('#tips').text("please inpute both your username and password");
        }
        else{
          // open a new window at here would be defined as the action which is taken by user, browser would not stop it
          // window.open("user_loggedin.html");

          $.ajax({
            url: "php/userAccess.php",
            type: "POST",
            dataType: "json",
            data: {"reqType":"login","username":username,"password":password},
            success: function(result){
              // console.log(result);
              if(result[0].backmessage == "lerror"){
                $('#tips').text("Username or password is wrong!");
              }
              else if(result[0].backmessage == "lsucceed"){
                $('#tips').text("Login successfully");

                // set up cookie for user information
                var userId = result[0].userid;
                var nickname = result[0].nickname;
                var userType = result[0].usertype;

                localStorage.setItem("userid", userId);
                localStorage.setItem("nickname",nickname);

                //emit userid and usertype to rootController
                $scope.$emit("loginedUserInfo_toRoot",{"userId":userId,"userType":userType});

                // var cookieJsonStr = '{"userid":"'+userid+'", "nickname":"'+nickname+'"}';
                // document.cookie = cookieJsonStr;
                setTimeout(function(){
                  window.location.href = "/";
                  // $location.path("/");
                  // open a new window at here would be defined as the automatic action, because it is execute in ajax succed call back function, browser would stop it
                  // window.open("user_loggedin.html");
                },1000);

              }
            }
          });
        }
      });

      //user logon
      $scope.logon = function(){
          $location.path("html/modules/logon.html");
      };


      // important: it cannot redirect to another view from a view by updating the url in jQuery way
      // you have to use a angular function(en:ng-click) to do this. The reason is unknow untill now

      // $('#logonBtn_login').click(function(m){
      //   location.replace("html/modules/logon.html");
      //   console.log($location);
      // });

    // });
  }]);

}());
