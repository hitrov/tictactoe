<?php
/**
 * Created by PhpStorm.
 * User: aleksander.hitrov
 * Date: 14/01/2018
 * Time: 01:04
 */

namespace TicTacToe\Exceptions;


use TicTacToe\Exceptions\HTTP\Bad_request;

class Action_already_exists extends Bad_request {
    public $message = 'Such action already have been done in that game';
}
