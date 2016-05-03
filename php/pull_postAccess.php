<?php
  $reqType = $_POST["reqType"];
  $topicid = $_POST["topicid"];

  // if wanted to open support of php to pdo sqlite, install it at first:
  // apt-get install php5_sqlite
  // or modify the php.ini file, uncomment the content about sqlite, it is the same with mysql and other databses if you wanted
  $pdoHandler = new PDO("sqlite:../database/database.db") or die("Failed to open DB");

    if(!$pdoHandler) die ($error);

    $postInitCheck_query = "SELECT topicname,postid,posttitle,posttime,nickname FROM post INNER JOIN topic ON post.p_tid = topic.topicid INNER JOIN user ON post.p_uid = user.userid";
    $topicPostCheck_query = "SELECT topicname,postid,posttitle,posttime,nickname FROM post INNER JOIN topic ON post.p_tid = topic.topicid INNER JOIN user ON post.p_uid = user.userid WHERE topic.topicid = '$topicid'";

    if($reqType == "initiatePost"){

        $pdoPrep_postInitCheck = $pdoHandler->prepare($postInitCheck_query);
        $pdoPrep_postInitCheck->execute();

        $res_postInitCheck = $pdoPrep_postInitCheck->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($res_postInitCheck);
    }
    elseif($reqType == "topicPost"){
      $pdoPrep_topicPostCheck = $pdoHandler->prepare($topicPostCheck_query);
      $pdoPrep_topicPostCheck->execute();

      $res_topicPostCheck = $pdoPrep_topicPostCheck->fetchAll(PDO::FETCH_ASSOC);

      echo json_encode($res_topicPostCheck);
    }


    header('HTTP/1.1 200 OK');
    header('Content-Type: application/json');
?>
