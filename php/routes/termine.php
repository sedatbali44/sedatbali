<?php


//se Ramsey\Uuid\Uuid;
use Firebase\JWT\JWT;
use Tuupola\Base62;
use Mocca\Used;
use Mocca\User;
use Mocca\Termine;


$app->get("/termine/next5", function ($request, $response, $arguments) {


    $token = $request->getAttribute("jwt");

    $data = array();
    $statement = $this->db->prepare("SELECT termine_id, termine_datum, termine_text, mit_id, mit_name, id, vorname, name, firma  FROM sms_termine 
		 LEFT JOIN smsdata ON id=termine_kunde 
		 LEFT JOIN sms_mitarbeiter ON mit_id=termine_mitarbeiter
		 WHERE termine_filiale=:filiale 
AND date(termine_datum) >=  date(CURRENT_TIMESTAMP)  ORDER BY termine_datum ASC LIMIT 5");

    $statement->execute(array('filiale' => $token['filiale']));
    while($row = $statement->fetch()){

        $data['items'][] = $row;
    }

    $data['status'] = 'success';

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

});

$app->get("/termine/types", function ($request, $response, $arguments) {

    $termine = new Termine();

    $return = $termine->getTypes();

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($return, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

});


$app->post("/termin/adduser", function ($request, $response, $arguments) {

    $json = $request->getBody();
    $data = json_decode($json);

    $termine = new Termine();

    $termin = $termine->getByID($data->termine_id);
    $termine->addUser($data->user);
    $termin = $termine->getByID($data->termine_id);

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($termin, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

});

$app->post("/termin/deleteuser", function ($request, $response, $arguments) {

    $json = $request->getBody();
    $data = json_decode($json);

    $termine = new Termine();

    $termin = $termine->getByID($data->termine_id);
    $termine->deleteUser($data->user);
    $termin = $termine->getByID($data->termine_id);

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($termin, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

});

$app->post("/termin/new", function ($request, $response, $arguments) {

    $json = $request->getBody();
    $data = json_decode($json);

    $termine = new Termine();
    $return = array();

    $termine->setValue('termine_datum', $data->termine_datum);
    $termine->setValue('termin_datum_bis', $data->termin_datum_bis);
    $termine->setValue('termine_text', $data->termine_text);
    $termine->setValue('termine_kunde', $data->termine_kunde);
    $termine->setValue('termine_mitarbeiter', $data->termine_mitarbeiter);
    $termine->setValue('termine_typ', $data->termine_typ);
    $termine->setValue('termine_ort', $data->termine_ort);
    $termine->setValue('termin_art', $data->termin_art);
    $termine->setValue('users', (array)$data->users);

    if($termine->saveNew()){
        $return['status'] = 'success';
    } else {
        $return['status'] = 'error';
    }

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($return, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

});

$app->post("/termin/update/{id}", function ($request, $response, $arguments) {

    $id = $arguments['id'];
    $json = $request->getBody();
    $data = json_decode($json);

    $termine = new Termine();
    $termine->getByID($id);
    $termine->setValue('termine_datum', $data->termine_datum);
    $termine->setValue('termin_datum_bis', $data->termin_datum_bis);
    $termine->setValue('termine_text', $data->termine_text);
    $termine->setValue('termine_kunde', $data->termine_kunde);
    $termine->setValue('termine_mitarbeiter', $data->termine_mitarbeiter);
    $termine->setValue('termine_typ', $data->termine_typ);
    $termine->setValue('termine_ort', $data->termine_ort);
    $termine->setValue('termin_art', $data->termin_art);
    $termine->setValue('users', (array)$data->users);

    if($termine->save()){
        $return['status'] = 'success';
    } else {
        $return['status'] = 'error';
    }

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($return, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

});

$app->get("/termin/delete/{id}", function ($request, $response, $arguments) {

    $id = $arguments['id'];

    $termine = new Termine();
    $data = $termine->getByID($id);
    $termine->delete();

    $return['status'] = 'success';

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($return, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

});

$app->get("/termin/pdf/{id}", function ($request, $response, $arguments) {

    $id = $arguments['id'];

    $termine = new Termine();
    $data = $termine->getByID($id);
    $pdfstring = $termine->renderPDF();


    return $response->withHeader('Content-Type', 'application/pdf')
        ->withHeader('Content-Disposition', 'inline; filename="Termin.pdf"')
        ->withHeader('Expires', '0')
        ->withHeader('Cache-Control', 'must-revalidate, post-check=0, pre-check=0')
        ->withHeader('Pragma', 'public')
        ->write($pdfstring);

});


$app->get("/termin/{id}", function ($request, $response, $arguments) {

    $id = $arguments['id'];

    $termine = new Termine();
    $data['data'] = $termine->getByID($id);


    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

});

$app->post("/termine/get", function ($request, $response, $arguments) {

    $json = $request->getBody();
    $data = json_decode($json);

    $termine = new Termine();

    $termine->setValue('showallopen', $data->showallopen ?? 0);
    $termine->setValue('onlyfuture', $data->onlyfuture ?? 0);
    $termine->setValue('status', $data->status);
    $termine->setValue('typ', $data->typ);
    $termine->setValue('user', $data->user);
    $termine->setValue('index', $data->index);
    $termine->setValue('limit', $data->limit);
    $termine->setValue('startDate', $data->startDate);
    $termine->setValue('endDate', $data->endDate);

    $return = $termine->getTermine();

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($return, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

});


?>