<?php


namespace Mocca;

use \PDO;

class Termine
{
    public function __construct($db = 0)
    {
        global $app;
        $this->container = $app->getContainer();
        $this->db = $this->container['db'];
        $this->token = $this->container['token']->decoded;
    }

    public function setValue($name,$value){
        if(is_null($value)){
            $value = '';
        }
        $this->data->$name = $value;
    }

    public function getTypes(){

        $query = "SELECT * FROM sms_termin_typ";
        $statement = $this->db->prepare($query);
        $statement->execute();
        $data = array();
        $data['data'] = array();
        $data['status'] = 'success';
        while ($row = $statement->fetch()) {

            $data['data'][] = $row;
        }

        if (!empty($items)) {
            $data['data'] = $items;
        }

        return $data;

    }

    public function getByID($id){

        $query = "SELECT termine_id, termine_datum, termin_datum_bis, mit_name, mit_id, termine_kunde, name, termine_text, termin_typ_name, termine_typ, termine_ort, termine_mitarbeiter, termin_art, handynr, telefon, email, termine_filiale, vorname, strasse, plz, ort, kundennr FROM sms_termine 
		 LEFT JOIN smsdata ON id=termine_kunde 
		 LEFT JOIN sms_mitarbeiter ON mit_id=termine_mitarbeiter
		 LEFT JOIN sms_termin_typ ON termin_art=termin_typ_id
        WHERE termine_id = :id";
        $statement = $this->db->prepare($query);
        $statement->execute(array("id" => $id));
        $row = $statement->fetch();


        $this->data = (object)$row;
        $this->data->users = $this->getUsers();
        $this->olddata = $this->data;

        return (array)$this->data;

    }

    public function delete(){


        if(!isset($this->data->termine_id) OR $this->data->termine_id == 0){
            die("keine ID vorhanden");
        }

        $query = "DELETE FROM sms_termine WHERE termine_id = :termine_id";
        $statement = $this->db->prepare($query);
        $statement->execute(array(
            "termine_id" => $this->data->termine_id,
        ));

        $log = new Mitlog;
        $aktion = "Termin gelöscht: ".$this->todo->termine_text;
        $log->setAktion($aktion);
        $log->save();

        return true;

    }

    public function saveNew(){

        $query = "INSERT INTO sms_termine SET 
                    termine_datum = :termine_datum,
                    termin_datum_bis = :termin_datum_bis,
                    termine_text = :termine_text,
                    termine_kunde = :termine_kunde,
                    termine_filiale = :termine_filiale,
                    termine_mitarbeiter = :termine_mitarbeiter,
                    termine_typ = :termine_typ,
                    termine_ort = :termine_ort,
                    termin_art = :termin_art";

        $statement = $this->db->prepare($query);
        $statement->execute(array(
            "termine_datum" => $this->data->termine_datum,
            "termin_datum_bis" => $this->data->termin_datum_bis,
            "termine_text" => $this->data->termine_text,
            "termine_kunde" => $this->data->termine_kunde,
            "termine_filiale" => $this->token['filiale'],
            "termine_mitarbeiter" => $this->data->termine_mitarbeiter,
            "termine_typ" => $this->data->termine_typ,
            "termine_ort" => $this->data->termine_ort,
            "termin_art" => $this->data->termin_art
        ));

        $this->data->termine_id = $this->db->lastInsertId();
        $this->updateUsers();

        return true;


    }

    public function save(){

        if(!isset($this->data->termine_id) OR $this->data->termine_id == 0){
            die("keine ID vorhanden");
        }

        $query = "UPDATE sms_termine SET 
                    termine_datum = :termine_datum,
                    termin_datum_bis = :termin_datum_bis,
                    termine_text = :termine_text,
                    termine_kunde = :termine_kunde,
                    termine_filiale = :termine_filiale,
                    termine_mitarbeiter = :termine_mitarbeiter,
                    termine_typ = :termine_typ,
                    termine_ort = :termine_ort,
                    termin_art = :termin_art
                    WHERE termine_id = :termine_id";

        $statement = $this->db->prepare($query);
        $statement->execute(array(
            "termine_datum" => $this->data->termine_datum,
            "termin_datum_bis" => $this->data->termin_datum_bis,
            "termine_text" => $this->data->termine_text,
            "termine_kunde" => $this->data->termine_kunde,
            "termine_filiale" => $this->token['filiale'],
            "termine_mitarbeiter" => $this->data->termine_mitarbeiter,
            "termine_typ" => $this->data->termine_typ,
            "termine_ort" => $this->data->termine_ort,
            "termin_art" => $this->data->termin_art,
            "termine_id" => $this->data->termine_id
        ));

        $this->updateUsers();

        return true;


    }

