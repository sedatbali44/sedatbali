<?php


namespace Mocca;


class Stamp
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

    public function checkStamp() {

    }

    /**
     * return last stamp for specific user
     * @return mixed
     */
    public function getLastStamp($user) {

        $query = "Select sms_stamp.*, sms_config.name 
                  from sms_stamp 
                  LEFT JOIN sms_config ON sms_stamp.stamp_store_id = sms_config.id
                  Where stamp_customer_id = :customer order by stamp_corrected_stamp desc Limit 1";

        $statement = $this->db->prepare($query);

        $statement->bindValue(':customer', $user);

        $data['data']= array();

        if ($statement->execute()) {
            $data["status"] = 'success';
            while ($row = $statement->fetch()) {
                foreach ($row as $key => $value) {
                    $tmp[$key] = $value;
                }

                $items = $tmp;
            }

            $data['data'] = $items ?? array();

        }
        return $data;

    }

    /**
     * inserts a stamp
     * @return array
     */
    public function setStamp() {
        $data = array();

        $user = $this->data->user;
        $store = $this->data->store;
        $type = $this->data->type;
        $note = $this->data->note;
        $coordinateLatitude = $this->data->coordinateLatitude;
        $coordinateLongitude = $this->data->coordinateLongitude;

        $pairId = '';

        $associatedDate = date('Y-m-d');
        $lastStamp = $this->getLastStamp($this->data->user)['data'];

        if($lastStamp['stamp_type'] === $type) {
            $data['status'] = 'error';
            $data['errorcode'] = 'Stempelung konnte nicht durchgeführt werden. Neuer Typ und letzter Typ identisch';
        }

        if($data['status'] !== 'error') {
            if ($type ==='out') {
                $associatedDate = $lastStamp['stamp_associated_date'];
                $pairId = $lastStamp['stamp_id'];
            }

            $query = "INSERT INTO `mocca`.`sms_stamp`
                    SET 
                    stamp_customer_id = :customer,
                    stamp_original_stamp = CURRENT_TIMESTAMP(),
                    stamp_accepted_stamp = CURRENT_TIMESTAMP(),
                    stamp_corrected_stamp = CURRENT_TIMESTAMP(),
                    stamp_associated_date = :associatedDate,
                    stamp_type = :type,
                    stamp_note = :note,        
                    stamp_pair_stamp_id = :pairId,
                    stamp_store_id = :store,
                    stamp_coordinate_latitude = :coordinateLatitude,
                    stamp_coordinate_longitude = :coordinateLongitude";

            $statement = $this->db->prepare($query);

            $statement->bindValue(':customer', $user);
            $statement->bindValue(':type', $type);
            $statement->bindValue(':note', $note);
            $statement->bindValue(':associatedDate', $associatedDate);
            $statement->bindValue(':coordinateLatitude', $coordinateLatitude);
            $statement->bindValue(':coordinateLongitude', $coordinateLongitude);
            $statement->bindValue(':pairId', $pairId);
            $statement->bindValue(':store', $store);

            if ($statement->execute()) {
                $data['status'] = 'success';

                if ($type ==='out') {
                    $lastId= $this->db->lastInsertId();

                    $querySetPair = "Update sms_stamp SET stamp_pair_stamp_id = :pairId Where stamp_id = :stampId";
                    $statementSetPair = $this->db->prepare($querySetPair);

                    $statementSetPair->bindValue(':pairId', $lastId);
                    $statementSetPair->bindValue(':stampId', $lastStamp['stamp_id']);

                    $statementSetPair->execute();
                }

            } else {
                $data['status'] = 'error';
                $data['errorcode'] = 'Stempelung konnte nicht durchgeführt werden';
            }
        }

        return $data;
    }
}
