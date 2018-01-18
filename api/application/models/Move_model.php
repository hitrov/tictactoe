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
use TicTacToe\Exceptions\Player_win;
use TicTacToe\Exceptions\Game_already_finished;
use TicTacToe\Exceptions\Draw;

use TicTacToe\Exceptions\HTTP\Internal_server_error;

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

    /**
     * @param array $moves
     * @param int $action
     *
     * @throws Action_already_exists
     * @throws Moves_are_off
     */
    private function validate(array $moves, int $action) {
        if (empty($moves)) {
            return;
        }

        if (count($moves) == 9) {
            throw new Moves_are_off();
        }

        $actions = array_column($moves, 'action');
        if (in_array($action, $actions)) {
            throw new Action_already_exists();
        }
    }

    /**
     * @param int $game_id
     * @param int $player_id
     * @param int $move_id
     *
     * @throws Internal_server_error
     * @throws Player_win
     */
    private function check_win(int $game_id, int $player_id, int $move_id) {
        $moves = $this->db
            ->order_by('action')
            ->get_where($this->table_name, [
                'game_id' => $game_id,
                'player_id' => $player_id,
            ])
            ->result_array();

        $actions = array_column($moves, 'action');

        if (count($actions) < 3) {
            return;
        }

        $won_combination = [];

        // fast check
        if (false !== $key = array_search($actions, self::WIN_COMBINATIONS)) {
            $won_combination = self::WIN_COMBINATIONS[$key];
        } else {
            // slower check
            foreach (self::WIN_COMBINATIONS as $combination) {
                $in_win_combination = 0;
                foreach ($actions as $action) {
                    if (!in_array($action, $combination)) {
                        continue;
                    }
                    $in_win_combination++;
                    if ($in_win_combination == 3) {
                        $won_combination = $combination;
                    }
                }
            }
        }

        if (!empty($won_combination)) {
            $result = $this->game_model->win($game_id, $player_id, $won_combination);
            if (!$result) {
                throw new Internal_server_error('Move won but unknown server error occurred');
            }
            throw new Player_win($move_id);
        }
    }

    /**
     * @param int $game_id
     * @param int $action
     *
     * @return int
     * @throws Action_already_exists
     * @throws Draw
     * @throws Game_already_finished
     * @throws Game_not_found
     * @throws Internal_server_error
     * @throws Moves_are_off
     * @throws Player_win
     */
    public function create(int $game_id, int $action): int {
        $game = $this->game_model->get($game_id);

        if (empty($game)) {
            throw new Game_not_found();
        }

        $winner_id = $this->game_model->get_winner_id($game_id);
        if ($winner_id) {
            throw new Game_already_finished($winner_id);
        }

        $moves = $this->db
            ->get_where($this->table_name, [
                'game_id' => $game_id,
            ])
            ->result_array();

        $this->validate($moves, $action);

        $player_id = $this->get_current_player_id($moves, $game);

        $this->db->insert($this->table_name, [
            'game_id' => $game_id,
            'player_id' => $player_id,
            'action' => $action,
        ]);

        $move_id = $this->db->insert_id();

        $this->check_win($game_id, $player_id, $move_id);

        if (count($moves) + 1 == 9) {
            throw new Draw($move_id);
        }

        return $move_id;
    }
}
