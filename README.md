Production version is available:

https://ttt.hitrov.com (Web application)

https://api.ttt.hitrov.com (API)

To run locally, make sure that you have
1. Composer
https://getcomposer.org/download/
2. At least PHP 7.0+
3. NodeJS and NPM
https://nodejs.org/en/

If you wanna test API only, please import `./postman_collection.json` to the Postman app. No frontend (node, npm) required in that case.

Clone the repository

Create the database named `tictactoe`

Update database credentials (`username` and `password`) in `api/application/config/database.php`

(and maybe `host` and `database` if you can't use suggested name)

Import `./api/tictactoe.sql`

Change directory in terminal to this project directory.

`cd ./api/`

`composer install`

`php -S localhost:8000`

(if for some reason you can't use 8000 port or even localhost, please update `API_BASE_URL` constant in `/front/src/constants/index.js`)

Optional: you can use production API with local frontend `API_BASE_URL` = `https://api.ttt.hitrov.com` as well if you had issues with backend setup

Notice: Telegram Bot was implemented in this task,
https://t.me/hitrov_ttt_bot

it uses the same API as frontend (web app)

Open new terminal window and go to project directory

`cd ./front/`

`npm install`

`npm start`

Thank you!

P.S. 

if you wanna debug the project (e.g. xdebug), probably you wanna use a Cookie named XDEBUG_SESSION and 
https://chrome.google.com/webstore/detail/xdebug-helper/eadndfjplgieldjbigjakmdgkmoaaaoc?hl=en

In that case 

1. Uncomment `credentials: 'include'` in `front/src/api/index.js`, line 30
2. Uncomment `self::HEADER_ACCESS_CONTROL_ALLOW_CREDENTIALS => 'true'` in `api/application/core/MY_Controller.php`, line 31 
3. Set `HEADER_ACCESS_CONTROL_ALLOW_ORIGIN` from `*` to `http://localhost:3000` in `api/application/core/MY_Controller.php`, line 28
