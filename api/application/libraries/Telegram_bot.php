<?php
/**
 * Created by PhpStorm.
 * User: aleksander.hitrov
 * Date: 21/01/2018
 * Time: 12:27
 */

class Telegram_bot {
    const API_KEY = '540163061:AAH43cg8149rR_Bu9mjAoM3D02xZjCG7msU';

    const TOKEN = 'DEC5233158CD8972D0E83A8B6C7ACD14320A52D9AF37D71A9E29566EB349DD62287EFAF5A3F71F4B6DB2DB1045FB0CEAF5AB3A7F4ACF391B4FB682B2448AF4F5';

    public function sendMessage($chatId, $text, $replyKeyboardMarkup = NULL, $parseMode = null)
    {
        $url = 'https://api.telegram.org/bot' . self::API_KEY . '/sendMessage';
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


    function getMessage(array $allActions, array $actions): string {
        $response = '<pre>';

        $field = [];
        foreach ($allActions as $possibleAction) {
            $symbol = $possibleAction % 2 === 0 ? 'O' : 'X';
            if (in_array($possibleAction, $actions)) {
                $field[$possibleAction] = $symbol;
                continue;
            }
            $field[$possibleAction] = ' ';
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
