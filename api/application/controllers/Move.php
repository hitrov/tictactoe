<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use TicTacToe\Exceptions\Player_win;
use TicTacToe\Exceptions\Game_already_finished;
use TicTacToe\Exceptions\Draw;

use TicTacToe\Exceptions\HTTP\Base_http_exception;
use TicTacToe\Exceptions\HTTP\Bad_request;

class Move extends MY_Controller {

    const VERIFY_JWT = true;

    protected $available_methods = ['POST'];

    public function __construct() {
        parent::__construct();

        $this->load->library('jwtoken');
        $this->load->library('move_form');
        $this->load->model('move_model');
        $this->load->model('game_model');
    }

	public function index()
	{
        if ($this->processed) {
            return;
        }

        $move_form = new Move_form();

        try {
            if (!$move_form->run()) {
                throw new Bad_request($move_form->get_first_error());
            }

            $action = $this->input->post('action');

            $token_payload = $this->jwtoken->getRequestPayload();
            $game_id = $token_payload['game_id'];

            if (true) {
                $move_id = $this->move_model->create_without_respond($game_id, $action);
                $response = $this->move_model->get($move_id);
            } else {
                $response = $this->move_model->create_and_respond($game_id, $action);
            }

            $this->response = $response;

        } catch(Game_already_finished $e) {
            $this->response = [
                'finished' => true,
                'player_id_won' => $e->getMessage(),
            ];

        } catch(Base_http_exception $e) {
            $this->http_code = $e->get_http_code();
            $this->errors[] = $e->getMessage();

        } catch(Player_win $e) {
            $move_id = $e->getMessage();
            $move = $this->move_model->get($move_id);
            $game = $this->game_model->get($move['game_id']);
            $move['player_id_won'] = $move['player_id'];
            $move['won_combination'] = unserialize($game['won_combination']);
            $this->response = $move;

        } catch(Draw $e) {
            $move_id = $e->getMessage();
            $move = $this->move_model->get($move_id);
            $move['player_id_won'] = null;
            $move['draw'] = true;
            $this->response = $move;
        }

        $this->send_response();
	}
}
