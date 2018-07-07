#!/bin/bash
docker-compose exec database sh -c 'exec mysqldump "$MYSQL_DATABASE" -uroot -p"$MYSQL_ROOT_PASSWORD"' > ../data/db.sql
tar -zcvf ../data/wpd_content.tar.gz ../www/wp-content/