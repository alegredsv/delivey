<?php
/**
 * Created by PhpStorm.
 * User: awichmann
 * Date: 01/11/2016
 * Time: 13:00
 */
namespace CodeDelivery\Models;
use Illuminate\Contracts\Support\Jsonable;



Class Geo implements Jsonable{
    public $lat;
    public $long;

    public function toJson($options = 0){

        return json_encode([
           'lat' => $this->lat,
           'long' => $this->long]);
    }
}