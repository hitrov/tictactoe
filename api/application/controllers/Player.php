<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use TicTacToe\Exceptions\HTTP\Bad_request;
use TicTacToe\Exceptions\HTTP\Base_http_exception;

class Player extends MY_Controller {

    protected $available_methods = ['POST'];

    public function __construct() {
        parent::__construct();

        $this->load->library('jwtoken');
        $this->load->library('player_form');
        $this->load->model('player_model');
    }

	public function create_players()
	{
        if ($this->processed) {
            return;
        }

        $player_form = new Player_form();

        try {
            if (!$player_form->run()) {
                throw new Bad_request($player_form->get_first_error());
            }

            $player_1_id = $this->player_model->create($this->input->post('player_1'));
            $player_2_id = $this->player_model->create($this->input->post('player_2'));

            $this->jwtoken->setPayload([
                'player_1' => $player_1_id,
                'player_2' => $player_2_id,
            ]);

            $this->response = [
                'player_1' => $player_1_id,
                'player_2' => $player_2_id,
            ];

        } catch(Base_http_exception $e) {
            $this->http_code = $e->get_http_code();
            $this->errors[] = $e->getMessage();
        }

        $this->send_response();
	}
}
