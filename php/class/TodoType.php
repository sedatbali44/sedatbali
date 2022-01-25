<?php

namespace Mocca;

use Slim\Http\Request;
use Slim\Http\Response;
use Interop\Container\ContainerInterface;
use \PDO;


class TodoType
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

    /**
     * returns all todo type records
     * @return mixed
     */
    public function getTypes()
    {
        $query = "SELECT * FROM sms_todo_typ ORDER BY todo_typ_name";

        $sql = $this->db->prepare($query);

        $data['data'] = array();

        if ($sql->execute()) {
            $data["status"] = 'success';
            while ($row = $sql->fetch()) {

                foreach ($row as $key => $value) {
                    $tmp[$key] = $value;
                }
                $items[] = $tmp;
            }

            if (!empty($items)) {
                $data['data'] = $items;
            }
        }
        return $data;
    }

    /**
     * creates a todo type record
     * @return mixed
     */
    public function createType()
    {
       $query = "INSERT INTO sms_todo_typ (todo_typ_name) VALUES (:name)";
        $sql = $this->db->prepare($query);
        $sql->bindValue(':name', $this->data->name);

        if ($sql->execute()) {
            $data["status"] = 'success';
        }
        return $data;
    }

    /**
     * updates a todo type record
     * @return mixed
     */
    public function updateType()
    {
        $query = "UPDATE sms_todo_typ 
                    SET todo_typ_name = :name
                    WHERE todo_typ_id = :id";

        $sql = $this->db->prepare($query);
        $sql->bindValue(':id', $this->data->id);
        $sql->bindValue(':name', $this->data->name);

        if ($sql->execute()) {
            $data["status"] = 'success';
        }
        return $data;
    }

    /**
     * deletes a todo type record
     * @return mixed
     */
    public function deleteType()
    {
        $query = "DELETE FROM sms_todo_typ WHERE todo_typ_id = :id";

        $sql = $this->db->prepare($query);
        $sql->bindValue(':id', $this->data->id);

        if ($sql->execute()) {
            $data["status"] = 'success';
        }
        return $data;
    }
}
