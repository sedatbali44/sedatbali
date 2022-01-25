<?php


namespace Mocca;

use \PDO;

class Todo
{
    public function __construct($db = 0)
    {
        global $app;
        $this->container = $app->getContainer();
        $this->db = $this->container['db'];
        $this->token = $this->container['token']->decoded;
    }

    public function setValue($name,$value){
        $this->data->$name = $value;
    }

    public function getByID($id){

        $query = "SELECT todo.todo_id,todo.todo_kunde_id,data.vorname, data.name ,todo.todo_angelegt, todo.todo_typ_id, todo.todo_mitarbeiter_id, todo.todo_in_bearbeitung_mitarbeiter, 
                    todo.todo_text,todo.todo_ueberschrift,mit.mit_name,todo.todo_status_id,sta.todo_status_name, mit2.mit_name as bearbeiter, todo_ziel_mitarbeiter_id
                    FROM sms_todo todo
                    LEFT JOIN sms_mitarbeiter mit ON todo.todo_mitarbeiter_id = mit.mit_id
                    LEFT JOIN sms_mitarbeiter mit2 ON todo.todo_ziel_mitarbeiter_id = mit2.mit_id
                    LEFT JOIN sms_todo_status sta ON todo.todo_status_id = sta.todo_status_id
                    LEFT JOIN smsdata data ON todo.todo_kunde_id = data.id
                    WHERE todo.todo_id = :id";
        $statement = $this->db->prepare($query);
        $statement->execute(array("id" => $id));
        $row = $statement->fetch();

        $this->data = (object)$row;
        $this->olddata = (object)$row;

        return $row;

    }

    public function delete(){


        if(!isset($this->data->todo_id) OR $this->data->todo_id == 0){
            die("keine ID vorhanden");
        }

        $query = "DELETE FROM sms_todo WHERE todo_id = :todo_id";
        $statement = $this->db->prepare($query);
        $statement->execute(array(
            "todo_id" => $this->data->todo_id,
        ));

        $log = new Mitlog;
        $aktion = "Todo gelöscht: ".$this->todo->todo_ueberschrift;
        $log->setAktion($aktion);
        $log->save();

        return true;

    }

    public function saveNew(){

        $query = "INSERT INTO sms_todo SET 
                    todo_kunde_id = :todo_kunde_id,
                    todo_in_bearbeitung_mitarbeiter = :todo_in_bearbeitung_mitarbeiter,
                    todo_mitarbeiter_id = :todo_mitarbeiter_id,
                    todo_status_id = :todo_status_id,
                    todo_text = :todo_text,
                    todo_typ_id = :todo_typ_id,
                    todo_filiale_id = :filiale,
                    todo_angelegt = NOW(),
                    todo_ueberschrift = :todo_ueberschrift";

        $statement = $this->db->prepare($query);
        $statement->execute(array(
            "todo_kunde_id" => $this->data->todo_kunde_id,
            "todo_in_bearbeitung_mitarbeiter" => $this->data->todo_in_bearbeitung_mitarbeiter,
            "todo_mitarbeiter_id" => $this->data->todo_mitarbeiter_id,
            "todo_status_id" => $this->data->todo_status_id,
            "todo_text" => $this->data->todo_text,
            "todo_typ_id" => $this->data->todo_typ_id,
            "filiale" => $this->token['filiale'],
            "todo_ueberschrift" => $this->data->todo_ueberschrift
        ));

        return true;


    }

