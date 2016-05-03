(function(){
  //declare the root module
  var rootApp = angular.module("rootApp");

  rootApp.controller("logonController",["$scope","$location",function($scope,$location){

      $scope.register = function(){

        var username = $("#usernameInput").val();
        var pwdInput = $("#pwdInput").val();
        var pwdConfirm = $("#pwdConfirm").val();
        var password = "";
        var nickname = $("#nicknameInput").val();
        var userType = $("#userTypeSelect").val();
        // console.log(userType);
        if(pwdInput !== pwdConfirm){
          $('#tips').text("please reconfirm your password");
        }else{
          password = pwdConfirm;
          if(username !== "" && password !== "" && nickname !== "" && userType !== ""){

            $('#tips').text("");

            $.ajax({
              url: "php/userAccess.php",
              type: "POST",
              dataType: "json",
              data: {
                "reqType":"logon",
                "username":username,
                "password":password,
                "nickname":nickname,
                "userType":userType
              },
              success: function(result){
                if(result == "eerror"){
                  $('#tips').text("Username exists!");
                }
                else if(result == "cerror"){
                  $('#tips').text("Opps,sorry for creating account fail, please try again");
                }
                else if(result == "csucceed"){
                  redirectFlag = "1";
                  $('#tips').text("Account created successfully,login");
                  $('#usernameInput').val("");
                  $('#pwdInput').val("");
                  $('#pwdConfirm').val("");
                  $('#nicknameInput').val("");
                  $('#loginBtn_logon').show();
                  $('#logonBtn_logon').attr("disabled",true);
                  $('#logonBtn_logon').attr("class","btn btn-default btn-lg");
                  $('#logonBtn_logon').attr("disabled",true);
                  $('#oauthBtn_logon').attr("disabled",true);
                }
              }
            });
          }
          else{
            $('#tips').text("please input username,password and nickname");
          }
        }

      };

      // show google oauth button
      $("#oauthBtn_logon").click(function(){
        alert("abandon temporarily");
        $("#oauthContainer").toggle(500);
      });

      // back to login view
      $("#loginBtn_logon").click(function(){
        $location.path("html/modules/login.html");
      });

    // });

  }]);

}());
