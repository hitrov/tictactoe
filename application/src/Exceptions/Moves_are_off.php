<?php
/**
 * Created by PhpStorm.
 * User: aleksander.hitrov
 * Date: 14/01/2018
 * Time: 01:04
 */

namespace TicTacToe\Exceptions;


use TicTacToe\Exceptions\HTTP\Bad_request;

class Moves_are_off extends Bad_request {
    public $message = 'All moves in that game have been done';
}
