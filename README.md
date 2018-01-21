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

Change directory in terminal to this project directory.

`cd ./api/`

`composer install`

`php -S localhost:8000`

Open new terminal window and go to project directory

`cd ./front/`

`npm install`

`npm start`

Thank you!