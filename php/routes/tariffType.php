<?php

use Mocca\TariffType;

$app->get("/tariffType/getTypes", function ($request, $response, $arguments) {

    $tariffTypes = new TariffType();

    $data = $tariffTypes->getTariffTypes();

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

});
