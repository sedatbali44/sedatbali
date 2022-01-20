<?php

use Mocca\Stamp;

//Reparaturen abfragen
$app->post("/stamp/setStamp", function ($request, $response, $arguments) {

    $token = $request->getAttribute("jwt");

    $json = $request->getBody();
    $data = json_decode($json);

    $stamp = new Stamp();

    $stamp->setValue('user', $data->user ?? $token['user']);
    $stamp->setValue('store', $data->store ?? $token['filiale']);
    $stamp->setValue('type', $data->type ?? '');
    $stamp->setValue('note', $data->note ?? '');
    $stamp->setValue('coordinateLatitude', $data->coordinateLatitude ?? '0.0 0.0');
    $stamp->setValue('coordinateLongitude', $data->coordinateLongitude ?? '0.0 0.0');

    $return = $stamp->setStamp();

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($return, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

});

//Reparaturen abfragen
$app->get("/stamp/getLastStamp/{user}", function ($request, $response, $arguments) {

    $user = (int)$arguments['user'];

    $stamp = new Stamp();

    $return = $stamp->getLastStamp($user);

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($return, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

});