    public function updateUsers(){

        $this->data->users;
        $oldusers = $this->getUsers();

        if(!isset($this->data->users)){
            return false;
        }

        $users = array();
        foreach ($oldusers as $key => $val){
            $users[$val['mit_id']]['old'] = 1;
        }
        foreach ($this->data->users as $key => $val){
            $users[$val->mit_id]['update'] = 1;
        }

        foreach ($users as $key => $val){
            if($val['old'] == 1 & $val['update'] == 0){
                //entfernen
                $this->deleteUser($key);
            }
            if($val['old'] == 0 & $val['update'] == 1){
                //entfernen
                $this->addUser($key);
            }
        }

    }

    public function getUsers(){
        $query = "SELECT mit_id, mit_name FROM sms_relation LEFT JOIN sms_mitarbeiter ON relation_fk = mit_id WHERE relation_typ = 'terminuser' AND relation_pk = :id";
        $statement = $this->db->prepare($query);
        $statement->execute(array(":id" => $this->data->termine_id));
        $data = array();

        while ($row = $statement->fetch()) {
            $data[] = $row;
        }

        return $data;
    }

    public function addUser($user){
        if(!isset($this->data->termine_id) OR $this->data->termine_id == 0){
            die("keine Termin ID vorhanden");
        }
        if(!isset($user) OR $user == 0){
            die("keine User ID vorhanden");
        }

        $relation = new Relation();
        $relation->add("terminuser",$this->data->termine_id,$user);


    }

    public function deleteUser($user){

        if(!isset($this->data->termine_id) OR $this->data->termine_id == 0){
            die("keine Termin ID vorhanden");
        }
        if(!isset($user) OR $user == 0){
            die("keine User ID vorhanden");
        }

        $relation = new Relation();
        $relation->delete("terminuser",$this->data->termine_id,$user);


    }

    public function getTermine()
    {

        $start=$this->data->start;
        $limit=$this->data->limit;
        $index=$this->data->index;
        $size=$this->data->size;
        $filiale = $this->token['filiale'];


        if($this->data->showallopen && $this->data->showallopen == 1){
            $this->data->startDate = 0;
            $this->data->endDate = 0;
        }

        if($this->data->onlyfuture && $this->data->onlyfuture == 1){
            $this->data->startDate = 0;
            $this->data->endDate = 0;
        }


        $query = " FROM sms_termine 
		 LEFT JOIN smsdata ON id=termine_kunde 
		 LEFT JOIN sms_mitarbeiter ON mit_id=termine_mitarbeiter
		 LEFT JOIN sms_termin_typ ON termin_art=termin_typ_id
        WHERE termine_filiale = :termine_filiale";


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
            $query .= " AND termine_kunde = :termine_kunde ";
        }

        if (isset($this->data->startDate) && strlen($this->data->startDate) > 2 && isset($this->data->endDate) && strlen($this->data->startDate) > 2) {
            $query .= " AND termine_datum BETWEEN :startDate AND :endDate ";
        }

        if (!empty($this->data->user)) {
            $query .= " AND termine_mitarbeiter = :termine_mitarbeiter ";

        }

        if (!empty($this->data->typ)) {
            $query .= " AND termin_art = :typ ";
        }

        if (!empty($this->data->status)) {
            $query .= " AND termine_typ = :status ";
        }

        if($this->data->todo_finished === 'false') {
        $query .= " AND todo.todo_status_id != 4 ";
        } else if (!empty($this->data->todo_status_id)) {
            $query .= " AND todo.todo_status_id = :todo_status_id ";
        }

