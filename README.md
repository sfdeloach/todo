# Not so trivial TODO app

## Tech Stack

- MariaDB, GraphQL, NodeJS, Express, React

## Dev Stack

- Apache HTTP Server, PHPMyAdmin, Postman, Vite

## Project Objectives

- Full stack app w/ Database and GraphQL API
- Authentication and authorization
  - session store
  - username and password (how to handle a password reset?)
  - each user has there own TODO list
  - three roles:
    1. user only has CRUD rights to their own TODO
    2. user has #1 plus can read (no CUD) everyone else's TODO list
    3. user has full super admin CRUD over everyone's list AND lock accounts out
- Maintenance branch to disable the application
- All style via React properties

## Using PHPMyAdmin to work with MariaDB

Start the database and Apache services:

```
$ systemctl start mariadb.service
$ systemctl start httpd.service
```

Visit the front-end at:

```
http://localhost/phpmyadmin/
```
