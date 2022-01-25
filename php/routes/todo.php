<?php

use Mocca\Todo;

//Alle ToDos eines Kunden
$app->post("/todo/getTodos", function ($request, $response, $arguments) {
    $token = $request->getAttribute("jwt");

    $json = $request->getBody();
    $data = json_decode($json);

    $todo = new Todo();

    $todo->setValue('todo_kunde_id', $data->todo_customerId);
    $todo->setValue('status', $data->status);
    $todo->setValue('typ', $data->typ);
    $todo->setValue('user', $data->user);
    $todo->setValue('count', $data->count);
    $todo->setValue('index', $data->index);
    $todo->setValue('limit', $data->limit);
    $todo->setValue('size', $data->size);
    $todo->setValue('todo_filiale_id', $token['filiale']);
    $todo->setValue('todo_finished', $data->todo_finished);

    $return = $todo->getTodos();

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($return, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

});

$app->post("/todo/update/{id}", function ($request, $response, $arguments) {
    $token = $request->getAttribute("jwt");

    $json = $request->getBody();
    $data = json_decode($json);
    $id = $arguments['id'];

    $todo = new Todo();
    $todo->getByID($id);

    $todo->setValue('todo_kunde_id', $data->todo_kunde_id ?? '');
    $todo->setValue('todo_in_bearbeitung_mitarbeiter', $data->todo_in_bearbeitung_mitarbeiter);
    $todo->setValue('todo_ziel_mitarbeiter_id', $data->todo_ziel_mitarbeiter_id);
    $todo->setValue('todo_mitarbeiter_id', $data->todo_mitarbeiter_id);
    $todo->setValue('todo_status_id', $data->todo_status_id);
    $todo->setValue('todo_text', $data->todo_text);
    $todo->setValue('todo_typ_id', $data->todo_typ_id);
    $todo->setValue('todo_ueberschrift', $data->todo_ueberschrift);

    if($todo->save()){
        $return['status'] = 'success';
    } else {
        $return['status'] = 'error';
    }


    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($return, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

});

$app->post("/todo/new", function ($request, $response, $arguments) {
    $token = $request->getAttribute("jwt");

    $json = $request->getBody();
    $data = json_decode($json);

    $todo = new Todo();

    $todo->setValue('todo_kunde_id', $data->todo_kunde_id ?? 0);
    $todo->setValue('todo_in_bearbeitung_mitarbeiter', $data->todo_in_bearbeitung_mitarbeiter ?? 0);
    $todo->setValue('todo_mitarbeiter_id', $data->todo_mitarbeiter_id ?? 0);
    $todo->setValue('todo_status_id', $data->todo_status_id ?? 0);
    $todo->setValue('todo_text', $data->todo_text ?? 0);
    $todo->setValue('todo_typ_id', $data->todo_typ_id ?? 0);
    $todo->setValue('todo_ueberschrift', $data->todo_ueberschrift ?? '');

    if($todo->saveNew()){
        $return['status'] = 'success';
    } else {
        $return['status'] = 'error';
    }


    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($return, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

});

$app->get("/todo/get/{id}", function ($request, $response, $arguments) {

    $todo = new Todo();

    $id = $arguments['id'];
    $return = $todo->getByID($id);

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($return, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

});

$app->get("/todo/delete/{id}", function ($request, $response, $arguments) {

    $todo = new Todo();

    $id = $arguments['id'];
    $todo->getByID($id);
    if($todo->delete()){
        $return['status'] = 'success';
    } else {
        $return['status'] = 'error';
    }


    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($return, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

});

$app->get("/todo/user", function ($request, $response, $arguments) {

    $token = $request->getAttribute("jwt");
    $todo = new Todo();

    $return = $todo->getTodosByUser($token['user']);

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($return, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

});

//returns open todos with targetUser (todo_ziel_mitarbeiter)
$app->get("/todo/forUser", function ($request, $response, $arguments) {

    $token = $request->getAttribute("jwt");
    $todo = new Todo();

    $return = $todo->getTodosForUser($token['user']);

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($return, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

});
