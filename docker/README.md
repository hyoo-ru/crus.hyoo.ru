### How to start:
To start CRUS, simply type the following command into the terminal:
```
docker compose up -d
```

### Logs
To view all logs, use the following command:
```
docker compose logs -f
```
The `-f` option ensures that all new log entries are displayed in real-time. If you wish to view a file containing all logs, it can be found here:
```
/var/lib/docker/containers/<crus_container_id>/local-logs/container.log
```

### Data storage
All data within CRUS is stored in a volume. To determine the path to the volume, first run:
```
docker volume ls
```
then run:
```
docker volume inspect <volume_name>
```
The value of `Mountpoint` within the returned data will provide the path you require.