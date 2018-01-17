<?php
/**
 * Created by PhpStorm.
 * User: aleksander.hitrov
 * Date: 13/01/2018
 * Time: 22:21
 */

namespace TicTacToe\Exceptions\HTTP;

class Unauthorized extends Base_http_exception {
    protected $http_code = 401;
}
