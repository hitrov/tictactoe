<?php

use TicTacToe\Exceptions\HTTP\Method_not_allowed;
use TicTacToe\Exceptions\HTTP\Base_http_exception;
use TicTacToe\Exceptions\HTTP\Not_found;

class MY_Controller extends CI_Controller {

    protected $errors;

    protected $http_code = 200;

    protected $response;

    protected $available_methods = [];

    protected $processed = false;

    public function __construct() {
        parent::__construct();

        try {
            if (!in_array($this->input->method(true), $this->available_methods)) {
                $available_methods_list = empty($this->available_methods) ?
                    'Endpoint is not available' :
                    'Available methods: ' . implode(', ',  $this->available_methods);

                throw new Method_not_allowed($available_methods_list);
            }

            $this->load->database();

        } catch(Base_http_exception $e) {
            $this->http_code = $e->get_http_code();
            $this->errors[] = $e->getMessage();
            $this->send_response();
        }
    }

    protected function send_response() {
        http_response_code($this->http_code);
        $this->output->set_content_type('application/json');

        $response = $this->response;
        if (!empty($this->errors)) {
            $response = [
                'errors' => $this->errors,
            ];
        }

        $this->output->set_output(json_encode($response));
        $this->processed = true;
    }

	public function index()
	{
        $this->http_code = Not_found::HTTP_CODE;
	    $this->errors[] = 'Resource not found';
	    $this->send_response();
	}
}
