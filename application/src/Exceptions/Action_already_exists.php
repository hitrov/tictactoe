<?php
/**
 * Created by PhpStorm.
 * User: aleksander.hitrov
 * Date: 14/01/2018
 * Time: 01:04
 */

namespace TicTacToe\Exceptions;


class Action_already_exists extends \Exception {
    public $message = 'Such action already have been done in that game';
}
