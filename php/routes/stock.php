<?php

use Mocca\Stock;

// returns all stocks by store
$app->get("/stock/getStocks", function ($request, $response, $arguments) {
    $token = $request->getAttribute("jwt");
    $filiale = (int) $token['filiale'];

    $stock = new Stock();

    $stock->setValue('filiale', $filiale);

    $export = $stock->getStocks();

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($export, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_UNICODE));
});


// returns all stocks by store
$app->post("/stock/value", function ($request, $response, $arguments) {
    $token = $request->getAttribute("jwt");
    $filiale = (int) $token['filiale'];
    $json = $request->getBody();
    $data = json_decode($json);

    $stock = new Stock();
    $stock->setValue('manufactor',!$data->manufactor ? '' : $data->manufactor);
    $stock->setValue('productgroup',!$data->productgroup ? '' : $data->productgroup);
    $export = $stock->getStockValue();

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($export, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_UNICODE));
});
