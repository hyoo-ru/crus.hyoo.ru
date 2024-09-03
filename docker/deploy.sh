cd ~/

# installing docker
curl -sSL https://get.docker.com/ | sh

git clone https://github.com/hyoo-ru/crus.hyoo.ru
cd crus.hyoo.ru/docker
docker compose up -d

cd ~/

# configure cron autopull and restart
(crontab -l 2>/dev/null; echo "*/5 * * * * $PWD/crus.hyoo.ru/docker/autopull_and_restart.sh") | crontab -
