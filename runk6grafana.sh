date

K6_INFLUXDB_ORGANIZATION=orgariman \
K6_INFLUXDB_BUCKET=bucketariman \
K6_INFLUXDB_TOKEN=3ZtmenhoJkEihz5sv5R1vnwaDEhCR8FGBln-M59EYzr-XQc4jZjPsI7N5Lr1pY4DGmkQHTWlyO0WDocaw4qOfg== \
K6_INFLUXDB_PUSH_INTERVAL=2s \
./bin/k6 run -o xk6-influxdb=http://localhost:8086 run.js

date