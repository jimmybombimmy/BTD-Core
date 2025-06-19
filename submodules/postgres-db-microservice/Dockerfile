FROM postgres:16-alpine

WORKDIR /var/liv/postgresql

COPY . .

COPY setup.sql /docker-entrypoint-initdb.d/setup.sql
RUN bash -c "psql -U btd-local -a -f setup.sql"

EXPOSE 5432

CMD ["postgres"]