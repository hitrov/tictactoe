<?php
/**
 * Created by PhpStorm.
 * User: aleksander.hitrov
 * Date: 13/01/2018
 * Time: 20:18
 */

class Player_model extends MY_Model {
    public $table_name = 'player';

    public function create(string $name): int {
        $this->db->insert($this->table_name, [
            'name' => $name,
        ]);

        return $this->db->insert_id();
    }
}
