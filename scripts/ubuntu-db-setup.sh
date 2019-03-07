#!/bin/bash

if [ "$EUID" -ne 0 ]
  then echo "error: must run script as root"
  exit
fi

echo installing MySQL server automatically
DEBIAN_FRONTEND=noninteractive apt install mysql-server

# TODO: set `root` password

echo setting up database
mysql -Bse "CREATE DATABASE IF NOT EXISTS \`tbtogetherdb\`; USE \`tbtogetherdb\`;"
mysql tbtogetherdb < TbTogetherDB.sql

echo done
