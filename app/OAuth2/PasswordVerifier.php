<?php
/**
 * Created by PhpStorm.
 * User: joeramone
 * Date: 02/10/2016
 * Time: 11:06
 */

namespace CodeDelivery\OAuth2;


use Illuminate\Support\Facades\Auth;

class PasswordVerifier
{

    public function verify($username, $password)
    {
       
        $credentials = [
            'email'    => $username,
            'password' => $password,
        ];

        if (Auth::once($credentials)) {
            return Auth::user()->id;
        }

        return false;
    }
}