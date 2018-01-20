<?php
/**
 * Created by PhpStorm.
 * User: aleksander.hitrov
 * Date: 13/01/2018
 * Time: 20:18
 */

class Game_model extends MY_Model {
    public $table_name = 'game';

    public function create(int $player_1, int $player_2): int {
        $this->db->insert($this->table_name, [
            'player_1' => $player_1,
            'player_2' => $player_2,
        ]);

        return $this->db->insert_id();
    }

    public function get_winner_id(int $game_id) {
        $winner = $this->db->select('player_id_won')
            ->limit(1)
            ->get_where($this->table_name, [
                'id' => $game_id,
            ])
            ->row_array();

        return $winner['player_id_won'];
    }

    public function win(int $game_id, int $player_id, array $won_combination) {
        return $this->db
            ->where([
                'id' => $game_id,
            ])
            ->where("(`player_1` = '$player_id' OR `player_2` = '$player_id')", null, false)
            ->update($this->table_name, [
                'player_id_won' => $player_id,
                'won_combination' => serialize($won_combination),
            ]);
    }

    private function process_history(array $result): array {
        $history = [];
        foreach ($result as $row) {

            $game_id = $row['game_id'];

            $move = [
                'player_id' => $row['player_id'],
                'action' => $row['action'],
                'dt' => $row['dt'],
            ];

            if (empty($history[$game_id])) {
                $history[$game_id] = [
                    'game_id' => $game_id,
                    'player_1' => [
                        'id' => $row['player_1'],
                        'name' => $row['player_1_name'],
                    ],
                    'player_2' => [
                        'id' => $row['player_2'],
                        'name' => $row['player_2_name'],
                    ],
                    'player_id_won' => $row['player_id_won'],
                    'moves' => [],
                ];
            }

            $history[$game_id]['moves'][$row['move_id']] = $move;
        }

        $ordered_history = [];
        foreach ($history as $game_id => $game) {
            if (!empty($game['moves']) && !empty(!empty($row['player_id_won']))) {
                $last_move = reset($history[$game_id]['moves']);
                $history[$game_id]['finished'] = $last_move['dt'];
            }
            $ordered_history[] = $history[$game_id];
        }

        return $ordered_history;
    }

    public function history(int $player_1_id, int $player_2_id, int $offset = 0, int $limit = 50): array {
        $this->db
            ->select('game_id, (SELECT player.name FROM player WHERE id = game.`player_1`) as player_1_name, '.
                                    '(SELECT player.name FROM player WHERE id = game.`player_2`) as player_2_name, '.
                                    'player_1, player_2, player_id_won, move.id as move_id, move.player_id, action, dt')
            ->join('move', 'game.id = move.game_id')
            ->order_by('game_id', 'DESC')
            ->where('player_1', $player_1_id)
            ->where('player_2', $player_2_id)
            ->limit($limit);

        if ($offset) {
            $this->db->offset($offset);
        }

        $result = $this->db
            ->get_where($this->table_name, null, false)
            ->result_array();

        $history = $this->process_history($result);

        return $history;
    }
}
