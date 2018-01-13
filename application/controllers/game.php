<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Game extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->database();

        $this->load->library('form_validation');
        $this->load->library('game_form');

        $this->load->model('game_model');
    }

	public function create()
	{
	    if ($this->input->post()) {
            $game_form = new Game_form();
            if ($game_form->run()) {
                $player_1_id = $this->input->post('player_1');
                $player_2_id = $this->input->post('player_2');

                $game_id = $this->game_model->create($player_1_id, $player_2_id);

                $output = json_encode([
                    'game_id' => $game_id,
                ]);

                $this->output->set_content_type('application/json');
                $this->output->set_output($output);
            } else {
                $output = json_encode($game_form->error_array());
                $this->output->set_content_type('application/json');
                $this->output->set_output($output);
            }
        }
	}
}
