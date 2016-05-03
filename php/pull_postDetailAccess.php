<?php
  $reqType = $_POST["reqType"];
  $postid = $_POST["postId"];

  // if wanted to open support of php to pdo sqlite, install it at first:
  // apt-get install php5_sqlite
  // or modify the php.ini file, uncomment the content about sqlite, it is the same with mysql and other databses if you wanted
  $pdoHandler = new PDO("sqlite:../database/database.db") or die("Failed to open DB");

    if(!$pdoHandler) die ($error);

    $postDetailCheck_query = "SELECT nickname,postid,posttitle,posttime,postcontent FROM post JOIN user ON post.p_uid = user.userid WHERE postid = '$postid'";
    $postInitToUptCheck_query = "SELECT nickname,topicid,postid,posttitle,posttime,postcontent FROM post JOIN user ON post.p_uid = user.userid JOIN topic ON post.p_tid = topic.topicid WHERE postid = '$postid'";

    if($reqType == "postDetail"){

        $pdoPrep_postDetailCheck = $pdoHandler->prepare($postDetailCheck_query);
        $pdoPrep_postDetailCheck->execute();

        $res_postDetailCheck = $pdoPrep_postDetailCheck->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($res_postDetailCheck);
    }
    elseif($reqType == "postInitToUpt"){
      $pdoPrep_postInitToUptCheck = $pdoHandler->prepare($postInitToUptCheck_query);
      $pdoPrep_postInitToUptCheck->execute();

      $res_postInitToUptCheck = $pdoPrep_postInitToUptCheck->fetchAll(PDO::FETCH_ASSOC);

      echo json_encode($res_postInitToUptCheck);
    }

    header('HTTP/1.1 200 OK');
    header('Content-Type: application/json');
?>
