CREATE TABLE customer (
  id SERIAL PRIMARY KEY, 
  name varchar(75) NOT NULL,
  logo bytea,
  email varchar(50),
  phone varchar(25),
  created_date timestamp with time zone NOT NULL,
  updated_date timestamp with time zone NOT NULL
);