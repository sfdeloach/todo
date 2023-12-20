# Notes

## MariaDB in a Docker Container

Resources:

- https://hub.docker.com/_/mariadb

Create and start the docker container

```
$ docker run --detach -p 3306:3306 --env MARIADB_USER=user --env MARIADB_PASSWORD=password --env MARIADB_DATABASE=todo_db --env MARIADB_ROOT_PASSWORD=password mariadb:latest
```

Connect to the database container from local:

```
$ mariadb --host=localhost --port=3306 --protocol=TCP --user=user --password=password todo_db
```

Run a SQL script from command line:

```
MariaDB [todo-db]> source {path_to_file.sql}
```

## Data Model

### todos table

|   key   | column name |   type    |
| :-----: | ----------- | :-------: |
| primary | \_id        |   UINT    |
| foreign | user_id     |   UINT    |
|         | position    |   UINT    |
|         | isActive    |   BOOL    |
|         | isHidden    |   BOOL    |
|         | text        | TEXT(256) |

### users table

|   key   | column name |    type   |
| :-----: | ----------- | :-------: |
| primary | \_id        |    UINT   |
| foreign | role_id     |    UINT   |
|         | isActive    |    BOOL   |
|         | isHidden    |    BOOL   |
|         | name_first  |  TEXT(32) |
|         | name_last   |  TEXT(32) |
|         | username    |  TEXT(64) |
|         | hash        | TEXT(128) |

### roles table

|   key   | column name |   type   |
| :-----: | ----------- | :------: |
| primary | \_id        |   UINT   |
|         | authLevel   |   UINT   |
|         | name        | TEXT(16) |
|         | description | TEXT(64) |

## Authentication Workflow

- client asks for a list of roles from graphql, this is to test if a session
  exists
- if a session does not exist:
  - the client goes to the login screen
  - a successful login redirects to the user's list of todos
- if a session exists:
  - the user's list of todos is displayed
