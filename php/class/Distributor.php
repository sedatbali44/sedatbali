<?php
namespace Mocca;

use Slim\Http\Request;
use Slim\Http\Response;
use Interop\Container\ContainerInterface;
use \PDO;


class Distributor {
    public function __construct($db = 0)    {
        global $app;
        $this->container = $app->getContainer();
        $this->db = $this->container['db'];
    }
    public function setId($id) {   
        $this->id = $id;   //writeOnly 
    } 
    public function setValue($name,$value){
        $this->data->$name = $value;
    }

    /**
     * Gibt alle Distributoren zurück
     */
    public function getDistributors(){
        $query = "SELECT distri_id, distri_name FROM sms_distributor ORDER BY distri_name";
        $statement = $this->db->prepare($query);

        if($statement->execute()) {
            $data['status'] = 'success';
            while ($row = $statement->fetch()) {
                foreach ($row as $key => $value) {
                    $tmp[$key] = $value;
                }
                $items[] = $tmp;
            }

            $data['data'] = empty($items) ? array() : $items;
        } else {
            $data['status'] = 'error';
        }

        return $data;
    }
    public function getDistributorById($id) {
        $statement = $this->db->prepare("SELECT * FROM sms_distributor WHERE distri_id = :id"); 
        
        $data = array();
        
        if($statement->execute(array('id' => $id)))
        { 
            $data['data'] = $statement->fetch() ?? array();
            $data['status'] = 'success';
          
        }else {
            $data['status'] = 'error'; 
        }
        return $data;   
    }
    public function createNewDistributor() {
        $statement = $this->db->prepare("INSERT INTO sms_distributor SET distri_name =:distri_name");
        //if($statement->execute(array('distri_name' => $this->data->distri_name)))
        $dataArray = array('distri_name' => $this->data->distri_name);

        if($statement->execute($dataArray))
        {
            $data['status'] = 'success';
        } else {
            $data['status'] = 'error';   
        } 
        return $data;
    }
    public function updateOneDistributor() {
         $statement = $this->db->prepare("UPDATE sms_distributor  
         SET distri_name =:distri_name,
         distir_kunden_nr =:distir_kunden_nr,
         distri_zusatz =:distri_zusatz ,
         distri_inhaber =:distri_inhaber,
         distri_strasse =:distri_strasse,
         distri_plz =:distri_plz,
         distri_ort =:distri_ort,
         distri_land =:distri_land,
         distri_handy =:distri_handy,
         distri_telefon =:distri_telefon,
         distri_telefon2 =:distri_telefon2,
         distri_telefon3 =:distri_telefon3,
         distri_telefon4 =:distri_telefon4,
         distri_email =:distri_email,
         distri_email2 =:distri_email2,
         distri_email3 =:distri_email3,
         distri_email4 =:distri_email4 ,
         distri_fax =:distri_fax,distri_web =:distri_web,
         distri_benutzer =:distri_benutzer,
         distri_passwort =:distri_passwort,
         distri_steuer =:distri_steuer,
         distri_ust_id =:distri_ust_id,
         distri_konto =:distri_konto,distri_blz =:distri_blz,
         distri_iban =:distri_iban,
         distri_bic =:distri_bic ,
         distri_notiz =:distri_notiz,
         distri_ansprechpartner =:distri_ansprechpartner,
         distri_ansprechpartner2 =:distri_ansprechpartner2 ,
         distri_ansprechpartner3 =:distri_ansprechpartner3,
         distri_ansprechpartner4 =:distri_ansprechpartner4
         WHERE distri_id=:distri_id");

         if($statement->execute(array('distri_name' => $this->data->distri_name,
         'distri_id' => $this->data->distri_id,
         'distir_kunden_nr' => $this->data->distir_kunden_nr,
         'distri_zusatz' => $this->data->distri_zusatz,
         'distri_inhaber' => $this->data->distri_inhaber,
         'distri_strasse' => $this->data->distri_strasse,
         'distri_plz' => $this->data->distri_plz,
         'distri_ort' => $this->data->distri_ort,
         'distri_land' => $this->data->distri_land,
         'distri_handy' => $this->data->distri_handy,
         'distri_telefon' => $this->data->distri_telefon,
         'distri_telefon2' => $this->data->distri_telefon2,
         'distri_telefon3' => $this->data->distri_telefon3,
         'distri_telefon4' => $this->data->distri_telefon4,
         'distri_email' => $this->data->distri_email,
         'distri_email2' => $this->data->distri_email2,
         'distri_email3' => $this->data->distri_email3,
         'distri_email4' => $this->data->distri_email4,
         'distri_fax' => $this->data->distri_fax,
         'distri_web' => $this->data->distri_web,
         'distri_benutzer' => $this->data->distri_benutzer,
         'distri_passwort' => $this->data->distri_passwort,
         'distri_steuer' => $this->data->distri_steuer,
         'distri_ust_id' => $this->data->distri_ust_id,
         'distri_konto' => $this->data->distri_konto,
         'distri_blz' => $this->data->distri_blz,
         'distri_iban' => $this->data->distri_iban,
         'distri_bic' => $this->data->distri_bic,
         'distri_notiz' => $this->data->distri_notiz,
         'distri_ansprechpartner' => $this->data->distri_ansprechpartner,
         'distri_ansprechpartner2' => $this->data->distri_ansprechpartner2,
         'distri_ansprechpartner3' => $this->data->distri_ansprechpartner3,
         'distri_ansprechpartner4' => $this->data->distri_ansprechpartner4)))
        {
            $data['status'] = 'success';
        } else {
            $data['status'] = 'error';   
        } 
        return $data;    
    }
    public function deleteOneDistributor($id) {  //BY id
        $statement = $this->db->prepare("DELETE FROM  sms_distributor WHERE distri_id = :id");
        if( $statement->execute(array('id' => $id)))
        {
        ($data['status'] = 'success');
        }else {
         ($data['status'] = 'error'); 
        }  
        return $data;  
    }

}

