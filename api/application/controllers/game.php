<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Game extends MY_Controller {

    const HISTORY_LIMIT = 50;

    protected $available_methods = ['GET', 'POST'];

    public function __construct() {
        parent::__construct();

        $this->load->library('game_form');
        $this->load->model('game_model');
    }

	public function index() {
        if ($this->processed) {
            return;
        }

        $game_form = new Game_form();
        if ($game_form->run()) {
            $player_1_id = $this->input->post('player_1');
            $player_2_id = $this->input->post('player_2');

            $game_id = $this->game_model->create($player_1_id, $player_2_id);

            $this->response = $this->game_model->get($game_id);
        } else {
            $this->errors = $game_form->error_array();
        }

        $this->send_response();
	}

    public function history() {
        if ($this->processed) {
            return;
        }

        $this->response = $this->game_model->history();
        $this->send_response();
    }
}
