<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Move extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->database();

        $this->load->library('form_validation');
        $this->load->library('move_form');

        $this->load->model('move_model');
    }

	public function create()
	{
	    if ($this->input->post()) {
            $move_form = new Move_form();
            if ($move_form->run()) {
                $game_id = $this->input->post('game_id');
                $player_id = $this->input->post('player_id');
                $action = $this->input->post('action');

                $move_id = $this->move_model->create($game_id, $player_id, $action);

                $output = json_encode([
                    'move_id' => $move_id,
                ]);

                $this->output->set_content_type('application/json');
                $this->output->set_output($output);
            } else {
                $output = json_encode($move_form->error_array());
                $this->output->set_content_type('application/json');
                $this->output->set_output($output);
            }
        }
	}
}
