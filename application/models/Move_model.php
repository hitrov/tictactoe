<?php
/**
 * Created by PhpStorm.
 * User: aleksander.hitrov
 * Date: 13/01/2018
 * Time: 20:18
 */

class Move_model extends CI_Model {
    public $table_name = 'move';

    public function create(int $game_id, int $player_id, int $action): int {
        $this->db->insert($this->table_name, [
            'game_id' => $game_id,
            'player_id' => $player_id,
            'action' => $action,
        ]);

        return $this->db->insert_id();
    }
}
