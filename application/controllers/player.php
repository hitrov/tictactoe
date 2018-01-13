<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Player extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->database();

        $this->load->library('form_validation');
        $this->load->library('player_form');

        $this->load->model('player_model');
    }

	public function create_players()
	{
	    if ($this->input->post()) {
            $player_form = new Player_form();
            if ($player_form->run()) {
                $player_1_id = $this->player_model->create($this->input->post('player_1'));
                $player_2_id = $this->player_model->create($this->input->post('player_2'));

                $output = json_encode([
                    'player_1' => $player_1_id,
                    'player_2' => $player_2_id,
                ]);

                $this->output->set_content_type('application/json');
                $this->output->set_output($output);
            } else {
                $output = json_encode($player_form->error_array());
                $this->output->set_content_type('application/json');
                $this->output->set_output($output);
            }
        }
	}
}