    public function save(){

        if(!isset($this->data->todo_id) OR $this->data->todo_id == 0){
            die("keine ID vorhanden");
        }

        $query = "UPDATE sms_todo SET 
                    todo_kunde_id = :todo_kunde_id,
                    todo_in_bearbeitung_mitarbeiter = :todo_in_bearbeitung_mitarbeiter,
                    todo_mitarbeiter_id = :todo_mitarbeiter_id,
                    todo_ziel_mitarbeiter_id = :todo_ziel_mitarbeiter_id,
                    todo_status_id = :todo_status_id,
                    todo_text = :todo_text,
                    todo_typ_id = :todo_typ_id,
                    todo_letzte_bearbeitung = NOW(),
                    todo_ueberschrift = :todo_ueberschrift
                    WHERE todo_id = :todo_id";

        $statement = $this->db->prepare($query);
        $statement->execute(array(
            "todo_kunde_id" => $this->data->todo_kunde_id,
            "todo_in_bearbeitung_mitarbeiter" => $this->data->todo_in_bearbeitung_mitarbeiter,
            "todo_mitarbeiter_id" => $this->data->todo_mitarbeiter_id,
            "todo_ziel_mitarbeiter_id" => $this->data->todo_ziel_mitarbeiter_id,
            "todo_status_id" => $this->data->todo_status_id,
            "todo_text" => $this->data->todo_text,
            "todo_typ_id" => $this->data->todo_typ_id,
            "todo_ueberschrift" => $this->data->todo_ueberschrift,
            "todo_id" => $this->data->todo_id,
        ));

        return true;


    }

    public function getTodosByUser($user){

        $query = "SELECT todo.todo_id,todo.todo_kunde_id,data.vorname, data.name ,todo.todo_angelegt, todo.todo_in_bearbeitung_mitarbeiter, todo.todo_typ_id
                    todo.todo_text,todo.todo_ueberschrift,mit.mit_name,todo.todo_status_id,sta.todo_status_name
                    FROM sms_todo todo
                    LEFT JOIN sms_mitarbeiter mit ON todo.todo_mitarbeiter_id = mit.mit_id
                    LEFT JOIN sms_todo_status sta ON todo.todo_status_id = sta.todo_status_id
                    LEFT JOIN smsdata data ON todo.todo_kunde_id = data.id
                    WHERE todo.todo_status_id <> 4 AND todo.todo_mitarbeiter_id = :user";

        $statement = $this->db->prepare($query);
        $statement->bindValue(':user', $user);

        if ($statement->execute()) {
            $data["status"] = 'success';
            while ($row = $statement->fetch()) {

                foreach ($row as $key => $value) {
                    $tmp[$key] = $value;
                }
                $tmp['todo_angelegt'] = date('d.m.Y H:i', strtotime($tmp['todo_angelegt']));
                // Zeilenumbruch in </ BR> umwndeln
                $tmp['todo_ueberschrift']=nl2br($tmp['todo_ueberschrift']);
                $items[] = $tmp;
            }

            if (!empty($items)) {
                $data['items'] = $items;
            }
        }


        return $data;

    }

    public function getTodosForUser($user){

        $query = "SELECT todo.todo_id,todo.todo_kunde_id,data.vorname, data.name ,todo.todo_angelegt,
                    todo.todo_text,todo.todo_ueberschrift,mit.mit_name,todo.todo_status_id,sta.todo_status_name
                    FROM sms_todo todo
                    LEFT JOIN sms_mitarbeiter mit ON todo.todo_mitarbeiter_id = mit.mit_id
                    LEFT JOIN sms_todo_status sta ON todo.todo_status_id = sta.todo_status_id
                    LEFT JOIN smsdata data ON todo.todo_kunde_id = data.id
                    WHERE todo.todo_status_id <> 4 AND todo.todo_ziel_mitarbeiter_id = :user";

        $statement = $this->db->prepare($query);
        $statement->bindValue(':user', $user);

        if ($statement->execute()) {
            $data["status"] = 'success';
            while ($row = $statement->fetch()) {

                foreach ($row as $key => $value) {
                    $tmp[$key] = $value;
                }
                $tmp['todo_angelegt'] = date('d.m.Y H:i', strtotime($tmp['todo_angelegt']));
                // Zeilenumbruch in </ BR> umwndeln
                $tmp['todo_ueberschrift']=nl2br($tmp['todo_ueberschrift']);
                $items[] = $tmp;
            }

            if (!empty($items)) {
                $data['items'] = $items;
            }
        }


        return $data;

    }

