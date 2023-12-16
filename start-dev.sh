#!/bin/bash

# start vite development server in a new window
gnome-terminal -- zsh -c "cd ./client; npm run dev"

# start API development server
(cd ./server; npm run dev)
