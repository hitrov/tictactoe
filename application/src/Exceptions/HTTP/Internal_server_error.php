<?php
/**
 * Created by PhpStorm.
 * User: aleksander.hitrov
 * Date: 13/01/2018
 * Time: 22:21
 */

namespace TicTacToe\Exceptions\HTTP;

class Internal_server_error extends Base_http_exception {
    public function get_http_code() {
        return self::HTTP_CODE;
    }
}
