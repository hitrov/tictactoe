<?php
/**
 * Created by PhpStorm.
 * User: aleksander.hitrov
 * Date: 13/01/2018
 * Time: 22:21
 */

namespace TicTacToe\Exceptions\HTTP;

class Base_http_exception extends \Exception {
    protected $http_code = 500;

    public function get_http_code() {
        return $this->http_code;
    }
}
