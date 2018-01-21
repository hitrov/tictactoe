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
    private function validate_moves(array $moves, int $action) {
        if (empty($moves)) {
            return;
        }

        if (count($moves) >= 9) {
            throw new Moves_are_off();
        }

        $actions = array_column($moves, 'action');
        if (in_array($action, $actions)) {
            throw new Action_already_exists();
        }
    }

    private function get_moves_count(int $game_id): int {
        return $this->db
            ->where('game_id', $game_id)
            ->count_all_results($this->table_name);
    }

    /**
     * @param int $game_id
     * @param int $player_id
     * @param int $move_id
     *
     * @throws Draw
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


        if ($this->get_moves_count($game_id) === 9) {
            throw new Draw($move_id);
        }
    }

    /**
     * @param array|null $game
     * @param array $moves
     * @param int $action
     *
     * @throws Action_already_exists
     * @throws Game_already_finished
     * @throws Game_not_found
     * @throws Moves_are_off
     */
    private function validate(array $game = null, array $moves, int $action) {
        if (empty($game)) {
            throw new Game_not_found();
        }

        $winner_id = $this->game_model->get_winner_id($game['id']);
        if ($winner_id) {
            throw new Game_already_finished($winner_id);
        }

        $this->validate_moves($moves, $action);
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
    public function create_without_respond(int $game_id, int $action): int {
        $game = $this->game_model->get($game_id);
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

    /**
     * @param int $game_id
     * @param int $action
     *
     * @return array
     * @throws Action_already_exists
     * @throws Draw
     * @throws Game_already_finished
     * @throws Game_not_found
     * @throws Internal_server_error
     * @throws Moves_are_off
     * @throws Player_win
     */
    public function create_and_respond(int $game_id, int $action): array {
        $game = $this->game_model->get($game_id);
        $moves = $this->db
            ->get_where($this->table_name, [
                'game_id' => $game_id,
            ])
            ->result_array();

        $this->validate($game, $moves, $action);

        $player_id = $game['player_1'];
        $bot_id = $game['player_2'];

        $this->db->insert($this->table_name, [
            'game_id' => $game_id,
            'player_id' => $player_id,
            'action' => $action,
        ]);

        $player_move_id = $this->db->insert_id();

        $this->check_win($game_id, $player_id, $player_move_id);

        $next_action = $this->get_next_action($game_id, $player_id, $bot_id);

        $this->db->insert($this->table_name, [
            'game_id' => $game_id,
            'player_id' => $bot_id,
            'action' => $next_action,
        ]);

        $bot_move_id = $this->db->insert_id();

        $this->check_win($game_id, $bot_id, $bot_move_id);

        return [
            'moves' => [
                $this->get($player_move_id),
                $this->get($bot_move_id),
            ],
        ];
    }

    private function get_next_action(int $game_id, int $player_id, int $bot_id): int {
        $player_moves = $this->db
            ->get_where($this->table_name, [
                'game_id' => $game_id,
                'player_id' => $player_id,
            ])
            ->result_array();

        if (!empty($player_moves)) {
            $player_actions = array_column($player_moves, 'action');
        }

        $bot_moves = $this->db
            ->get_where($this->table_name, [
                'game_id' => $game_id,
                'player_id' => $bot_id,
            ])
            ->result_array();

        if (!empty($bot_moves)) {
            $bot_actions = array_column($bot_moves, 'action');
        }

        $action = $this->get_action($player_actions ?? [], $bot_actions ?? []);

        return $action;
    }

    private function get_last_action_for_win(array $actions, array $done_actions): int {
        $action_for_win = 0;
        foreach (self::WIN_COMBINATIONS as $key => $combination) {
            //could be 2 possible combinations for win at the moment
            if ($action_for_win) {
                break;
            }

            $in_win_combination = [];
            foreach ($actions as $action) {
                if (!in_array($action, $combination)) {
                    continue;
                }
                $in_win_combination[] = $action;
                if (count($in_win_combination) === 2) {
                    $diff = array_diff($combination, $in_win_combination);
                    $possible_action_for_win = reset($diff);
                    if (!in_array($possible_action_for_win, $done_actions)) {
                        $action_for_win = $possible_action_for_win;
                        break;
                    }
                }
            }
        }

        return $action_for_win;
    }

    private function get_action(array $player_actions, array $bot_actions): int {
        $done_actions = array_merge($player_actions, $bot_actions);

        // check maybe bot could win in this move
        $respond_action = $this->get_last_action_for_win($bot_actions, $done_actions);
        if ($respond_action) {

            return $respond_action;
        }

        // check maybe player is about to win now
        $respond_action = $this->get_last_action_for_win($player_actions, $done_actions);
        if ($respond_action) {

            return $respond_action;
        }

        // important move if position is free!
        if (!in_array(5, $done_actions)) {
            return 5;
        }

        // random free position
        $possible_actions = array_diff(Game_model::ALL_ACTIONS, $done_actions);
        $random_key = array_rand($possible_actions);
        $respond_action = $possible_actions[$random_key];

        return $respond_action;
    }

    /**
     * @param int $game_id
     * @param int $player_id
     *
     * @return array
     */
    public function get_game_actions_by_player(int $game_id, int $player_id): array {
        $results = $this->db->select('action, player_id')
            ->where('game_id', $game_id)
            ->get($this->table_name)
            ->result_array();

        $game_actions = [
            'player' => [],
            'bot' => [],
        ];
        foreach ($results as $row) {
            if ($row['player_id'] == $player_id) {
                $game_actions['player'][] = $row['action'];
            } else {
                $game_actions['bot'][] = $row['action'];
            }
        }

        return $game_actions;
    }

    /**
     * @param int $game_id
     *
     * @return array
     */
    private function get_game_actions(int $game_id): array {
        $results = $this->db->select('action')
            ->where('game_id', $game_id)
            ->get($this->table_name)
            ->result_array();

        return $results ? array_column($results, 'action') : [];
    }

    /**
     * @param int $game_id
     *
     * @return array
     */
    public function get_available_actions(int $game_id): array {
        $game_actions = $this->get_game_actions($game_id);

        return array_diff(Game_model::ALL_ACTIONS, $game_actions);
    }
}
