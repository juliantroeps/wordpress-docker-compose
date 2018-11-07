#!/bin/bash
exportfiles=${1-false}

docker-compose exec database sh -c 'exec mysqldump "$MYSQL_DATABASE" -uroot -p"$MYSQL_ROOT_PASSWORD"' > ../data/database.sql
if  ["$exportfiles" = true] ; then
   tar -zcvf ../data/files.tar.gz ../www/wp-content/
   echo "Database and files exported 🚀"
else
    echo "Database exported 🚀"
fi
