<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Move extends MY_Controller {

    protected $available_methods = ['POST'];

    public function __construct() {
        parent::__construct();

        $this->load->library('move_form');
        $this->load->model('move_model');
    }

	public function index()
	{
        if ($this->processed) {
            return;
        }

        $move_form = new Move_form();
        if ($move_form->run()) {
            $game_id = $this->input->post('game_id');
            $player_id = $this->input->post('player_id');
            $action = $this->input->post('action');

            $move_id = $this->move_model->create($game_id, $player_id, $action);

            $this->response = [
                'move_id' => $move_id,
            ];
        } else {
            $this->errors = $move_form->error_array();
        }

        $this->send_response();
	}
}
