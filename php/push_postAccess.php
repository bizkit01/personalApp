<?php
  $reqType = $_POST["reqType"];
  $postid = $_POST["postId"];
  $posttitle = $_POST["postTitle"];
  $post_tid = $_POST["topicId"];
  $postcontent = $_POST["postContent"];
  $post_uid = $_POST["userId"];

  // if wanted to open support of php to pdo sqlite, install it at first:
  // apt-get install php5_sqlite
  // or modify the php.ini file, uncomment the content about sqlite, it is the same with mysql and other databses if you wanted
  $pdoHandler = new PDO("sqlite:../database/database.db") or die("Failed to open DB");

    if(!$pdoHandler) die ($error);

    $postInsert_query = "INSERT INTO post(posttitle,postcontent,posttime,p_tid,p_uid) values('$posttitle','$postcontent',datetime('now','localtime'),'$post_tid','$post_uid')";
    $postUpdate_query = "UPDATE post SET posttitle = '$posttitle',postcontent = '$postcontent',p_tid = '$post_tid' WHERE postid = '$postid'";
    $postDelete_query = "DELETE FROM post WHERE postid = '$postid'";

    if($reqType == "insert"){

        $pdoPrep_postInsert = $pdoHandler->prepare($postInsert_query);
        $pdoPrep_postInsert->execute();
        if(!$pdoPrep_postInsert){
          echo json_encode("cerror");
        }else{
          echo json_encode("csucceed");
        }

    }
    elseif($reqType == "update"){

      $pdoPrep_postUpdate = $pdoHandler->prepare($postUpdate_query);
      $pdoPrep_postUpdate->execute();
      if(!$pdoPrep_postUpdate){
        echo json_encode("uerror");
      }else{
        echo json_encode("usucceed");
      }

    }
    elseif($reqType == "delete"){

      $pdoPrep_postDelete = $pdoHandler->prepare($postDelete_query);
      $pdoPrep_postDelete->execute();
      if(!$pdoPrep_postDelete){
        echo json_encode("derror");
      }else{
        echo json_encode("dsucceed");
      }

    }


    header('HTTP/1.1 200 OK');
    header('Content-Type: application/json');
?>
