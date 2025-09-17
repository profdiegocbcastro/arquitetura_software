#!/bin/bash

docker stop $(docker ps -aq)

docker rm $(docker ps -aq)

docker rmi -f $(docker images -q)

docker volume rm $(docker volume ls -q)

echo "Limpeza completa!"
