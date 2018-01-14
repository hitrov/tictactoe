<?php
/**
 * Created by PhpStorm.
 * User: aleksander.hitrov
 * Date: 13/01/2018
 * Time: 22:21
 */

namespace TicTacToe\Exceptions\HTTP;

class Base_http_exception extends \Exception {
    const HTTP_CODE = 500;

    public function get_http_code() {
        return self::HTTP_CODE;
    }
}
