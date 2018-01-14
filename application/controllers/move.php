<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use TicTacToe\Exceptions\Moves_are_off;
use TicTacToe\Exceptions\Game_not_found;
use TicTacToe\Exceptions\Action_already_exists;
use TicTacToe\Exceptions\Player_win;
use TicTacToe\Exceptions\Game_already_finished;

use TicTacToe\Exceptions\HTTP\Internal_server_error;

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
            $action = $this->input->post('action');

            try {
                $move_id = $this->move_model->create($game_id, $action);

                $this->response = [
                    'move_id' => $move_id,
                ];

            } catch(Moves_are_off $e) {
                $this->http_code = 400;
                $this->errors[] = $e->getMessage();

            } catch(Game_not_found $e) {
                $this->http_code = 404;
                $this->errors[] = $e->getMessage();

            } catch(Action_already_exists $e) {
                $this->http_code = 400;
                $this->errors[] = $e->getMessage();

            } catch(Internal_server_error $e) {
                $this->errors[] = 'Move won but unknown server error occurred';

            } catch(Game_already_finished $e) {
                $this->response = [
                    'finished' => true,
                    'player_id' => $e->getMessage(),
                ];
            } catch(Player_win $e) {
                $this->response = [
                    'won' => true,
                    'move_id' => $e->getMessage(),
                ];
            }
        } else {
            $this->errors = $move_form->error_array();
        }

        $this->send_response();
	}
}
