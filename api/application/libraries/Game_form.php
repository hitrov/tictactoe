<?php
/**
 * Created by PhpStorm.
 * User: aleksander.hitrov
 * Date: 13/01/2018
 * Time: 20:21
 */

class Game_form extends CI_Form_validation {

    private $rules = [
        [
            'field' => 'player_1',
            'label' => '',
            'rules' => 'required|integer|greater_than_equal_to[1]',
        ],
        [
            'field' => 'player_2',
            'label' => '',
            'rules' => 'required|integer|greater_than_equal_to[1]',
        ]
    ];

    public function __construct() {
        parent::__construct($this->rules);
    }
}
