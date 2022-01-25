<?php

use Mocca\Text;


$app->post("/template", function ($request, $response, $arguments) {
    $json = $request->getBody();
    $data = json_decode($json);

    $text  = new Text;

    $return = $text->template($data->title,$data->parameter);

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($return, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

});

$app->get("/text/{title}", function ($request, $response, $arguments) {
    $title =  $arguments['title'];

    $text  = new Text;

    $return = $text->getText($title);

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($return, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

});

$app->get("/getTemplateByTyp/{typ}", function ($request, $response, $arguments) {
    $typ =  $arguments['typ'];

    $text  = new Text;

    $return = $text->getTemplateByTyp($typ);

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($return, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

});


?>