        if (!empty($this->data->onlyfuture) && $this->data->onlyfuture == 1) {
            $query .= " AND termine_datum >= NOW() ";
        }

        if (!empty($this->data->showallopen) && $this->data->showallopen == 1) {
            $query .= " AND ( termine_datum >= DATE_ADD(NOW(),interval -1 DAY) OR termine_typ='Offen') ";
        }


        $query2 = "SELECT count(*) as anzahl ".$query."";

        $statement = $this->db->prepare($query2);

        $data['data'] = array();

        $statement->bindValue(':termine_filiale', $filiale);

        if(!empty($this->data->todo_kunde_id)) {
            $statement->bindValue(':todo_kunde_id', $this->data->todo_kunde_id);
        }

        if (isset($this->data->startDate) && strlen($this->data->startDate) > 2 && isset($this->data->endDate) && strlen($this->data->startDate) > 2) {
            $statement->bindValue(':startDate', $this->data->startDate);
            $statement->bindValue(':endDate', $this->data->endDate);
        }

        if($this->data->todo_finished !== 'true' AND !empty($this->data->todo_status_id)) {
            $statement->bindValue(':todo_status_id', $this->data->todo_status_id);
        }

        if (!empty($this->data->status)) {

            $statement->bindValue(':status', $this->data->status);
        }

        if (!empty($this->data->user)) {

            $statement->bindValue(':termine_mitarbeiter', $this->data->user);

        }

        if (!empty($this->data->typ)) {
            $statement->bindValue(':typ', $this->data->typ);
        }

        if (!empty($this->data->status)) {
            $statement->bindValue(':status', $this->data->status);
        }

        $statement->execute();
        $row = $statement->fetch();
        $data['count'] = $row['anzahl'];


/*
        $query = "SELECT todo.todo_id,todo.todo_kunde_id,data.vorname, data.name ,todo.todo_angelegt,
                    todo.todo_text,todo.todo_ueberschrift,mit.mit_name,todo.todo_status_id,sta.todo_status_name, 
                    mit2.mit_name as bearbeiter, todo_typ_name, handynr, todo_ziel_mitarbeiter_id ".$query;
*/
        $query = "SELECT termine_id, termine_datum, mit_name, termine_kunde, anrede, name, vorname, firma, strasse, plz, ort,termine_text, termin_typ_name, termine_typ, handynr, telefon ".$query;

        $query .= " ORDER BY termine_datum ASC LIMIT :start, :limit";

        $statement = $this->db->prepare($query);

        $statement->bindValue(':termine_filiale', $filiale);

        if(!empty($this->data->todo_kunde_id)) {
            $statement->bindValue(':todo_kunde_id', $this->data->todo_kunde_id);
        }

        if($this->data->todo_finished !== 'true' AND !empty($this->data->todo_status_id)) {
            $statement->bindValue(':todo_status_id', $this->data->todo_status_id);
        }

        if (!empty($this->data->status)) {

            $statement->bindValue(':status', $this->data->status);
        }

        if (!empty($this->data->user)) {

            $statement->bindValue(':termine_mitarbeiter', $this->data->user);

        }

        if (isset($this->data->startDate) && strlen($this->data->startDate) > 2 && isset($this->data->endDate) && strlen($this->data->startDate) > 2) {
            $statement->bindValue(':startDate', $this->data->startDate);
            $statement->bindValue(':endDate', $this->data->endDate);
        }

        if (!empty($this->data->typ)) {
            $statement->bindValue(':typ', $this->data->typ);
        }

        if (!empty($this->data->status)) {
            $statement->bindValue(':status', $this->data->status);
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
                //$tmp['todo_angelegt'] = date('d.m.Y H:i', strtotime($tmp['todo_angelegt']));
                //$tmp['todo_ueberschrift']=nl2br($tmp['todo_ueberschrift']);
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


    public function renderPDF(){

        $pdf = new PDFLetter();
        $pdf->renderTermin($this->data);

        return $pdf->toInline();


    }



}
