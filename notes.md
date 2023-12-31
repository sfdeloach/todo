# Notes

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
