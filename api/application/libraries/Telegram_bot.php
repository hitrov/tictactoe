<?php
/**
 * Created by PhpStorm.
 * User: aleksander.hitrov
 * Date: 21/01/2018
 * Time: 12:27
 */

class Telegram_bot {
    public function sendMessage($chatId, $text, $replyKeyboardMarkup = NULL, $parseMode = null)
    {
        $url = 'https://api.telegram.org/bot' . getenv('API_KEY') . '/sendMessage';
        !$replyKeyboardMarkup ? $replyKeyboardMarkup = new stdClass() : '';

        $postFields = [
            'chat_id' => $chatId,
            'text' => $text,
        ];

        if ($parseMode) {
            $postFields['parse_mode'] = $parseMode;
        }

        $replyKeyboardMarkup ? $postFields['reply_markup'] = json_encode($replyKeyboardMarkup) : '';

        $ch = curl_init($url);
        $curlOptions = [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $postFields,
        ];

        curl_setopt_array($ch, $curlOptions);
        curl_exec($ch);
        curl_close($ch);
    }

    /**
     * @param array $allActions
     * @param array $actions
     *
     * @return string
     */
    function getMessage(array $allActions, array $actions): string {
        $response = '<pre>';

        $field = [];

        foreach ($allActions as $action) {
            $field[$action] = ' ';
        }

        foreach ($actions['player'] as $action) {
            $field[$action] = 'X';
        }

        foreach ($actions['bot'] as $action) {
            $field[$action] = 'O';
        }

        $response .= "$field[1] | $field[2] | $field[3]" . "\r\n";
        $response .= '---------' . "\r\n";
        $response .= "$field[4] | $field[5] | $field[6]" . "\r\n";
        $response .= '---------' . "\r\n";
        $response .= "$field[7] | $field[8] | $field[9]" . "\r\n";

        $response .= '</pre>';

        return $response;
    }
}
