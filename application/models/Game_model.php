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

    public function win(int $game_id, int $player_id) {
        return $this->db
            ->where([
                'id' => $game_id,
            ])
            ->where("(player_1 = $player_id OR player_2 = $player_id)", null, false)
            ->update($this->table_name, [
                'player_id_won' => $player_id,
            ]);
    }
}
