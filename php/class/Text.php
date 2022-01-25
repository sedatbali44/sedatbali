<?php


namespace Mocca;

use Slim\Http\Request;
use Slim\Http\Response;
use Interop\Container\ContainerInterface;

class Text
{
     public function __construct()
    {
        global $app;
        $this->container = $app->getContainer();
        $this->db = $this->container['db'];
        $this->token = $this->container['token']->decoded;
    }

    public function template($title,$parameter) {

         $parameter = (array) $parameter;

        /*$statement = $this->db->prepare("SELECT * FROM botschaften WHERE bot_titel = :title AND (bot_frei = 0 OR bot_frei = :filiale)");
        $statement->execute(array('title' => $title,'filiale' => $this->token['filiale']));
        $row = $statement->fetch();
        $subject = $row['bot_text1'];
        $text =  empty($row['bot_text2']) ? $row['bot_text1'] : $row['bot_text2'];*/

        $statement = $this->db->prepare("SELECT * FROM botschaften WHERE bot_titel = :title AND (bot_frei = :filiale)");
        $statement->execute(array('title' => $title,'filiale' => $this->token['filiale']));
        $row = $statement->fetch();
        $subject = $row['bot_text1'];
        $text =  empty($row['bot_text2']) ? $row['bot_text1'] : $row['bot_text2'];

        if(empty($text)) {
            $statement = $this->db->prepare("SELECT * FROM botschaften WHERE bot_titel = :title AND (bot_frei = 0)");
            $statement->execute(array('title' => $title));
            $row = $statement->fetch();
            $subject = $row['bot_text1'];
            $text =  empty($row['bot_text2']) ? $row['bot_text1'] : $row['bot_text2'];
        }

        if(isset($parameter['customerId']) && $parameter['customerId'] > 0){
            $customer = new Customer();
            $customerData=$customer->get($parameter['customerId']);
            $parameter['anrede'] = $parameter['anrede']  ?? $customerData->anrede;
            $parameter['vorname'] = $parameter['vorname'] ?? $customerData->vorname;
            $parameter['name'] = $parameter['name'] ?? $customerData->name;
            $parameter['nachname'] = $parameter['nachname'] ?? $customerData->name;
        }

        if($parameter['anrede'] == 'Frau'){
            $parameter['sehr geehrter'] = 'Sehr geehrte';
            $parameter['Sehr geehrter'] = 'Sehr geehrte';
            $parameter['Sehr geehrte'] = 'Sehr geehrte';
            $parameter['sehr geehrte'] = 'Sehr geehrte';
            $parameter['Lieber'] = 'Liebe';
            $parameter['Liebe'] = 'Liebe';
            $parameter['lieber'] = 'Liebe';
            $parameter['liebe'] = 'Liebe';
        } else {
            $parameter['sehr geehrter'] = 'Sehr geehrter';
            $parameter['Sehr geehrter'] = 'Sehr geehrter';
            $parameter['Sehr geehrte'] = 'Sehr geehrter';
            $parameter['sehr geehrte'] = 'Sehr geehrter';
            $parameter['Lieber'] = 'Lieber';
            $parameter['Liebe'] = 'Lieber';
            $parameter['lieber'] = 'Lieber';
            $parameter['liebe'] = 'Lieber';
            $parameter['liebe'] = 'Lieber';
        }

        foreach ($parameter as $key => $val){
            $text=str_replace("[".$key."]",$val,$text);
        }

        $data = array();
        $data['text'] = $text;
        $data['subject'] = $subject;

        return $data;

    }

    public function getText($title){


        $statement = $this->db->prepare("SELECT * FROM botschaften WHERE bot_titel = :title AND (bot_frei = :filiale)");
        $statement->execute(array('title' => $title,'filiale' => $this->token['filiale']));
        $row = $statement->fetch();
        $subject = $row['bot_text1'];
        $text =  empty($row['bot_text2']) ? $row['bot_text1'] : $row['bot_text2'];

        if(empty($text)) {
            $statement = $this->db->prepare("SELECT * FROM botschaften WHERE bot_titel = :title AND (bot_frei = 0)");
            $statement->execute(array('title' => $title));
            $row = $statement->fetch();
            $subject = $row['bot_text1'];
            $text =  empty($row['bot_text2']) ? $row['bot_text1'] : $row['bot_text2'];
        }


        $data = array();
        $data['text'] = $text;
        $data['subject'] = $subject;

        return $data;

    }

    public function getTemplateByTyp($typ){

        $data = array();


        $statement = $this->db->prepare("SELECT * FROM botschaften WHERE bot_kat = :kat AND (bot_frei = :filiale)");
        $statement->execute(array('kat' => $typ,'filiale' => $this->token['filiale']));
        while($row = $statement->fetch()){
            $data['items'][] = $row;
        }

        return $data;

    }


}
