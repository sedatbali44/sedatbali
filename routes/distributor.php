<?php

use Mocca\Distributor;

$app->get("/distributor/getAllDistributors", function ($request, $response, $arguments) {

    $distributor = new Distributor();

    $data = $distributor->getDistributors();

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
});
//add  a new Distributor
$app->post("/distributor/addNewDistributor", function ($request, $response, $arguments) {
  
    $json = $request->getBody();
    $data = json_decode($json,true);

    $distributor = new  Distributor();
 
    $distributor->setValue('distri_name',$data['distri_name']);  
   
    $data = $distributor ->createNewDistributor();

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
});
//update  
$app->post("/distributor/updateOneDistributorRecord", function ($request, $response, $arguments) {
    $json = $request->getBody();
    $data = json_decode($json,true);

    $distributor = new  Distributor();
 
    $distributor ->setValue('distri_id',$data['distri_id']);   
    $distributor ->setValue('distri_name',$data['distri_name']);
    $distributor ->setValue('distir_kunden_nr',$data['distir_kunden_nr']);  
    $distributor ->setValue('distri_zusatz',$data['distri_zusatz']);
    $distributor ->setValue('distri_inhaber',$data['distri_inhaber']);  
    $distributor ->setValue('distri_strasse',$data['distri_strasse']);
    $distributor ->setValue('distri_plz',$data['distri_plz']);  
    $distributor ->setValue('distri_ort',$data['distri_ort']);
    $distributor ->setValue('distri_land',$data['distri_land']);  
    $distributor ->setValue('distri_telefon',$data['distri_telefon']);
    $distributor ->setValue('distri_telefon2',$data['distri_telefon2']);
    $distributor ->setValue('distri_telefon3',$data['distri_telefon3']);
    $distributor ->setValue('distri_telefon4',$data['distri_telefon4']);
    $distributor ->setValue('distri_email',$data['distri_email']);
    $distributor ->setValue('distri_email2',$data['distri_email2']);
    $distributor ->setValue('distri_email3',$data['distri_email3']);
    $distributor ->setValue('distri_email4',$data['distri_email4']);
    $distributor ->setValue('distri_ansprechpartner',$data['distri_ansprechpartner']);
    $distributor ->setValue('distri_ansprechpartner2',$data['distri_ansprechpartner2']);
    $distributor ->setValue('distri_ansprechpartner3',$data['distri_ansprechpartner3']);
    $distributor ->setValue('distri_ansprechpartner4',$data['distri_ansprechpartner4']);
    $distributor ->setValue('distri_handy',$data['distri_handy']);
    $distributor ->setValue('distri_fax',$data['distri_fax']);
    $distributor ->setValue('distri_web',$data['distri_web']);
    $distributor ->setValue('distri_benutzer',$data['distri_benutzer']);
    $distributor ->setValue('distri_passwort',$data['distri_passwort']);
    $distributor ->setValue('distri_steuer',$data['distri_steuer']);
    $distributor ->setValue('distri_ust_id',$data['distri_ust_id']);
    $distributor ->setValue('distri_konto',$data['distri_konto']);
    $distributor ->setValue('distri_blz',$data['distri_blz']);
    $distributor ->setValue('distri_iban',$data['distri_iban']);
    $distributor ->setValue('distri_bic',$data['distri_bic']);
    $distributor ->setValue('distri_notiz',$data['distri_notiz']);

    $export = $distributor ->updateOneDistributor(); 
    
    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($export, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_UNICODE));        
});
//Delete by id OK
$app->delete("/distributor/deleteDistributorById/{id}", function ($request, $response, $arguments) {
    $id = (int)$arguments['id'];

    $distributor = new  Distributor();

    $export = $distributor->deleteOneDistributor($id);

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($export, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_UNICODE));
});
// get by ID  OK 
$app->get("/distributor/getdistributorBYid/{id}", function ($request, $response, $arguments) {
    $id = (int)$arguments['id']; 

    $distributor = new  Distributor(); 

    $export = $distributor->getDistributorById($id); 

    return $response->withStatus(200)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($export, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_UNICODE));
});
?>
