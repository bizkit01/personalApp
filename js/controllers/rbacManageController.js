(function(){
  //declare the root module
  var rootApp = angular.module("rootApp");

  rootApp.controller("rbacManageController",["$scope","$location",function($scope,$location){

         var userId = "";
         var userRole = "";
         $scope.init = function(){
           $.ajax({
             url: "php/userAccess.php",
             type: "POST",
             dataType: "json",
             data: {"reqType":"pull_allUserInfo"},
             success: function(result){
                 $scope.users = result;
                //  console.log(result);
             }
           });
         }

         $scope.init();

         $scope.update = function(userid){
           $("#userRoleSelect").show();
           userId = userid;
          //  console.log(userRole);
           if(userRole == null || userRole == "")
           {
             $scope.tips = "select user role you want to change to";
           }
         };

         $("#userRoleSelect").change(function(){
             $("#userRoleUptConfirmBtn").show();
         });

         $scope.confirm = function(){
           userRole = $("#userRoleSelect").val();
           $.ajax({
             url: "php/userAccess.php",
             type: "POST",
             dataType: "json",
             data: {"reqType":"userRoleUpdt","userId":userId,"userType":userRole},
             success: function(result){
                 if(result == "uerror"){
                   $scope.tips = "change user role error";
                 }else if(result == "usucceed"){
                   $(".tips").text("change user role succeed");
                   setTimeout(function(){
                     window.location.href = "/";
                   },1000);

                 }

             }
           });
         };

  }]);


}());
