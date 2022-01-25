<?php
use Mocca\TodoStatus;
// returns all todo type records
$app->get("/todo/status", function ($request, $response, $arguments) {
    $todo  = new TodoStatus();
    $return = $todo->getStatus();

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($return, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

});

// adds a todo type records
$app->get("/todostatus/create/{name}", function ($request, $response, $arguments) {
    $name = $arguments['name'];

    $type  = new TodoType();
    $type->setValue('name', $name);

    $return = $type ->createType();

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($return, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
});

//updates text of todo type record
$app->put("/todostatus/change/{id}", function ($request, $response, $arguments) {
    $id = (int)$arguments['id'];

    $json = $request->getBody();
    $data = json_decode($json);

    $type  = new TodoType();
    $type->setValue('id', $id);
    $type->setValue('name', $data->name);

    $return = $type ->updateType();

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($return, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
});

//deletes a todo type record
$app->get("/todostatus/delete/{id}", function ($request, $response, $arguments) {
    $token = $request->getAttribute("jwt");
    $id = (int)$arguments['id'];

    $type  = new TodoType();
    $type->setValue('id', $id);
    $return = $type ->deleteType();

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($return, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
});
?>
