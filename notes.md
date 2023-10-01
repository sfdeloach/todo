# Notes

## Authentication Workflow

### First time login

- client gives username and password to server
- server checks DB to see if its valid
- if so...
  - server returns to the client the authorization level
  - server saves the session info in the DB

### Already logged in

- client asks server to check if its sessionID exists and is valid
- if so...
  - server returns to the client the auth level
  - server updates the session info in the DB
