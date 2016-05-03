(function(){
  //declare the root module
  var rootApp = angular.module("rootApp",["ngRoute","ngAnimate"]);

  rootApp.config(["$routeProvider",function($routeProvider){
    // console.log($routeParams);
    $routeProvider
    .when('/html/modules/login.html',{
      templateUrl : "html/modules/login.html",
      controller : "loginController"
    })
    .when('/html/modules/logon.html',{
      templateUrl : "html/modules/logon.html",
      controller : "logonController"
    })
    .when('/',{
      templateUrl : "html/modules/main_post.html",
      controller : "pull_postControllerInit"
    })
    .when('/html/modules/topic_post.html',{
      templateUrl : "html/modules/topic_post.html",
      controller : "pull_postControllerByTopic"
    })
    .when('/html/modules/postPush.html',{
      templateUrl : "html/modules/postPush.html",
      controller : "postPushController"
    })
    .when('/html/modules/postUpdate.html',{
      templateUrl : "html/modules/postUpdate.html",
      controller : "postUpdateController"
    })
    .when('/html/modules/rbacManage.html',{
      templateUrl : "html/modules/rbacManage.html",
      controller : "rbacManageController"
    });

  }]);


   rootApp.directive("leftBar", function() {
       return {
           templateUrl : "html/sections/leftBar.html"
       };
   });

   rootApp.directive("postSingle", function() {
       return {
           templateUrl : "html/sections/post.html"
       };
   });

   rootApp.directive("postDetail", function() {
       return {
           templateUrl : "html/sections/postDetail.html"
       };
   });

   rootApp.directive("postPush", function() {
       return {
           templateUrl : "html/sections/postPush.html"
       };
   });

   rootApp.directive("commentArea", function() {
       return {
           templateUrl : "html/sections/commentArea.html"
       };
   });

   rootApp.service("postUpdateByTopic",function(){


   });

})();
