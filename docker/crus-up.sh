# Setup environment
# ⚠️ Use your own domain name or replace ip by your public one
echo DOMAIN=crus.0-0-0-0.ip.hyoo.ru >> /etc/environment
source /etc/environment

# Install and start Docker
curl -fsSL https://get.docker.com | sh
service docker start

# Start Services:
# - CRUS server on :9090
# - Caddy proxy for SSL on :443 (+ redir from :80)
# - Watch Tower for auto updates
curl -fsSL https://raw.githubusercontent.com/hyoo-ru/crus.hyoo.ru/refs/heads/master/docker/docker-compose.yml -o docker-compose.yml
docker compose up -d