    public function getTodos()
    {

        $start=$this->data->start;
        $limit=$this->data->limit;
        $index=$this->data->index;
        $size=$this->data->size;

        $query = "
                    FROM sms_todo todo
                    LEFT JOIN sms_mitarbeiter mit ON todo.todo_mitarbeiter_id = mit.mit_id
                    LEFT JOIN sms_mitarbeiter mit2 ON todo.todo_ziel_mitarbeiter_id = mit2.mit_id
                    LEFT JOIN sms_todo_status sta ON todo.todo_status_id = sta.todo_status_id
                    LEFT JOIN sms_todo_typ typ ON todo.todo_typ_id = typ.todo_typ_id
                    LEFT JOIN smsdata data ON todo.todo_kunde_id = data.id
                    WHERE todo.todo_filiale_id = :todo_filiale_id";


        if(isset($limit) && is_numeric($limit) && $limit > 0){
            //$limit = $limit);
        } else {
            $limit = 100;
        }

        if(isset($start) && is_numeric($start) && $start> 0){
            //$start = mysqli_real_escape_string($con,$data->start);
        } else {
            $start = 0;
        }


        if (!empty($this->data->todo_kunde_id)) {
            $query .= " AND todo.todo_kunde_id = :todo_kunde_id ";
        }

        if ($this->data->todo_finished === 'true') {
            $query .= " AND todo.todo_status_id = 4 ";
        }

        if (!empty($this->data->status)) {
            if($this->data->status === 'allButNotDone') {
                $query .= " and todo_status_name<>'Erledigt' ";
            } else {
                $query .= " AND todo.todo_status_id = :status ";
            }
        }

        if (!empty($this->data->user)) {
            $query .= " AND (todo.todo_mitarbeiter_id = :user1 OR todo.todo_ziel_mitarbeiter_id = :user2) ";

        }

        if (!empty($this->data->typ)) {
            $query .= " AND todo.todo_typ_id = :typ ";
        }

        if($this->data->todo_finished === 'false') {
            $query .= " AND todo.todo_status_id != 4 ";
        } else if (!empty($this->data->todo_status_id)) {
            $query .= " AND todo.todo_status_id = :todo_status_id ";
        }

        $query2 = "SELECT count(*) as anzahl ".$query."";

        $statement = $this->db->prepare($query2);

        $data['data'] = array();

        $statement->bindValue(':todo_filiale_id', $this->data->todo_filiale_id);

        if(!empty($this->data->todo_kunde_id)) {
            $statement->bindValue(':todo_kunde_id', $this->data->todo_kunde_id);
        }

        if($this->data->todo_finished !== 'true' AND !empty($this->data->todo_status_id)) {
            $statement->bindValue(':todo_status_id', $this->data->todo_status_id);
        }

        if (!empty($this->data->status) AND $this->data->status !== 'allButNotDone') {
            $statement->bindValue(':status', $this->data->status);
        }

        if (!empty($this->data->user)) {

            $statement->bindValue(':user1', $this->data->user);
            $statement->bindValue(':user2', $this->data->user);

        }

        if (!empty($this->data->typ)) {
            $statement->bindValue(':typ', $this->data->typ);
        }

        $statement->execute();
        $row = $statement->fetch();
        $data['count'] = $row['anzahl'];



        $query = "SELECT todo.todo_id,todo.todo_kunde_id,data.vorname, data.name , data.firma, data.strasse, data.plz, data.ort,todo.todo_angelegt,
                    todo.todo_text,todo.todo_ueberschrift,mit.mit_name,todo.todo_status_id,sta.todo_status_name, 
                    mit2.mit_name as bearbeiter, todo_typ_name, handynr, todo_ziel_mitarbeiter_id ".$query;

        $query .= " ORDER BY todo.todo_angelegt DESC LIMIT :start, :limit";

        $statement = $this->db->prepare($query);

        $statement->bindValue(':todo_filiale_id', $this->data->todo_filiale_id);

        if(!empty($this->data->todo_kunde_id)) {
            $statement->bindValue(':todo_kunde_id', $this->data->todo_kunde_id);
        }

        if($this->data->todo_finished !== 'true' AND !empty($this->data->todo_status_id)) {
            $statement->bindValue(':todo_status_id', $this->data->todo_status_id);
        }

        if (!empty($this->data->status AND $this->data->status !== 'allButNotDone')) {
            $statement->bindValue(':status', $this->data->status);
        }

        if (!empty($this->data->user)) {

            $statement->bindValue(':user1', $this->data->user);
            $statement->bindValue(':user2', $this->data->user);

        }

        if (!empty($this->data->typ)) {
            $statement->bindValue(':typ', $this->data->typ);
        }


        $start = ($size * $index);

        $statement->bindValue(':start', (int) $start, PDO::PARAM_INT);
        $statement->bindValue(':limit', (int) $limit, PDO::PARAM_INT);


        if ($statement->execute()) {
            $data["status"] = 'success';
            while ($row = $statement->fetch()) {

                foreach ($row as $key => $value) {
                    $tmp[$key] = $value;
                }
                $tmp['todo_angelegt'] = date('d.m.Y H:i', strtotime($tmp['todo_angelegt']));
                // Zeilenumbruch in </ BR> umwndeln
                $tmp['todo_ueberschrift']=nl2br($tmp['todo_ueberschrift']);
                $items[] = $tmp;
            }

            if (!empty($items)) {
                $data['data'] = $items;
            }
        }

        $data['size'] = $size;
        $data['index'] = $index;
        $data['limit'] = $limit;
        $data['status'] = 'success';

        return $data;
    }

