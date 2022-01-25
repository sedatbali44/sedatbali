<?php


namespace Mocca;


class TariffType
{
    public function __construct($db = 0)
    {
        global $app;
        $this->container = $app->getContainer();
        $this->db = $this->container['db'];
    }

    public function setValue($name,$value){
        $this->data->$name = $value;
    }

    public function getTariffTypes() {
        $query = "SELECT * 
                    FROM  sms_tarifarten                   	
                    Order by tarifart_name asc";

        $statement = $this->db->prepare($query);

        $data = array();

        if($statement->execute()) {
            while($row = $statement->fetch()){
                foreach($row as $key => $value) {
                    $tmp[$key]=$value;
                }
                $items[] = $tmp ?? array();
            }
            $data['status'] = 'success';
            $data['items'] = $items ?? array();

        } else {
            $data['status'] = 'error';
        }

        return $data;
    }
}
