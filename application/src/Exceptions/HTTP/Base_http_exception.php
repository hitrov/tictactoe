<?php
/**
 * Created by PhpStorm.
 * User: aleksander.hitrov
 * Date: 13/01/2018
 * Time: 22:21
 */

namespace TicTacToe\Exceptions\HTTP;

abstract class Base_http_exception extends \Exception {
    const HTTP_CODE = 500;

    abstract public function get_http_code();
}
