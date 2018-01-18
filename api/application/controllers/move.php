<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use TicTacToe\Exceptions\Player_win;
use TicTacToe\Exceptions\Game_already_finished;
use TicTacToe\Exceptions\Draw;

use TicTacToe\Exceptions\HTTP\Base_http_exception;

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
        if ($move_form->run()) {
            $action = $this->input->post('action');

            $token_payload = $this->jwtoken->getRequestPayload();
            $game_id = $token_payload['game_id'];

            try {
                $move_id = $this->move_model->create($game_id, $action);

                $this->response = $this->move_model->get($move_id);

            } catch(Game_already_finished $e) {
                $this->response = [
                    'finished' => true,
                    'player_id' => $e->getMessage(),
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
            }
            catch(Draw $e) {
                $move_id = $e->getMessage();
                $move = $this->move_model->get($move_id);
                $move['player_id_won'] = null;
                $move['draw'] = true;
                $this->response = $move;
            }
        } else {
            $this->errors = $move_form->error_array();
        }

        $this->send_response();
	}
}
