<?php
/**
 * Created by PhpStorm.
 * User: aleksander.hitrov
 * Date: 13/01/2018
 * Time: 20:18
 */

use TicTacToe\Exceptions\Moves_are_off;
use TicTacToe\Exceptions\Action_already_exists;
use TicTacToe\Exceptions\Game_not_found;
use TicTacToe\Exceptions\HTTP\Internal_server_error;
use TicTacToe\Exceptions\Player_win;

class Move_model extends MY_Model {
    public $table_name = 'move';

    const WIN_COMBINATIONS = [
        //horizontal
        [1,2,3],
        [4,5,6],
        [7,8,9],

        //vertical
        [1,4,7],
        [2,5,8],
        [3,6,9],

        //diagonal
        [1,5,9],
        [3,5,7],
    ];

    public function __construct() {
        parent::__construct();
        $this->load->model('game_model');
    }

    private function get_current_player_id(array $moves, array $game): int {
        if (empty($moves)) {
            return $game['player_1'];
        }

        $last_move_player_id = end($moves)['player_id'];
        if ($last_move_player_id == $game['player_1']) {
            return $game['player_2'];
        }

        return $game['player_1'];
    }

    private function validate(array $game, array $moves, int $action) {
        if (count($moves) == 9) {
            throw new Moves_are_off();
        }

        if (empty($moves)) {
            return;
        }

        $actions = array_column($moves, 'action');
        if (in_array($action, $actions)) {
            throw new Action_already_exists();
        }
    }

    private function check_win(int $game_id, int $player_id, int $move_id) {
        $moves = $this->db
            ->order_by('action')
            ->get_where($this->table_name, [
                'game_id' => $game_id,
                'player_id' => $player_id,
            ])
            ->result_array();

        $actions = array_column($moves, 'action');

        if (in_array($actions, self::WIN_COMBINATIONS)) {
            $result = $this->game_model->win($game_id, $player_id);
            if (!$result) {
                throw new Internal_server_error();
            }
            throw new Player_win($move_id);
        }
    }

    public function create(int $game_id, int $action): int {
        $game = $this->game_model->get($game_id);

        if (empty($game)) {
            throw new Game_not_found();
        }

        $moves = $this->db
            ->get_where($this->table_name, [
                'game_id' => $game_id,
            ])
            ->result_array();

        $this->validate($game, $moves, $action);

        $player_id = $this->get_current_player_id($moves, $game);

        $this->db->insert($this->table_name, [
            'game_id' => $game_id,
            'player_id' => $player_id,
            'action' => $action,
        ]);

        $move_id = $this->db->insert_id();

        $this->check_win($game_id, $player_id, $move_id);

        return $move_id;
    }
}
