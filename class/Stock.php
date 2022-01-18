<?php


namespace Mocca;


class Stock
{
    public function __construct($db = 0)
    {
        global $app;
        $this->container = $app->getContainer();
        $this->db = $this->container['db'];
        $this->token = $this->container['token']->decoded;
    }

    public function setValue($name,$value)  {
        $this->data->$name = $value;
    }

    public function getStocks () {
        $query = "SELECT *  FROM sms_lagerort WHERE lager_filiale = :filiale ORDER BY lager_name";
        $sql = $this->db->prepare($query);
        $sql->bindValue(':filiale', $this->data->filiale);

        if($sql->execute()) {
            $data['data'] = array();
            $rows = $sql->fetchAll();
            $data['data'] = $rows ?? array();
            $data['status'] = 'success';
        }
        return $data;
    }


    public function getStockValue ($filiale = 0) {


        $query="SELECT artikel_id, artikel_text, artikel_ek, artikel_warengruppe, artikel_bestand, artikel_typ, artikel_seriennr, artikel_nr, waren_name, serien_ek, serien_nr FROM sms_artikel 
            LEFT JOIN sms_warengruppen ON waren_id=artikel_warengruppe
            LEFT JOIN sms_untergruppen ON unter_id=artikel_untergruppe
            LEFT JOIN sms_distributor ON distri_id=artikel_distributor 
            LEFT JOIN sms_seriennummern ON serien_artikel=artikel_id
            WHERE artikel_filiale=:filiale  and artikel_typ<>1 and ((artikel_bestand>'0' and artikel_seriennr<>1 )or (artikel_seriennr=1 and serien_status='')) and artikel_status='' ";
        if(isset($this->data->manufactor) && strlen($this->data->manufactor) > 0){ $query.=" and  artikel_hersteller=:hersteller "; }
        if(isset($this->data->productgroup) && strlen($this->data->productgroup) > 0){ $query.=" and  artikel_warengruppe=:warengruppe "; }
        //$query .= " GROUP BY artikel_id ORDER BY artikel_text";
        $query .= "  ORDER BY artikel_text";
        $sql = $this->db->prepare($query);
        if($filiale == 0){
            $sql->bindValue('filiale', $this->token['filiale']);
        } else {
            $sql->bindValue('filiale', $filiale);
        }


        if(isset($this->data->manufactor) && strlen($this->data->manufactor) > 0){ $sql->bindValue('hersteller', $this->data->manufactor); }
        if(isset($this->data->productgroup) && strlen($this->data->productgroup) > 0){ $sql->bindValue('warengruppe', $this->data->productgroup); }


        if($sql->execute()) {
            $data['data'] = array();
            $rows = $sql->fetchAll();
            $data['data'] = $rows ?? array();
            $data['status'] = 'success';
        }
        $data['sum'] = 0;

        foreach ($data['data'] as $key => $val){
            if($val['artikel_seriennr'] == 1){
                $data['data'][$key]['artikel_bestand'] = 1;
                $data['data'][$key]['sum'] = $val['serien_ek'];
                $data['data'][$key]['artikel_ek'] = $val['serien_ek'];

            } else {
                $data['data'][$key]['sum'] = $val['artikel_bestand'] * $val['artikel_ek'];
                $data['data'][$key]['serien_nr'] = '';

            }

            $data['sum'] = $data['sum'] + $data['data'][$key]['sum'];

        }


        return $data;
    }

}
