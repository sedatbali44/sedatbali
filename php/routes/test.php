<?php

$app->get("/test/tse", function ($request, $response, $arguments) {


    $tse = new \Mocca\FiskalyTSE();
    $tse->connect();
    $tse->insertCashpoint();

    /*
      $tse = new \Mocca\TSE();
      $tse->connect();
      $tse->addPayment("NON_CASH","14.50");
      $tse->addPayment("CASH","14.50");
      $tse->addPayment("NON_CASH","14.50");
      $tse->addVAT("NORMAL","214.50");
      $tse->startTransaction();
      $tse->transaction();


        $token = $request->getAttribute("jwt");
        $user = new \Mocca\User($this->db);
        $users = $user->listUsers($token['filiale']);

        $data['status'] = 'success';
        $data['items'] = $users;

        */

    $data['status'] = 'success';

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

});

$app->get("/test/config", function ($request, $response, $arguments) {


    $config = new \Mocca\Config();

    $data = $config->getHT();
    /*
      $tse = new \Mocca\TSE();
      $tse->connect();
      $tse->addPayment("NON_CASH","14.50");
      $tse->addPayment("CASH","14.50");
      $tse->addPayment("NON_CASH","14.50");
      $tse->addVAT("NORMAL","214.50");
      $tse->startTransaction();
      $tse->transaction();


        $token = $request->getAttribute("jwt");
        $user = new \Mocca\User($this->db);
        $users = $user->listUsers($token['filiale']);

        $data['status'] = 'success';
        $data['items'] = $users;

        */

    $data['status'] = 'success';

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

});


?>