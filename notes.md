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
|         | password    | TEXT(1024) |

### roles table

|   key   | column name |   type   |
| :-----: | ----------- | :------: |
| primary | \_id        |   INT    |
|         | name        | TEXT(16) |
|         | description | TEXT(64) |

## Authentication Workflow

- client 

- client gets session info
- if session info indicates the user is logged in
  - the client asks for user/auth info
  - the server updates the expiration
- if session info indicates the user is not logged in
  - the server removes session data from the db if applicable
  - the client receives a false log in value
  - the client is routed to a log in page
