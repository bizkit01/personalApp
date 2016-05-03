<?php
  $reqType = $_POST["reqType"];

  // if wanted to open support of php to pdo sqlite, install it at first:
  // apt-get install php5_sqlite
  // or modify the php.ini file, uncomment the content about sqlite, it is the same with mysql and other databses if you wanted
  $pdoHandler = new PDO("sqlite:../database/database.db") or die("Failed to open DB");

    if(!$pdoHandler) die ($error);

    $topicNameCheck_query = "SELECT topicid,topicname FROM topic";

    if($reqType == "getTopics"){

        $pdoPrep_topicCheck = $pdoHandler->prepare($topicNameCheck_query);
        $pdoPrep_topicCheck->execute();

        $res_topicCheck = $pdoPrep_topicCheck->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($res_topicCheck);
    }

    header('HTTP/1.1 200 OK');
    header('Content-Type: application/json');
?>
