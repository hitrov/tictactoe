<?php

if (empty($_REQUEST['token']) || $_REQUEST['token'] !== getenv('TOKEN')) {
    header('HTTP/1.0 403 Forbidden');
    die;
}

phpinfo();
