#!/bin/bash
docker-compose exec wpd_db sh -c 'exec mysqldump "$MYSQL_DATABASE" -uroot -p"$MYSQL_ROOT_PASSWORD"' > ../data/db.sql
tar -zcvf ../data/content.tar.gz ../www/wp-content/