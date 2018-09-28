#!/bin/bash
docker-compose exec database sh -c 'exec mysqldump "$MYSQL_DATABASE" -uroot -p"$MYSQL_ROOT_PASSWORD"' > ../data/database.sql
tar -zcvf ../data/files.tar.gz ../www/wp-content/
echo "Export successful!"