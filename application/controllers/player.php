<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Player extends MY_Controller {

    protected $available_methods = ['POST'];

    public function __construct() {
        parent::__construct();

        $this->load->library('player_form');
        $this->load->model('player_model');
    }

	public function create_players()
	{
        if ($this->processed) {
            return;
        }

        $player_form = new Player_form();
        if ($player_form->run()) {
            $player_1_id = $this->player_model->create($this->input->post('player_1'));
            $player_2_id = $this->player_model->create($this->input->post('player_2'));

            $this->response = [
                'player_1' => $player_1_id,
                'player_2' => $player_2_id,
            ];
        } else {
            $this->errors = $player_form->error_array();
        }

        $this->send_response();
	}
}
