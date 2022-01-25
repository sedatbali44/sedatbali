<?php

use Mocca\Tarif;

//Tarif mit id abrufen
$app->get("/tarif/{id}", function ($request, $response, $arguments) {
    $id = (int)$arguments['id'];

    $tarif = new Tarif();
    $tarif -> setId($id);

    $data = $tarif -> getTarif();

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
});

//creates new tariff
$app->post("/tariff/create", function ($request, $response, $arguments) {
    $token = $request->getAttribute("jwt");

    $json = $request->getBody();
    $data = json_decode($json);

    $tarif = new Tarif();

    $tarif->setValue('store', $token['filiale']);
    $tarif->setValue('tariff', $data->tariff);

    $data = $tarif -> createTariff();

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
});

// updates an existing tariff
$app->post("/tariff/update", function ($request, $response, $arguments) {
    $token = $request->getAttribute("jwt");

    $json = $request->getBody();
    $data = json_decode($json);

    $tarif = new Tarif();

    $tarif->setValue('store', $token['filiale']);
    $tarif->setValue('tariff', $data->tariff);
    $tarif->setValue('calc', $data->calc ?? '');

    $data = $tarif -> updateTariff();

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
});


$app->get("/arifbynet/{id}", Tarif::class.':getTarifByNet');

//Alle Tarife abrufen
$app->get("/getTariffAll", function ($request, $response, $arguments) {
    $tarif = new Tarif();
    $data = $tarif -> getTariffAll();

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
});

//Alle Tarife für Filiale und Zentraltarifeabrufen
$app->get("/getTariffStoreAndCentral", function ($request, $response, $arguments) {
    $token = $request->getAttribute("jwt");

    $tarif = new Tarif();

    $tarif->setValue('filiale', $token['filiale']);

    $data = $tarif -> getTariffStoreAndCentral();

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
});

//Alle Tarife für Filiale und Zentraltarif abrufen, welche aktiov sind und zusätzlich noch den aktuellen Tarif
$app->post("/getTariffStoreAndCentralActiveContractEdit", function ($request, $response, $arguments) {

    $token = $request->getAttribute("jwt");
    $json = $request->getBody();
    $data = json_decode($json);

    $tarif = new Tarif();

    $tarif->setValue('filiale', $token['filiale']);
    $tarif->setValue('tarif', $data->tariff);

    $data = $tarif -> getTariffStoreAndCentralActiveContractEdit();

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
});

//tariffs by search
$app->post("/searchTariffStoreAndCentralActive", function ($request, $response, $arguments) {
    $token = $request->getAttribute("jwt");

    $json = $request->getBody();
    $data = json_decode($json);

    $tarif = new Tarif();

    $tarif->setValue('filiale', $token['filiale']);
    $tarif->setValue('search', $data->search);

    $data = $tarif -> searchTariffStoreAndCentralActive();

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
});

//tariffs by search for invoice with active sms_filiale_netzbetreiber
$app->post("/searchTariffInvoiceFast", function ($request, $response, $arguments) {
    $token = $request->getAttribute("jwt");

    $json = $request->getBody();
    $data = json_decode($json);

    $tarif = new Tarif();

    $tarif->setValue('filiale', $token['filiale']);
    $tarif->setValue('search', $data->search);

    $data = $tarif -> searchTariffInvoiceFast();

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
});

//returns tariff categories
$app->get("/tarifkat", function ($request, $response, $arguments) {
    $tariff = new Tarif();
    $data = $tariff->getTariffCategories();
    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
});

$app->get("/tarifTargetGroup", function ($request, $response, $arguments) {


    $statement = $this->db->prepare("SELECT * FROM sms_tarif_ziel_gruppen GROUP BY ziel_gruppe_name");
    $statement->execute();
    while($row = $statement->fetch()){

        $tmp = array();
        $tmp['id'] = $row['ziel_gruppe_id'];
        $tmp['name'] = $row['ziel_gruppe_name'];
        $items[] = $tmp;

    }

    $data['status'] = 'success';
    $data['items'] = $items;
    $data['count'] = $statement->rowCount();

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
});


$app->get("/tariff/getNextNumber", function ($request, $response, $arguments) {


    $tariff = new Tarif();
    
    $data = array();
    $data['items'] = $tariff->generateNr();
    
    if(!empty($data['items'])) {
        $data['status'] = 'success';
    } else {
        $data['status'] = 'error';
    }
    

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
});


// activates given tariffs
$app->post("/tarif/activateMultipleTariff", function ($request, $response, $arguments) {
    $token = $request->getAttribute("jwt");

    $json = $request->getBody();
    $data = json_decode($json);

    $tarif = new Tarif();

    $tarif->setValue('tariff', $data->tariff);

    $data = $tarif -> activateMultipleTariff();

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
});

// // deactivates given tariffs
$app->post("/tarif/deactivateMultipleTariff", function ($request, $response, $arguments) {
    $token = $request->getAttribute("jwt");

    $json = $request->getBody();
    $data = json_decode($json);

    $tarif = new Tarif();

    $tarif->setValue('tariff', $data->tariff);

    $data = $tarif -> deactivateMultipleTariff();

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
});

// // deletes given tariffs
$app->post("/tarif/deleteMultipleTariff", function ($request, $response, $arguments) {
    $token = $request->getAttribute("jwt");

    $json = $request->getBody();
    $data = json_decode($json);

    $tarif = new Tarif();

    $tarif->setValue('tariff', $data->tariff);

    $data = $tarif -> deleteMultipleTariff();

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
});




?>