    public function getTodosByCustomer()
    {

        $query = "SELECT todo.todo_id,todo.todo_kunde_id,data.vorname, data.name ,todo.todo_angelegt,
                    todo.todo_text,todo.todo_ueberschrift,mit.mit_name,todo.todo_status_id,sta.todo_status_name, mit2.mit_name as bearbeiter, todo_ziel_mitarbeiter_id
                    FROM sms_todo todo
                    LEFT JOIN sms_mitarbeiter mit ON todo.todo_mitarbeiter_id = mit.mit_id
                    LEFT JOIN sms_mitarbeiter mit2 ON todo.todo_ziel_mitarbeiter_id = mitw.mit_id
                    LEFT JOIN sms_todo_status sta ON todo.todo_status_id = sta.todo_status_id
                    LEFT JOIN smsdata data ON todo.todo_kunde_id = data.id
                    WHERE todo.todo_filiale_id = :todo_filiale_id";

        if (!empty($this->data->todo_kunde_id)) {
            $query .= " AND todo.todo_kunde_id = :todo_kunde_id ";
        }

        if ($this->data->todo_finished === 'true') {
            $query .= " AND todo.todo_status_id = 4 ";
        } if($this->data->todo_finished === 'false') {
            $query .= " AND todo.todo_status_id != 4 ";
        } else if (!empty($this->data->todo_status_id)) {
            $query .= " AND todo.todo_status_id = :todo_status_id ";
        }

        $query .= " ORDER BY todo.todo_angelegt desc";

        $statement = $this->db->prepare($query);

        $data['data'] = array();

        $statement->bindValue(':todo_filiale_id', $this->data->todo_filiale_id);

        if(!empty($this->data->todo_kunde_id)) {
            $statement->bindValue(':todo_kunde_id', $this->data->todo_kunde_id);
        }

        if($this->data->todo_finished !== 'true' AND !empty($this->data->todo_status_id)) {
            $statement->bindValue(':todo_status_id', $this->data->todo_status_id);
        }

        if ($statement->execute()) {
            $data["status"] = 'success';
            while ($row = $statement->fetch()) {

                foreach ($row as $key => $value) {
                    $tmp[$key] = $value;
                }
                $tmp['todo_angelegt'] = date('d.m.Y H:i', strtotime($tmp['todo_angelegt']));
                // Zeilenumbruch in </ BR> umwndeln
                $tmp['todo_ueberschrift']=nl2br($tmp['todo_ueberschrift']);
                $items[] = $tmp;
            }

            if (!empty($items)) {
                $data['data'] = $items;
            }
        }



        return $data;
    }

}
