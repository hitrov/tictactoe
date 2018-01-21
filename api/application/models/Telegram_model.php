<?php
/**
 * Created by PhpStorm.
 * User: aleksander.hitrov
 * Date: 13/01/2018
 * Time: 20:18
 */

use TicTacToe\Exceptions\HTTP\Internal_server_error;
use TicTacToe\Exceptions\HTTP\Bad_request;
use TicTacToe\Exceptions\HTTP\OK;
use TicTacToe\Exceptions\Won;
use TicTacToe\Exceptions\Lost;
use TicTacToe\Exceptions\Draw;
use TicTacToe\Exceptions\CreateNewGame;

class Telegram_model extends MY_Model {
    public $table_name = 'telegram';

    //const API_BASE_URL = 'https://api.ttt.hitrov.com';
    const API_BASE_URL = 'http://tictact.oe:8002';

    public function __construct() {
        parent::__construct();
        $this->load->model('game_model');
    }

    /**
     * @param int $telegram_id
     * @param string $username
     * @param string $first_name
     *
     * @return array
     */
    public function create(int $telegram_id, string $username = '', string $first_name = ''): array {
        $this->db->insert($this->table_name, [
            'telegram_id' => $telegram_id,
            'username' => $username,
            'first_name' => $first_name,
            'waiting_for_action' => 'new_game',
        ]);

        $telegram_user = $this->get($this->db->insert_id());

        return $telegram_user;
    }

    /**
     * @param int $telegram_id
     * @param int $player_id
     * @param string $bearer_token
     *
     * @return int
     */
    public function update_player(int $telegram_id, int $player_id, string $bearer_token): int {
        $this->db
            ->where([
                'telegram_id' => $telegram_id,
            ])
            ->update($this->table_name, [
                'player_id' => $player_id,
                'bearer_token' => $bearer_token,
                'waiting_for_action' => 'move',
            ]);

        return $this->db->affected_rows();
    }

    /**
     * @param int $telegram_id
     *
     * @return int
     */
    public function wait_for_new_game(int $telegram_id): int {
        $this->db
            ->where([
                'telegram_id' => $telegram_id,
            ])
            ->update($this->table_name, [
                'waiting_for_action' => 'new_game',
            ]);

        return $this->db->affected_rows();
    }

    /**
     * @param int $player_id
     *
     * @return array
     */
    public function get_by_player_id(int $player_id): array {
        $item = $this->db
            ->limit(1)
            ->get_where($this->table_name, [
                'player_id' => $player_id,
            ])
            ->row_array();

        return $item ? $item : [];
    }

    public function get_by_telegram_id(int $telegram_id): array {
        $item = $this->db
            ->limit(1)
            ->get_where($this->table_name, [
                'telegram_id' => $telegram_id,
            ])
            ->row_array();

        return $item ? $item : [];
    }

    public function set_game_id(int $telegram_id, int $game_id): int {
        $this->db
            ->where([
                'telegram_id' => $telegram_id,
            ])
            ->update($this->table_name, [
                'game_id' => $game_id,
            ]);

        return $this->db->affected_rows();
    }

    public function update_bearer_token(int $telegram_id, string $bearer_token): int {
        $this->db
            ->where([
                'telegram_id' => $telegram_id,
            ])
            ->update($this->table_name, [
                'bearer_token' => $bearer_token,
            ]);

        return $this->db->affected_rows();
    }

    /**
     * @param string $player_name
     *
     * @return array
     * @throws Bad_request
     * @throws CreateNewGame
     */
    private function create_players(string $player_name): array {
        $uri = '/player/create_players';

        $postFields = [
            'player_1' => $player_name,
            'player_2' => 'Telegram Bot',
        ];

        $response = $this->call_api($uri, 'POST', $postFields);

        return $response;
    }

    /**
     * @param string $bearer_token
     *
     * @return array
     * @throws Bad_request
     * @throws CreateNewGame
     */
    private function create_game(string $bearer_token): array {
        $uri = '/game';

        $response = $this->call_api($uri, 'POST', [], $bearer_token);

        return $response;
    }

