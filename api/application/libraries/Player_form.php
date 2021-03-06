<?php
/**
 * Created by PhpStorm.
 * User: aleksander.hitrov
 * Date: 13/01/2018
 * Time: 20:21
 */

class Player_form extends MY_Form_validation {

    public function __construct() {
        parent::__construct($this->rules);
    }

    private $rules = [
        [
            'field' => 'player_1',
            'label' => '',
            'rules' => 'required|max_length[64]',
        ],
        [
            'field' => 'player_2',
            'label' => '',
            'rules' => 'required|max_length[64]',
        ]
    ];
}
