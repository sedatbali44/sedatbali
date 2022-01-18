<?php
use Mocca\Distributor;
$app->get("/distributor/getAll", function ($request, $response, $arguments) {

    $distributor = new Distributor();

    $data = $distributor->getAll();

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
});
?>
