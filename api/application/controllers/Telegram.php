<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use TicTacToe\Exceptions\HTTP\Unauthorized;
use TicTacToe\Exceptions\HTTP\Base_http_exception;
use TicTacToe\Exceptions\HTTP\Bad_request;
use TicTacToe\Exceptions\GameFinished;

class Telegram extends MY_Controller {

    protected $available_methods = ['POST'];

    /**
     * @var int
     */
    private $chat_id = 0;

    public function __construct() {
        parent::__construct();

        $this->load->library('telegram_bot');
        $this->load->library('jwtoken');

        $this->load->model('game_model');
        $this->load->model('telegram_model');
        $this->load->model('move_model');
    }

    /**
     * @param array $object
     */
    private function process_request(array $object) {
        $this->chat_id = $object['message']['chat']['id'];
        $request = $object['message']['text'];
        $telegram_id = $object['message']['from']['id'];

        $username = $object['message']['from']['username'] ?? '';
        $first_name = $object['message']['from']['first_name'] ?? 'Telegram User';

        try {
            $telegram_user = $this->telegram_model->get_by_telegram_id($telegram_id);
            if (empty($telegram_user)) {

                $telegram_user = $this->telegram_model->create($telegram_id, $username, $first_name);
            }

            if ($request === '/start') {
                $this->telegram_model->wait_for_new_game($telegram_id);
                $telegram_user = $this->telegram_model->get_by_telegram_id($telegram_id);
            }

            switch($telegram_user['waiting_for_action']) {
                case 'new_game':
                    $this->telegram_model->new_game($telegram_id, $first_name);
                    break;

                case 'move':
                    $this->telegram_model->move($telegram_id, $request);
                    break;

                default:
                    $this->telegram_bot->sendMessage($this->chat_id, 'Sorry, an error occurred.', null, 'HTML');
                    break;
            }

        } catch(GameFinished $e) {
            $this->telegram_model->wait_for_new_game($telegram_id);

            $notice = $e->getMessage();
            $this->telegram_bot->sendMessage($this->chat_id, $notice, null, 'HTML');

        } catch(Base_http_exception $e) {
            $notice = $e->getMessage();
            $this->telegram_bot->sendMessage($this->chat_id, $notice, null, 'HTML');

        }
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

            $input = $this->input->raw_input_stream;
            $object = json_decode($input, true);

            if (!$object && !array_key_exists('message', $object)) {
                throw new Bad_request('Bad request');
            }

            $this->process_request($object);

        } catch(Base_http_exception $e) {
            $message = $e->getMessage();
            $this->telegram_bot->sendMessage($this->chat_id, $message, null, 'HTML');
        }
	}
}
