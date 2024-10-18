To run the project firstly need to give the credentials in the .env file according to .env.example

Then after connecting to the db, you need to run two commands:

1-command:  ```shell npx knex migrate:latest``` 
this command will be migrate all of tables in your db

2-command: ```shell npx knex seed:run ```
this command will be created seed datas to the tables and you can check APi's with this data

after this work with api's you need to be take token from the api:
I created 6 data for users, 4 of them is just user, 1  of them org leader, one of them admin.

If you want to check with one token all of methods, you need input this credentials:
```s
name:'Admin User',
login:'pswdtest'
```