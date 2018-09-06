FROM postgres

RUN apt-get update
RUN apt-get install -yqq curl

COPY ./create.postgres.sh /
COPY ./wait-for-it.sh /
COPY ./cc.dump /
RUN chmod +x /wait-for-it.sh

ENTRYPOINT ["/wait-for-it.sh", "postgresdb:5432", "--"]

CMD bash create.postgres.sh
