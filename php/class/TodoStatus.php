<?php

namespace Mocca;

use Slim\Http\Request;
use Slim\Http\Response;
use Interop\Container\ContainerInterface;
use \PDO;


class TodoStatus
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
    public function getStatus()
    {
        $query = "SELECT * FROM sms_todo_status ORDER BY todo_status_name";

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
    public function createStatus()
    {
       $query = "INSERT INTO sms_todo_status (todo_status_name) VALUES (:name)";
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
    public function updateStatus()
    {
        $query = "UPDATE sms_todo_status 
                    SET todo_status_name = :name
                    WHERE todo_status_id = :id";

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
        $query = "DELETE FROM sms_todo_status WHERE todo_status_id = :id";

        $sql = $this->db->prepare($query);
        $sql->bindValue(':id', $this->data->id);

        if ($sql->execute()) {
            $data["status"] = 'success';
        }
        return $data;
    }
}
