<?php


namespace Mocca;

use\PDO;

class Tag
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

    /**gib Tags anhand der Eigenschaften zurück
     * @return mixed
     */
    public function getTags() {

        // Gebe alle Tags zu type und Schlüssel aus
        if ($this->data->autocomplete===false) {
            
            $query = "SELECT tag_id,tag_name 
                    FROM sms_tag 
                    Where tag_type = :type and tag_fk = :key";

            $statement = $this->db->prepare($query);

            $statement->bindValue(':type', $this->data->type);
            $statement->bindValue(':key', $this->data->key);

            if ($statement->execute()) {
                $data["status"] = 'success';
                while ($row = $statement->fetch()) {
                    $items[] = array('tag_id' => $row['tag_id'], 'tag_name'=> $row['tag_name']);
                }

                $data['data'] = empty($items) ? array() : $items;

                /*if(!empty($items)) {
                    $data['data']=$items;
                }*/
            }
        }

        //gebe Top 10 der passendesten Tags aus der ganzen DB aus
        if ($this->data->autocomplete===true) {

            $query = "Select DISTINCT(tag_name) from sms_tag 
                        Where tag_type = :type and tag_name like CONCAT('%',:search,'%') Limit 20";

            $statement = $this->db->prepare($query);

            $statement->bindValue(':type', $this->data->type);
            $statement->bindValue(':search', $this->data->search);

            if ($statement->execute()) {
                $data["status"] = 'success';
                while ($row = $statement->fetch()) {
                    foreach ($row as $key => $value) {
                        $tmp = $value;
                    }
                    $items[] = $tmp;
                }

                $data['data'] = empty($items) ? array() : $items;

                /*if (!empty($items)) {
                    $data['data'] = $items;
                }*/
            }
        }
        return $data;
    }

    /** returns all tags with the specific type
     * @return mixed
     */
    public function getTagsByTagType() {
        $query = "SELECT DISTINCT tag_name 
                    FROM sms_tag 
                    Where tag_type = :type";

        $statement = $this->db->prepare($query);

        $statement->bindValue(':type', $this->data->type);

        if ($statement->execute()) {
            $data["status"] = 'success';
            while ($row = $statement->fetch()) {

                $items[] = array('tag_name' => $row['tag_name']);
            }

            $data['data'] = empty($items) ? array() : $items;
        }

        return $data;
    }

    /**
     * Füge Tag hinzu
     */
    public function addTag() {

        $query = "Select tag_name from sms_tag 
                        Where tag_type = :type and tag_name = :tag_name AND tag_fk =:key ";

        $statement = $this->db->prepare($query);

        $statement->bindValue(':type', $this->data->type);
        $statement->bindValue(':tag_name', $this->data->tag_name);
        $statement->bindValue(':key', $this->data->key);

        $return=array();

        if($statement->execute()) {
            if(!$row = $statement->fetch()) {
                $query = "INSERT INTO sms_tag (tag_fk, tag_type, tag_name)
                Values (:key, :type, :tag_name)";

                $statement = $this->db->prepare($query);

                $statement->bindValue(':type', $this->data->type);
                $statement->bindValue(':tag_name', $this->data->tag_name);
                $statement->bindValue(':key', $this->data->key);

                if($statement->execute()) {
                    $return['status'] =  'success';
                    $return['statusCode'] =  'Tag erfolgreich hinzugefügt';
                } else {
                    $return['status'] =  'error';
                    $return['statusCode'] =  'Tag konnte nicht hinzugefügt werden';
                }
            } else {
                $return['status'] =  'error';
                $return['statusCode'] =  'Tag bereits vorhanden';
            }
        }
        return $return ?? array();
    }

    /**
     * lösche Tag
     */
    public function deleteTag() {
        $query = "DELETE FROM sms_tag WHERE tag_id = :tag_id";

        $statement = $this->db->prepare($query);

        $statement->bindValue(':tag_id', $this->data->tag_id);

        if($statement->execute()) {
            $return =  'success';
        }

        return $return;
    }

    /**
     * Aktualisiere Tags
     */
    public function updateTags() {

        $in = '';
        //gehe jeden eingegebenen Tag durch
        foreach ($this->data->tags as $key => $value) {

            $key = ":tag_name".$key;
            $in .= "$key,";
            $query = "Select tag_name from sms_tag 
                        Where tag_type = :type and tag_name = :tag_name AND tag_fk =:key ";

            $statement = $this->db->prepare($query);

            $statement->bindValue(':type', $this->data->type);
            $statement->bindValue(':tag_name', $value);
            $statement->bindValue(':key', $this->data->key);

            $statement->execute();

            //Füge neue Tags hinzu
            if(!$row = $statement->fetch()) {
                $queryUpdate = "INSERT INTO sms_tag (tag_fk, tag_type, tag_name)
                                Values (:key, :type, :tag_name)";

                $statementUpdate = $this->db->prepare($queryUpdate);

                $statementUpdate->bindValue(':type', $this->data->type);
                $statementUpdate->bindValue(':tag_name', $value);
                $statementUpdate->bindValue(':key', $this->data->key);

                $statementUpdate->execute();
            }
        }

        $in = rtrim($in,",");
        // nicht mehr vorhandene löschen
        $queryDelete = "Delete  from sms_tag
                        Where tag_type = :type and tag_name NOT IN ($in) AND tag_fk =:key ";

        $statementDelete = $this->db->prepare($queryDelete);
        $statementDelete->bindValue(':type', $this->data->type);
        $statementDelete->bindValue(':key', $this->data->key);

        foreach ($this->data->tags as $key => $value) {
            $statementDelete->bindValue(':tag_name'.$key, $value);
        }
        $statementDelete->execute();
    }
}
