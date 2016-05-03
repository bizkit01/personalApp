<?php
  $reqType = $_POST["reqType"];
  $username = $_POST["username"];
  $password = hash('sha256',$_POST["password"]);
  $nickname = $_POST["nickname"];
  $userType = $_POST["userType"];
  $userId = $_POST["userId"];

  session_start();
  // if wanted to open support of php to pdo sqlite, install it at first:
  // apt-get install php5_sqlite
  // or modify the php.ini file, uncomment the content about sqlite, it is the same with mysql and other databses if you wanted
  $pdoHandler = new PDO("sqlite:../database/database.db") or die("Failed to open DB");

    if(!$pdoHandler) die ($error);

    $userNameCheck_query = "SELECT userid, nickname FROM user WHERE username = '$username'";
    $loginCheck_query = "SELECT userid, usertype, nickname from user WHERE username = '$username' AND password = '$password'";
    $userCreate_query = "INSERT INTO user (username,password,nickname,usertype) VALUES ('$username','$password','$nickname','$userType')";
    $passwordChange_query = "UPDATE user SET password = '$newpassword' WHERE username = '$username'";
    $rbacMgrCheck_query = "SELECT userid, username, usertype, nickname from user";
    $rbacMgrUpdt_query = "UPDATE user SET usertype = '$userType' WHERE userid = '$userId'";

    if($reqType == "logon"){

        $pdoPrep_userNameCheck = $pdoHandler->prepare($userNameCheck_query);
        $pdoPrep_userNameCheck->execute();

        $res_userNameCheck = $pdoPrep_userNameCheck->fetchAll(PDO::FETCH_ASSOC);
        $userCheckRes_row = count($res_userNameCheck);
        if($userCheckRes_row !== 0){
            echo json_encode("eerror");
        }
        else{
            $pdoPrep_userCreate = $pdoHandler->prepare($userCreate_query);
            $pdoPrep_userCreate->execute();
            $pdoPrep_userDCheck = $pdoHandler->prepare($userNameCheck_query);
            $pdoPrep_userDCheck->execute();
            $res_usernameDCheck =  $pdoPrep_userDCheck->fetchAll(PDO::FETCH_ASSOC);
            $userDCheckRes_row = count($res_usernameDCheck);
            if($userDCheckRes_row !== 0){
                echo json_encode("csucceed");
            }
            else{
                echo json_encode("cerror");
            }
        }
    }

    elseif($reqType == "login"){
        $pdoPrep_loginCheck = $pdoHandler->prepare($loginCheck_query);
        $pdoPrep_loginCheck->execute();

        $res_loginCheck = $pdoPrep_loginCheck->fetchAll(PDO::FETCH_ASSOC);
        $loginCheckRes_row = count($res_loginCheck);
        if($loginCheckRes_row !== 0){
            $_SESSION["userLoginStatus"] = "logined";
            $res_loginCheck[0]["loginstatue"] = $_SESSION["userLoginStatus"];
            $res_loginCheck[0]["backmessage"] = "lsucceed";
            echo json_encode($res_loginCheck);

        }
        else{
            $res_loginCheck[0]["backmessage"] = "lerror";
            echo json_encode($res_loginCheck);
        }
    }

    elseif($reqType == "logout"){
        $_SESSION["userLoginStatus"] = "logouted";
        $res_logoutCheck[0]["loginstatue"] = $_SESSION["userLoginStatus"];
        $res_logoutCheck[0]["backmessage"] = $_SESSION["losucceed"];
        echo json_encode($res_logoutCheck);
        session_destroy();
    }

    elseif($reqType == "change"){
        $pdoPrep_loginCheck = $pdoHandler->prepare($loginCheck_query);
        $pdoPrep_loginCheck->execute();

        $res_loginCheck = $pdoPrep_loginCheck->fetchAll(PDO::FETCH_ASSOC);
        $loginCheckRes_row = count($res_loginCheck);
        if($loginCheckRes_row !== 0){
            $pdoPrep_pwdChange = $pdoHandler->prepare($passwordChange_query);
            $pdoPrep_pwdChange->execute();
            echo json_encode("pcsucceed");
        }
        else{
            echo json_encode("pcerror");
        }
    }

    elseif($reqType == "initiate"){
        $res_initiate[0]["loginstatue"] = $_SESSION["userLoginStatus"];
        echo json_encode($res_initiate);
    }

    elseif($reqType == "pull_allUserInfo"){
        $pdoPrep_rbacMgrCheck = $pdoHandler->prepare($rbacMgrCheck_query);
        $pdoPrep_rbacMgrCheck->execute();

        $res_rbacMgrCheck = $pdoPrep_rbacMgrCheck->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($res_rbacMgrCheck);

    }

    elseif($reqType == "userRoleUpdt"){

      $pdoPrep_rbacMgrUpdt = $pdoHandler->prepare($rbacMgrUpdt_query);
      $pdoPrep_rbacMgrUpdt->execute();
      if(!$pdoPrep_rbacMgrUpdt){
        echo json_encode("uerror");
      }else{
        echo json_encode("usucceed");
      }

    }


    header('HTTP/1.1 200 OK');
    header('Content-Type: application/json');
?>
