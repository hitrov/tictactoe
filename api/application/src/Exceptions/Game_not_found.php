<?php
/**
 * Created by PhpStorm.
 * User: aleksander.hitrov
 * Date: 14/01/2018
 * Time: 01:04
 */

namespace TicTacToe\Exceptions;


use TicTacToe\Exceptions\HTTP\Not_found;

class Game_not_found extends Not_found {
    public $message = 'Game with such id not found';
}
