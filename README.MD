# LAU EVENTS API

## Installation

```bash
npm install
```

## Running the app

Make sure you oppened the .env file and set the correct values for the database connection

```yaml
env.DB_HOST='localhost',
env.DB_PORT=3306,
env.DB_NAME='<PICK>',
env.DB_USERNAME='<PICK>',
env.DB_PASS='<PICK>'
```

Now open XAMPP and start the Apache and MySQL services

Open database panel on XAMPP and create a database called the same as the one in the .env file

Now open a terminal and run the following command

```bash
# development
$ npm start dev
```
