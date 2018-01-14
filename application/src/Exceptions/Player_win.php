<?php
/**
 * Created by PhpStorm.
 * User: aleksander.hitrov
 * Date: 14/01/2018
 * Time: 01:04
 */

namespace TicTacToe\Exceptions;


class Player_win extends \Exception {
    public $message = 'Won move has been done';
}
