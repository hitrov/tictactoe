<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Game extends MY_Controller {

    const VERIFY_JWT = true;

    const HISTORY_LIMIT = 50;

    protected $available_methods = ['GET', 'POST'];

    public function __construct() {
        parent::__construct();

        $this->load->library('jwtoken');
        $this->load->model('game_model');
    }

	public function index() {
        if ($this->processed) {
            return;
        }

        $token_payload = $this->jwtoken->getRequestPayload();

        $player_1_id = $token_payload['player_1'];
        $player_2_id = $token_payload['player_2'];

        $game_id = $this->game_model->create($player_1_id, $player_2_id);

        $this->jwtoken->setPayload([
            'game_id' => $game_id,
        ]);

        $this->response = $this->game_model->get($game_id);

        $this->send_response();
	}

    public function history() {
        if ($this->processed) {
            return;
        }

        $token_payload = $this->jwtoken->getRequestPayload();

        $player_1_id = $token_payload['player_1'];
        $player_2_id = $token_payload['player_2'];

        $this->response = $this->game_model->history($player_1_id, $player_2_id);
        $this->send_response();
    }
}
