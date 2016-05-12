<?php
  $reqType = $_POST["reqType"];
  $topicId = $_POST["topicId"];
  $topicName = $_POST["topicName"];
  $topicType = $_POST["topicType"];
  $userId = $_POST["userId"];

  // if wanted to open support of php to pdo sqlite, install it at first:
  // apt-get install php5_sqlite
  // or modify the php.ini file, uncomment the content about sqlite, it is the same with mysql and other databses if you wanted
  $pdoHandler = new PDO("sqlite:../database/database.db") or die("Failed to open DB");

    if(!$pdoHandler) die ($error);

    $topicNameCheck_query = "SELECT topicid,topicname FROM topic";
    $topicCreate_query = "INSERT INTO topic(topicname,topictype,t_uid) VALUES('$topicName','$topicType','$userId')";
    $topicUpdate_query = "UPDATE topic SET topicname = '$topicName',topictype = '$topicType',t_uid = '$userId' WHERE topicid = '$topicId'";
    $topicDelete_query = "DELETE FROM topic WHERE topicid = '$topicId'";

    if($reqType == "getTopics"){

        $pdoPrep_topicCheck = $pdoHandler->prepare($topicNameCheck_query);
        $pdoPrep_topicCheck->execute();

        $res_topicCheck = $pdoPrep_topicCheck->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($res_topicCheck);
    }

    elseif($reqType == "addTopic"){

        $pdoPrep_topicCreate = $pdoHandler->prepare($topicCreate_query);
        $pdoPrep_topicCreate->execute();

        if(!$pdoPrep_topicCreate){
          echo json_encode("cerror");
        }else{
          echo json_encode("csucceed");
        }
    }

    elseif($reqType == "updateTopic"){

        $pdoPrep_topicUpdate = $pdoHandler->prepare($topicUpdate_query);
        $pdoPrep_topicUpdate->execute();

        if(!$pdoPrep_topicUpdate){
          echo json_encode("uerror");
        }else{
          echo json_encode("usucceed");
        }
    }

    elseif($reqType == "deleteTopic"){

        $pdoPrep_topicDelete = $pdoHandler->prepare($topicDelete_query);
        $pdoPrep_topicDelete->execute();

        if(!$pdoPrep_topicDelete){
          echo json_encode("derror");
        }else{
          echo json_encode("dsucceed");
        }
    }


    header('HTTP/1.1 200 OK');
    header('Content-Type: application/json');
?>
