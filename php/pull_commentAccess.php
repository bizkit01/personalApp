<?php
  $reqType = $_POST["reqType"];
  $postid = $_POST["postId"];

  // if wanted to open support of php to pdo sqlite, install it at first:
  // apt-get install php5_sqlite
  // or modify the php.ini file, uncomment the content about sqlite, it is the same with mysql and other databses if you wanted
  $pdoHandler = new PDO("sqlite:../database/database.db") or die("Failed to open DB");

    if(!$pdoHandler) die ($error);

    $commentCheck_query = "SELECT nickname,commentid,commentcontent FROM comment JOIN user ON comment.c_uid = user.userid JOIN post ON comment.c_pid = post.postid WHERE postid = '$postid'";

    if($reqType == "commentByPost"){

        $pdoPrep_commentCheck = $pdoHandler->prepare($commentCheck_query);
        $pdoPrep_commentCheck->execute();

        $res_commentCheck = $pdoPrep_commentCheck->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($res_commentCheck);
    }

    header('HTTP/1.1 200 OK');
    header('Content-Type: application/json');
?>
