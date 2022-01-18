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

    /**
     * Gibt alle Distributoren zurück
     */
    public function getAll(){
        $query = "SELECT distri_id, distri_name FROM sms_distributor order by distri_name";
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

}
