<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use TicTacToe\Exceptions\HTTP\Unauthorized;
use TicTacToe\Exceptions\HTTP\Base_http_exception;

class Telegram extends MY_Controller {

    protected $available_methods = ['POST'];

    public function __construct() {
        parent::__construct();

        $this->load->library('telegram_bot');
        $this->load->model('game_model');
    }

	public function index()
	{
        if ($this->processed) {
            return;
        }

        $token = $this->input->get('token');
        try {
            if (empty($token) || $token !== Telegram_bot::TOKEN) {
                throw new Unauthorized('Unauthorized');
            }

            $input = file_get_contents('php://input');
            $object = json_decode($input, true);

            if ($object && array_key_exists('message', $object)) {

                $chatId = $object['message']['chat']['id'];
                $request = $object['message']['text'];
                $username = $object['message']['from']['username'];

                //if (!in_array($username, $eligibleUsernames)) {
                //    sendMessage($apiKey, $chatId, 'Unauthorized.');
                //    exit;
                //}

                $message = $this->telegram_bot->getMessage(Game_model::ALL_ACTIONS, [1,2,3]);

                //$matches = array();
                if ($request === '/start') {
                    $this->telegram_bot->sendMessage($chatId, $message, null, 'HTML');
                    exit;
                }
            }

        } catch(Base_http_exception $e) {
            $this->http_code = $e->get_http_code();
            $this->errors[] = $e->getMessage();
        }

        $this->send_response();
	}
}
