<?php
/**
 * Created by PhpStorm.
 * User: aleksander.hitrov
 * Date: 13/01/2018
 * Time: 20:18
 */

class MY_Model extends CI_Model {
    public $table_name = '';

    /**
     * @param int $id
     *
     * @return array
     */
    public function get(int $id) {
        return $this->db
            ->limit(1)
            ->get_where($this->table_name, [
                'id' => $id,
            ])
            ->row_array();
    }
}
