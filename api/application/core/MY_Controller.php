<?php

use TicTacToe\Exceptions\HTTP\Method_not_allowed;
use TicTacToe\Exceptions\HTTP\Base_http_exception;

class MY_Controller extends CI_Controller {

    const VERIFY_JWT = false;

    protected $errors;

    protected $http_code = 200;

    const HEADER_ACCESS_CONTROL_ALLOW_ORIGIN = 'Access-Control-Allow-Origin';
    const HEADER_ACCESS_CONTROL_ALLOW_METHODS = 'Access-Control-Allow-Methods';
    const HEADER_ACCESS_CONTROL_ALLOW_HEADERS = 'Access-Control-Allow-Headers';
    const HEADER_ACCESS_CONTROL_ALLOW_CREDENTIALS = 'Access-Control-Allow-Credentials';
    const HEADER_ACCESS_CONTROL_MAX_AGE = 'Access-Control-Max-Age';

    const ACCESS_CONTROL_MAX_AGE = 300; // seconds

    protected $headers = [
        self::HEADER_ACCESS_CONTROL_MAX_AGE => self::ACCESS_CONTROL_MAX_AGE,
        self::HEADER_ACCESS_CONTROL_ALLOW_ORIGIN => '*',
        self::HEADER_ACCESS_CONTROL_ALLOW_METHODS => [],
        self::HEADER_ACCESS_CONTROL_ALLOW_HEADERS => ['Content-Type', 'Authorization'],
        //self::HEADER_ACCESS_CONTROL_ALLOW_CREDENTIALS => 'true',
    ];

    protected $response;

    protected $available_methods = [];

    protected $processed = false;

    public function __construct() {
        parent::__construct();

        $this->load->library('jwtoken');
        if ($this->input->method(true) == 'OPTIONS') {
            $this->send_response();
            return;
        }

        try {
            if (!in_array($this->input->method(true), $this->available_methods)) {
                $available_methods_list = empty($this->available_methods) ?
                    'Endpoint is not available' :
                    'Available methods: ' . implode(', ',  $this->available_methods);

                throw new Method_not_allowed($available_methods_list);
            }

            if (static::VERIFY_JWT) {
                $this->jwtoken->verifyToken();
            }

            $this->load->database();

        } catch(Base_http_exception $e) {
            $this->http_code = $e->get_http_code();
            $this->errors[] = $e->getMessage();
            $this->send_response();
        }
    }

    private function handle_cors() {
        $this->headers[self::HEADER_ACCESS_CONTROL_ALLOW_METHODS] = $this->available_methods;
        foreach ($this->headers as $name => $value) {
            $header = is_array($value) ?
                implode(',', $value) :
                $value;

            $header_value = $name . ': ' . $header;
            $this->output->set_header($header_value);
        }
    }

    private function addBearerToken(&$response) {
        $bearerToken = $this->jwtoken->getToken();
        if (empty($bearerToken)) {
            return;
        }

        $response['bearer_token'] = $bearerToken;
    }

    protected function send_response() {
        http_response_code($this->http_code);

        $this->handle_cors();

        if ($this->input->method(true) == 'OPTIONS') {
            $this->processed = true;
            return;
        }

        $this->output->set_content_type('application/json');

        $response = $this->response;
        if (!empty($this->errors)) {
            $response = [
                'errors' => $this->errors,
            ];
        }

        $this->addBearerToken($response);
        $this->output->set_output(json_encode($response));
        $this->processed = true;
    }

	public function index()
	{
        $this->http_code = 404;
	    $this->errors[] = 'Resource not found';
	    $this->send_response();
	}
}
