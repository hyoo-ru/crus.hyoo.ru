#!/usr/bin/env bash

cd ~/crus.hyoo.ru
GIT_OUTPUT=$(git pull 2>/dev/null)
TIME=$(date "+%d.%m.%Y %H:%M:%S")

if [[ "$GIT_OUTPUT" == "Already up to date." ]]
then
        echo "$TIME" "nothing to update" >> /var/log/crus.hyoo.log
else
        git reset --hard origin/master
        git pull
        cd docker
        docker-compose up -d --no-deps --build
        echo "$TIME" "sync | crus service restarted" >> /var/log/crus.hyoo.log
fi
