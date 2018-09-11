#!/bin/bash

DATABASE_NAME="test"
# DB_DUMP_LOCATION="./populate.postgres.sql"

echo "*** CREATING DATABASE ***"

psql -h postgresdb-test -U postgres -q <<EOSQL
    CREATE DATABASE "$DATABASE_NAME";
    GRANT ALL PRIVILEGES ON DATABASE "$DATABASE_NAME" TO postgres;
    CREATE ROLE pguser WITH LOGIN PASSWORD 'pguser';
    GRANT ALL PRIVILEGES ON DATABASE "$DATABASE_NAME" TO pguser;
EOSQL

echo "*** DATABASE CREATED ***"

echo "*** POPULATING DATABASE"

psql -h postgresdb-test -U postgres "$DATABASE_NAME" < cc.dump

echo "**** DATABASE POPULATED"

