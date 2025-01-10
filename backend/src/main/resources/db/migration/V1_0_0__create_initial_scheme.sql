CREATE TABLE customer (
  id SERIAL PRIMARY KEY, 
  name varchar(250) NOT NULL,
  logo bytea,
  created_date timestamp with time zone NOT NULL,
  updated_date timestamp with time zone NOT NULL
);