    /**
     * @param string $uri
     * @param string $method
     * @param array $postFields
     * @param string $bearer_token
     *
     * @return array
     * @throws Bad_request
     * @throws CreateNewGame
     */
    private function call_api(string $uri = '', string $method = 'GET', array $postFields = [], string $bearer_token = ''): array {
        $ch = curl_init(self::API_BASE_URL . $uri);

        $curlOptions = [
            CURLOPT_RETURNTRANSFER => true,
        ];

        if ($bearer_token) {
            $curlOptions[CURLOPT_HTTPHEADER] = [
                "Authorization: Bearer $bearer_token",
            ];
        }

        if ($method === 'POST') {
            $curlOptions[CURLOPT_POST] = true;
            if (!empty($postFields)) {
                $curlOptions[CURLOPT_POSTFIELDS] = $postFields;
            }
        }

        curl_setopt_array($ch, $curlOptions);
        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        // handling expired token
        if ($http_code === 401) {
            throw new CreateNewGame('Game expired. Please start over.');
        }

        if ($response !== false) {
            $response_array = json_decode($response, true);
            if ($response_array === false) {
                $response_array = [
                    'errors' => [$response],
                ];
            }

            // handling request errors
            if ($http_code === 400 && !empty($response_array['errors'])) {
                throw new Bad_request(implode(', ', $response_array['errors']));
            }

        } else {
            $response_array = [];
        }

        return $response_array;
    }

    /**
     * @param int $telegram_id
     * @param string $first_name
     *
     * @throws Bad_request
     * @throws CreateNewGame
     * @throws Internal_server_error
     * @throws OK
     */
    public function new_game(int $telegram_id, string $first_name) {
        $api_response = $this->create_players($first_name);
        if (empty($api_response)) {
            throw new Internal_server_error('Player creation error.');
        }

        $player_id = $api_response['player_1'];
        //$bot_id = $api_response['player_2'];

        $bearer_token = $api_response['bearer_token'];

        $this->telegram_model->update_player($telegram_id, $player_id, $bearer_token);

        $api_response = $this->create_game($bearer_token);

        if (empty($api_response)) {
            throw new Internal_server_error('Game creation error.');
        }

        $this->telegram_model->set_game_id($telegram_id, $api_response['id']);

        $bearer_token = $api_response['bearer_token'];
        $this->telegram_model->update_bearer_token($telegram_id, $bearer_token);

        $message = $this->telegram_bot->getMessage(Game_model::ALL_ACTIONS, [
            'player' => [],
            'bot' => [],
        ]);
        throw new OK($message);
    }

    /**
     * @param int $action
     * @param string $bearer_token
     *
     * @return array
     * @throws Bad_request
     * @throws CreateNewGame
     */
    private function create_move(int $action, string $bearer_token): array {
        $uri = '/move/?with_bot=1';

        $postFields = [
            'action' => $action,
        ];

        $response = $this->call_api($uri, 'POST', $postFields, $bearer_token);

        return $response;
    }

    /**
     * @param int $telegram_id
     * @param string $request
     *
     * @throws Bad_request
     * @throws CreateNewGame
     * @throws Draw
     * @throws Internal_server_error
     * @throws Lost
     * @throws OK
     * @throws Won
     */
    public function move(int $telegram_id, string $request) {
        if (!in_array($request, Game_model::ALL_ACTIONS)) {
            throw new Bad_request('Available moves: ' . implode(',', Game_model::ALL_ACTIONS));
        }

        $telegram_user = $this->get_by_telegram_id($telegram_id);

        $game_id = $telegram_user['game_id'];
        $bearer_token = $telegram_user['bearer_token'];
        $api_response = $this->create_move($request, $bearer_token);

        if (empty($api_response)) {
            throw new Internal_server_error('Game creation error.');
        }

        $bearer_token = $api_response['bearer_token'];
        $this->telegram_model->update_bearer_token($telegram_id, $bearer_token);

        $actions = $this->move_model->get_game_actions($game_id, $telegram_user['player_id']);
        $message = $this->telegram_bot->getMessage(Game_model::ALL_ACTIONS, $actions);

        if (!empty($api_response['player_id_won']) && !empty($api_response['won_combination'])) {
            if ($api_response['player_id_won'] == $telegram_user['player_id']) {
                throw new Won('Win!');
            }
            throw new Lost('Lost.');
        }

        if (!empty($api_response['draw']) && empty($api_response['player_id_won'])) {
            throw new Draw('Draw.');
        }

        throw new OK($message);
    }
}
