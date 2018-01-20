<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Form_validation extends CI_Form_validation {

    public function get_first_error(): string {
        $message = '';
        $first_error = $this->error_array();

        if (empty($first_error)) {

            return $message;
        }

        $message = reset($first_error);

        return $message;
    }
}
