function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  // console.log("ID Token: " + id_token);
};

// $(document).ready(function() {
$("#oauthBtn").click(function(){

alert();

  var username = id_token;

      $.ajax({
        url: "userHandler.php",
        type: "POST",
        dataType: "json",
        data: {"reqType":"logon","username":username},
        success: function(result){
            oauthLoginFunc();
        }
      });

  var oauthLoginFunc = function(){

      $.ajax({
        url: "php/userAccess.php",
        type: "POST",
        dataType: "json",
        data: {"reqType":"login","username":username,"password":password},
        success: function(result){
          if(result == "lerror"){
              $('#tips').text("Username or password is wrong!");
          }
          else if(result == "lsucceed"){
            $('#tips').text("Login successfully");
            document.cookie = '{"username": "'+username+'"}';
            setTimeout(function(){
            window.location.href = "user_loggedin.html";
            // open a new window at here would be defined as the automatic action, because it is execute in ajax succed call back function, browser would stop it
          //   window.open("user_loggedin.html");
            },1000);
          }
        }
      });
  }

});

// });
