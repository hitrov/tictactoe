<?php
/**
 * Created by PhpStorm.
 * User: aleksander.hitrov
 * Date: 13/01/2018
 * Time: 20:21
 */

class Move_form extends MY_Form_validation {

    public function __construct() {
        parent::__construct($this->rules);
    }

    protected $rules = [
        [
            'field' => 'action',
            'label' => '',
            'rules' => 'required|in_list[1,2,3,4,5,6,7,8,9]',
        ],
    ];
}
