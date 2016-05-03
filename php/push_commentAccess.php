<?php
  $reqType = $_POST["reqType"];
  $commentcontent = $_POST["commentContent"];
  $userid = $_POST["userId"];
  $postid = $_POST["postId"];

  // if wanted to open support of php to pdo sqlite, install it at first:
  // apt-get install php5_sqlite
  // or modify the php.ini file, uncomment the content about sqlite, it is the same with mysql and other databses if you wanted
  $pdoHandler = new PDO("sqlite:../database/database.db") or die("Failed to open DB");

    if(!$pdoHandler) die ($error);

    $commentInsert_query = "INSERT INTO comment(commentcontent,c_uid,c_pid) VALUES('$commentcontent','$userid','$postid')";

    if($reqType == "insert"){

        $pdoPrep_commentInsert = $pdoHandler->prepare($commentInsert_query);
        $pdoPrep_commentInsert->execute();
        if(!$pdoPrep_commentInsert){
          echo json_encode("cerror");
        }else{
          echo json_encode("csucceed");
        }
    }


    header('HTTP/1.1 200 OK');
    header('Content-Type: application/json');
?>
