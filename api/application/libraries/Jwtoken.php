<?php

use TicTacToe\Exceptions\HTTP\Unauthorized;

class Jwtoken {
    const BEARER_SECRET = '1594244D52F2D8C12B142BB61F47BC2EAF503D6D9CA8480CAE9FCF112F66E4967DC5E8FA98285E36DB8AF1B8FFA8B84CB15E0FBCF836C3DEB803C13F37659A60';

    private $header = [
        "typ" => "JWT",
        "alg" => "HS256",
    ];

    const VALID_SECONDS = 1800; // 30 min

    /**
     * @var array
     */
    private $payload = [];

    /**
     * @var array
     */
    private $requestPayload;

    /**
     * @var bool
     */
    private $verified = false;

    private function setRequestPayload(string $payload)
    {
        $payload = base64_decode($payload);
        $payload = json_decode($payload, true);
        $this->requestPayload = $payload;
    }

    public function getRequestPayload(): array
    {
        return $this->requestPayload;
    }

    public function setPayload(array $payload)
    {
        $this->payload = array_merge($this->payload, $payload, [
            'valid_until' => time() + self::VALID_SECONDS,
            'ip_address' => $_SERVER['REMOTE_ADDR'],
        ]);
    }

    private function updateTimestamp()
    {
        $this->payload['valid_until'] = time() + self::VALID_SECONDS;
    }

    public function getVerified(): bool
    {
        return $this->verified;
    }

    /**
     * @param string $data
     *
     * @return string
     */
    public function getSignature(string $data): string
    {
        $signature = hash_hmac('sha256', $data, self::BEARER_SECRET);
        return $signature;
    }

    /**
     * @return string
     */
    private function encodeData(): string
    {
        $jsonHeader = json_encode($this->header);
        $jsonPayload = json_encode($this->payload);

        $eHeader = base64_encode($jsonHeader);
        $ePayload = base64_encode($jsonPayload);

        $data = "$eHeader.$ePayload";

        return $data;
    }

    /**
     * @return string
     * @throws \Exception
     */
    public function getToken(): string
    {
        $data = self::encodeData();
        $signature = self::getSignature($data);

        $jwToken = "$data.$signature";

        return $jwToken;
    }

    public function verifyToken() {
        if (empty($_SERVER['HTTP_AUTHORIZATION'])) {
            throw new Unauthorized('Token not found.');
        }

        $matches = [];
        $pattern = '/^Bearer (?P<header>[\w]+)\.(?P<payload>[\w\=]+)\.(?P<signature>[a-f0-9]+)$/';
        if (preg_match($pattern, $_SERVER['HTTP_AUTHORIZATION'], $matches)) {
            $header = $matches['header'];
            $payload = $matches['payload'];
            $receivedSignature = $matches['signature'];
            $data = "$header.$payload";

            $signature = $this->getSignature($data);

            if ($receivedSignature !== $signature) {
                throw new Unauthorized('Invalid JWT token.');
            }

            $this->setRequestPayload($payload);

            $requestPayload = $this->getRequestPayload();
            if ($_SERVER['REMOTE_ADDR'] !== $requestPayload['ip_address']) {
                throw new Unauthorized('IP address for token is invalid.');
            }

            if ($requestPayload['valid_until'] < time()) {
                throw new Unauthorized('Token expired.');
            }

            $this->payload = $requestPayload;
            $this->updateTimestamp();

            $this->verified = true;
            return;
        }

        throw new Unauthorized('Invalid JWT token.');
    }
}
