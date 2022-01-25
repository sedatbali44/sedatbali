<?php
/**
 * Created by PhpStorm.
 * User: beyer
 * Date: 27.11.2018
 * Time: 10:25
 */

namespace Mocca;

use Mocca\User;
use Slim\Http\Request;
use Slim\Http\Response;
use Interop\Container\ContainerInterface;

class Tarif
{
    public $id;

    public function __construct()
    {
        global $app;
        $this->container = $app->getContainer();
        $this->db = $this->container['db'];
        $this->token = $this->container['token']->decoded;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setValue($name,$value){
        $this->data->$name = $value;
    }

    public function get($id){
        return $this->getTarif($id);
    }

    public function getTarif($id = 0){

        if($id == 0){
            $id = $this->id;
            if(!$id > 0){                
                return false;
            }
        }

        $statement = $this->db->prepare("SELECT * FROM sms_tarife WHERE tarif_id = :id");
        $statement->execute(array('id' => $id));
        $row = $statement->fetch();

        $data['status'] = 'success';
        $data['data'] = $row;

        return $data;
    }

    /**
     * Alle Tarife ermitteln
     * @return mixed
     */
    public function getTariffAll(){
        $statement = $this->db->query("Select tarif_id,tarif_name From sms_tarife order by tarif_name asc");
        $statement->execute();
        $row = $statement->fetchAll();

        $data['status'] = 'success';
        $data['data'] = $row;

        return $data;
    }

    /**
     * creates new tariff
     * @return mixed
     */
    public function createTariff(){

        $data = array();

        $user = new User();
        $user->get();

        if (!$user->checkRight('admin') AND !$user->checkRight('tarif_bearbeiten')) {
            $data['status'] = "error";
            $data['errortext'] = "Rechte nicht vorhanden";
            return $data;
        }

        $tariff = $this->data->tariff;
        $store = $this->data->store;

        $query = 'Insert INTO sms_tarife SET
                    tarif_name = :tarif_name,
                    tarif_bemerkung = :tarif_bemerkung,
                    tarif_ziel_gruppe = :tarif_ziel_gruppe,
                    tarif_filiale = :tarif_filiale,
                    tarif_kat = :tarif_kat,
                    tarif_monatspreis = :tarif_monatspreis,
                    tarif_netz_id = :tarif_netz_id,
                    tarif_nr = :tarif_nr,
                    tarif_praemie = :tarif_praemie,
                    tarif_praemie_2 = :tarif_praemie_2,
                    tarif_praemie_3 = :tarif_praemie_3,
                    tarif_status = :tarif_status,
                    tarif_print = :tarif_print,        
                    tarif_vertragsdauer = :tarif_vertragsdauer,
                    tarif_vvl = :tarif_vvl,
                    tarif_punkte = :tarif_punkte,
                    tarif_praemie_mit = :tarif_praemie_mit,
                    tarif_praemie_au = :tarif_praemie_au';

        $statement = $this->db->prepare($query);

        $statement->bindValue(':tarif_name',$tariff->name);
        $statement->bindValue(':tarif_bemerkung',$tariff->note ?? '');
        $statement->bindValue(':tarif_ziel_gruppe',$tariff->targetGroup ?? 0);
        $statement->bindValue(':tarif_filiale',($tariff->isCentral) ? 1 : $store);
        $statement->bindValue(':tarif_kat',$tariff->tariffType);        
        $statement->bindValue(':tarif_monatspreis',$tariff->monthlyAmount ?? 0);
        $statement->bindValue(':tarif_netz_id',$tariff->networkOperator); 
        $statement->bindValue(':tarif_nr',$tariff->number);
        $statement->bindValue(':tarif_praemie',$tariff->fee ?? 0);
        $statement->bindValue(':tarif_praemie_2',$tariff->feeSecondMonth ?? 0);
        $statement->bindValue(':tarif_praemie_3',$tariff->feeThirdMonth ?? 0);
        $statement->bindValue(':tarif_status',$tariff->status ?? 'aktiv');
        $statement->bindValue(':tarif_print',$tariff->printOnInvoice);
        $statement->bindValue(':tarif_vertragsdauer',$tariff->contractTerm);
        $statement->bindValue(':tarif_vvl',$tariff->vvlTerm);
        $statement->bindValue(':tarif_punkte',$tariff->feePoints ?? 0);        
        $statement->bindValue(':tarif_praemie_mit',$tariff->feeEmployee ?? 0);
        $statement->bindValue(':tarif_praemie_au',$tariff->au ?? 0);

       
        
        if($statement->execute()) {
            $data['status'] = 'success';
            $id = $this->db->lastInsertId();
            $tariff->id = $id;
            $data['data'] = $tariff;
        }

        return $data;
    }

    /**
     * updates existing tariff
     * @return mixed
     */
    public function updateTariff(){

        $data = array();

        $user = new User();
        $user->get();

        if (!$user->checkRight('admin') AND !$user->checkRight('tarif_bearbeiten')) {
            $data['status'] = "error";
            $data['errortext'] = "Rechte nicht vorhanden";
            return $data;
        }

        $tariff = $this->data->tariff;
        $store = $this->data->store;

        $query = 'Update sms_tarife SET
                    tarif_name = :tarif_name,
                    tarif_bemerkung = :tarif_bemerkung,
                    tarif_ziel_gruppe = :tarif_ziel_gruppe,
                    tarif_filiale = :tarif_filiale,
                    tarif_kat = :tarif_kat,
                    tarif_monatspreis = :tarif_monatspreis,
                    tarif_netz_id = :tarif_netz_id,
                    tarif_nr = :tarif_nr,
                    tarif_praemie = :tarif_praemie,
                    tarif_praemie_2 = :tarif_praemie_2,
                    tarif_praemie_3 = :tarif_praemie_3,
                    tarif_status = :tarif_status,
                    tarif_print = :tarif_print,        
                    tarif_vertragsdauer = :tarif_vertragsdauer,
                    tarif_vvl = :tarif_vvl,
                    tarif_punkte = :tarif_punkte,
                    tarif_praemie_mit = :tarif_praemie_mit,
                    tarif_praemie_au = :tarif_praemie_au
                    Where tarif_id = :tarif_id';

        $statement = $this->db->prepare($query);

        $statement->bindValue(':tarif_name',$tariff->name);
        $statement->bindValue(':tarif_bemerkung',$tariff->note ?? '');
        $statement->bindValue(':tarif_ziel_gruppe',$tariff->targetGroup ?? 0);
        $statement->bindValue(':tarif_filiale',($tariff->isCentral) ? 1 : $store);
        $statement->bindValue(':tarif_kat',$tariff->tariffType);
        $statement->bindValue(':tarif_monatspreis',$tariff->monthlyAmount ?? 0);
        $statement->bindValue(':tarif_netz_id',$tariff->networkOperator);
        $statement->bindValue(':tarif_nr',$tariff->number);
        $statement->bindValue(':tarif_praemie',$tariff->fee ?? 0);
        $statement->bindValue(':tarif_praemie_2',$tariff->feeSecondMonth ?? 0);
        $statement->bindValue(':tarif_praemie_3',$tariff->feeThirdMonth ?? 0);
        $statement->bindValue(':tarif_status',$tariff->status ?? 'aktiv');
        $statement->bindValue(':tarif_print',$tariff->printOnInvoice);
        $statement->bindValue(':tarif_vertragsdauer',$tariff->contractTerm);
        $statement->bindValue(':tarif_vvl',$tariff->vvlTerm);
        $statement->bindValue(':tarif_punkte',$tariff->feePoints ?? 0);
        $statement->bindValue(':tarif_praemie_mit',$tariff->feeEmployee ?? 0);
        $statement->bindValue(':tarif_praemie_au',$tariff->au ?? 0);
        $statement->bindValue(':tarif_id',$tariff->tariffId ?? 0);

        if($statement->execute()) {
            $data['status'] = 'success';
        }

        if($this->data->calc === 'calcEnd' OR $this->data->calc === 'calcBoth') {

            $query = "UPDATE sms_vertragslog  
                      SET vertrag_ende=date_add(vertragsbeginn,interval :tarif_vertragsdauer Month  ) 
                      WHERE vertrag_tarif = :tariff AND vertrag_geloescht <> 'geloescht'";


            $statement = $this->db->prepare($query);
            $statement->bindValue(':tariff',$tariff->tariffId ?? 0);
            $statement->bindValue(':tarif_vertragsdauer',$tariff->contractTerm);

            if($statement->execute()) {
                $data['status'] = 'success';
            } else {
                $data['errortext'] = 'Fehler beim Neusetzen von Vertragsbeginn';
            }
        }

        if($this->data->calc === 'calcVVL' OR $this->data->calc === 'calcBoth') {

            $query = "UPDATE sms_vertragslog  
                      SET vertrag_vvl=date_sub(vertrag_ende,interval :tarif_vvl_berechtigt Month  ) 
                      WHERE vertrag_tarif = :tariff AND vertrag_geloescht <> 'geloescht'";


            $statement = $this->db->prepare($query);
            $statement->bindValue(':tariff',$tariff->tariffId ?? 0);
            $statement->bindValue(':tarif_vvl_berechtigt',$tariff->vvlTerm);

            if($statement->execute()) {
                $data['status'] = 'success';
            } else {
                $data['errortext'] = 'Fehler beim Neusetzen von VVL Zeitpunkt';
            }
        }

        return $data;
    }

    /**
     * Alle Tarife für Filiale oder Zentraltarife(Filliale=1)
     * @return mixed
     */
    public function getTariffStoreAndCentral(){

        $statement = $this->db->prepare("SELECT t.tarif_id,t.tarif_name,n.netz_name FROM sms_tarife t
                                INNER JOIN sms_netzbetreiber n ON t.tarif_netz_id = n.netz_id
                                 WHERE tarif_filiale = :filiale or tarif_filiale=1 order by n.netz_name,t.tarif_name;");

        $statement->bindValue(':filiale',$this->data->filiale);

        $data['data'] = array();

        if($statement->execute()) {
            while($row = $statement->fetch()) {
                $data['status'] = 'success';
                $tmp = array('tarif_id' => $row['tarif_id'],
                             'tarif_name' => $row['netz_name'].' '.$row['tarif_name'])     ;
                $data['data'][] = $tmp;
            }
        }

        return $data;
    }

    /**
     * Alle Tarife für Filiale oder Zentraltarife(Filliale=1),
     * welche Aktiv sind und zudem noch den aktuellen TArif, falls dieser deaktiviert ist
     * @return mixed
     */
    public function getTariffStoreAndCentralActiveContractEdit(){

        $statement = $this->db->prepare("SELECT t.tarif_id,t.tarif_name,n.netz_name FROM sms_tarife t
                                LEFT JOIN sms_netzbetreiber n ON t.tarif_netz_id = n.netz_id
                                LEFT JOIN sms_filiale_netzbetreiber ON t.tarif_netz_id=sms_filiale_netzbetreiber.filnetz_netz 
                                 WHERE (t.tarif_status = 'aktiv' or t.tarif_status = '') AND sms_filiale_netzbetreiber.filnetz_filiale = :filiale
                                  AND (tarif_filiale = :filiale or tarif_filiale='1'  or tarif_filiale='0') OR tarif_id = :tarif order by n.netz_name,t.tarif_name;");

        $statement->bindValue(':filiale',$this->data->filiale);
        $statement->bindValue(':tarif',$this->data->tarif);

        $data['data'] = array();

        if($statement->execute()) {
            while($row = $statement->fetch()) {
                $data['status'] = 'success';
                $tmp = array('tarif_id' => $row['tarif_id'],
                    'tarif_name' => $row['netz_name'].' '.$row['tarif_name'])     ;
                $data['data'][] = $tmp;
            }
        }

        return $data;
    }

    /**
     *
     * @return mixed
     */
    public function searchTariffStoreAndCentralActive(){

        $statement = $this->db->prepare("SELECT t.tarif_id,t.tarif_name,t.tarif_nr,n.netz_name FROM sms_tarife t
                                INNER JOIN sms_netzbetreiber n ON t.tarif_netz_id = n.netz_id
                                 WHERE (t.tarif_status = 'aktiv' or t.tarif_status = '') AND (tarif_filiale = :filiale or tarif_filiale=1 or tarif_filiale='') AND 
                                (n.netz_name like :netzName OR  t.tarif_name like :tarifname) 
                                order by n.netz_name,t.tarif_name Limit 100");

        $statement->bindValue(':filiale',$this->data->filiale);
        $statement->bindValue(':netzName','%'.$this->data->search.'%');
        $statement->bindValue(':tarifname','%'.$this->data->search.'%');

        $data['data'] = array();

        if($statement->execute()) {
            $data['status'] = 'success';
            while($row = $statement->fetch()) {

                $tmp = array('tarif_id' => $row['tarif_id'],
                    'tarif_name' => $row['netz_name'].' '.$row['tarif_name'],
                    'tarif_nr'=> $row['tarif_nr']);
                $data['data'][] = $tmp;
            }
            $data['data'] = $data['data'] ?? array();
        }

        return $data;
    }

    /**
     *
     * @return mixed
     */
    public function searchTariffInvoiceFast(){

        $statement = $this->db->prepare("SELECT t.tarif_id,t.tarif_name,t.tarif_nr,n.netz_name FROM sms_tarife t
                                 LEFT JOIN sms_netzbetreiber n ON t.tarif_netz_id = n.netz_id
                                 LEFT JOIN sms_filiale_netzbetreiber ON t.tarif_netz_id=sms_filiale_netzbetreiber.filnetz_netz 
                                 WHERE (t.tarif_status = 'aktiv' or t.tarif_status = '') AND (tarif_filiale = :filiale or tarif_filiale=1 or tarif_filiale='') AND 
                                (n.netz_name like :netzName OR  t.tarif_name like :tarifname) AND filnetz_filiale = :filnetz_filiale
                                order by n.netz_name,t.tarif_name Limit 100");

        $statement->bindValue(':filiale',$this->data->filiale);
        $statement->bindValue(':filnetz_filiale',$this->data->filiale);
        $statement->bindValue(':netzName','%'.$this->data->search.'%');
        $statement->bindValue(':tarifname','%'.$this->data->search.'%');

        $data['data'] = array();

        if($statement->execute()) {
            $data['status'] = 'success';
            while($row = $statement->fetch()) {

                $tmp = array('tarif_id' => $row['tarif_id'],
                    'tarif_name' => $row['netz_name'].' '.$row['tarif_name'],
                    'tarif_nr'=> $row['tarif_nr']);
                $data['data'][] = $tmp;
            }
            $data['data'] = $data['data'] ?? array();
        }

        return $data;
    }

    /**
     * returns tariff categories
     * @return mixed
     */
    public function getTariffCategories(){
        $statement = $this->db->prepare("SELECT sms_tarife.tarif_kat FROM sms_tarife GROUP by tarif_kat ORDER BY tarif_kat");
        if($statement->execute()) {
            $data['status'] = 'success';
            while($row = $statement->fetch()){
                $tmp = array();
                $tmp['id'] = $row['tarif_kat'];
                $tmp['name'] = $row['tarif_kat'];
                $items[] = $tmp;
            }
            $data['items'] = $items ?? array();
            $data['count'] = $statement->rowCount();
        }
        return $data;
    }




    public function getTarifByNet(Request $request, Response $response, $arguments){
        $id = (int)$arguments['id'];

        $statement = $this->db->prepare("SELECT tarif_id, tarif_name, tarif_kat FROM sms_tarife WHERE tarif_netz_id = :id");
        $statement->execute(array('id' => $id));
        $row = $statement->fetchAll();

        $data['status'] = 'success';
        $data['data'] = $row;


        return $response->withStatus(200)
            ->withHeader("Content-Type", "application/json")
            ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }

    public function getNetzbetreiber($name = ''){

        if(strlen($name) > 0){
            $statement = $this->db->prepare("SELECT netz_id FROM sms_netzbetreiber WHERE netz_name = :name");
            $statement->execute(array("name" => $name));
            if($statement->rowCount() == 0){
                $statement = $this->db->prepare("INSERT INTO sms_netzbetreiber SET netz_name = :name");
                $statement->execute(array("name" => $name));
                return $this->db->lastInsertId();
            } else {
                $row = $statement->fetch();
                return $row['netz_id'];
            }
        } else {
            return false;
        }
    }

    public function generateNr(){
        $statement = $this->db->prepare("SELECT max(tarif_nr) as tarif_nr FROM sms_tarife");
        $statement->execute();
        $row = $statement->fetch();
        $tarif_nr = $row['tarif_nr'];
        $tarif_nr++;
        return $tarif_nr;
    }

    /**
     * used to activate multiple tariffs
     * @return mixed
     */
    public function activateMultipleTariff(){

        $user = new User();
        $user->get();

        if (!$user->checkRight('admin') AND !$user->checkRight('tarif_bearbeiten')) {
            $data['status'] = "error";
            $data['errortext'] = "Rechte nicht vorhanden";
            return $data;
        }
        
        $tariff = $this->data->tariff;

        $data = array();

       foreach ($tariff as $value) {
           $this->setValue('tariffId', $value->tarif_id);
           $this->activateTariff();
       }
        $data['status'] = 'success';
        return $data;
    }

    /**
     * activates tariff
     * @return mixed
     */

    public function activateTariff() {

        $user = new User();
        $user->get();

        if (!$user->checkRight('admin') AND !$user->checkRight('tarif_bearbeiten')) {
            $data['status'] = "error";
            $data['errortext'] = "Rechte nicht vorhanden";
            return $data;
        }
        
        $statement = $this->db->prepare("Update sms_tarife SET tarif_status = 'aktiv' Where tarif_id = :tariffId");

        $statement->bindValue(':tariffId',$this->data->tariffId);

        $data['data'] = array();

        if($statement->execute()) {
            $data['status'] = 'success';
        } else {
            $data['status'] = 'error';
        }

        return $data;
    }

    /**
     * used to deactivate multiple tariffs
     */
    public function deactivateMultipleTariff(){

        $user = new User();
        $user->get();

        if (!$user->checkRight('admin') AND !$user->checkRight('tarif_bearbeiten')) {
            $data['status'] = "error";
            $data['errortext'] = "Rechte nicht vorhanden";
            return $data;
        }
        
        $tariff = $this->data->tariff;

        $data = array();

        foreach ($tariff as $value) {
            $this->setValue('tariffId', $value->tarif_id);
            $this->deactivateTariff();
        }
        $data['status'] = 'success';
        return $data;
    }

    /**
     * deactivates tariff
     * @return mixed
     */

    public function deactivateTariff() {

        $user = new User();
        $user->get();

        if (!$user->checkRight('admin') AND !$user->checkRight('tarif_bearbeiten')) {
            $data['status'] = "error";
            $data['errortext'] = "Rechte nicht vorhanden";
            return $data;
        }
        
        $statement = $this->db->prepare("Update sms_tarife SET tarif_status = 'nicht aktiv' Where tarif_id = :tariffId");

        $statement->bindValue(':tariffId',$this->data->tariffId);

        $data['data'] = array();

        if($statement->execute()) {
            $data['status'] = 'success';
        } else {
            $data['status'] = 'error';
        }

        return $data;
    }

    /**
     * used to delete multiple tariffs
     */
    public function deleteMultipleTariff(){

        $user = new User();
        $user->get();

        if (!$user->checkRight('admin') AND !$user->checkRight('tarif_bearbeiten')) {
            $data['status'] = "error";
            $data['errortext'] = "Rechte nicht vorhanden";
            return $data;
        }
        
        $tariff = $this->data->tariff;

        $data = array();

        foreach ($tariff as $value) {
            $this->setValue('tariffId', $value->tarif_id);
            $this->deleteTariff();
        }
        $data['status'] = 'success';
        return $data;
    }

    /**
     * deletes tariff
     * @return mixed
     */

    public function deleteTariff() {

        $user = new User();
        $user->get();

        if (!$user->checkRight('admin') AND !$user->checkRight('tarif_bearbeiten')) {
            $data['status'] = "error";
            $data['errortext'] = "Rechte nicht vorhanden";
            return $data;
        }
        
        $statement = $this->db->prepare("Delete From sms_tarife Where tarif_id = :tariffId");

        $statement->bindValue(':tariffId',$this->data->tariffId);

        $data['data'] = array();

        if($statement->execute()) {
            $data['status'] = 'success';
        } else {
            $data['status'] = 'error';
        }

        return $data;
    }


}
