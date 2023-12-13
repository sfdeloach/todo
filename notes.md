# Notes

## MariaDB in a Docker Container

Resources:
- https://hub.docker.com/_/mariadb

Create and start the docker container

```
$ docker run --detach -p 3306:3306 --name some-mariadb --env MARIADB_USER=steven --env MARIADB_PASSWORD=lillian16 --env MARIADB_DATABASE=todo-db --env MARIADB_ROOT_PASSWORD=lillian16  mariadb:latest
```
  
Connect to the database container from local:

```
$ mariadb -h localhost -P 3306 --protocol=tcp -u steven -p todo-db
```
## Data Model

### todos table

|   key   | column name |   type    |
| :-----: | ----------- | :-------: |
| primary | \_id        |    INT    |
| foreign | user_id     |    INT    |
|         | isActive    |   BOOL    |
|         | isHidden    |   BOOL    |
|         | text        | TEXT(256) |

### users table

|   key   | column name |    type    |
| :-----: | ----------- | :--------: |
| primary | \_id        |    INT     |
| foreign | role_id     |    INT     |
|         | isActive    |    BOOL    |
|         | isHidden    |    BOOL    |
|         | name_first  |  TEXT(32)  |
|         | name_last   |  TEXT(32)  |
|         | username    |  TEXT(64)  |
|         | hash        | TEXT(1024) |

### roles table

|   key   | column name |   type   |
| :-----: | ----------- | :------: |
| primary | \_id        |   INT    |
|         | authLevel   |   INT    |
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
