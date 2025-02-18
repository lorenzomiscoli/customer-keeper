CREATE TABLE customer (
  id SERIAL PRIMARY KEY, 
  name varchar(75) NOT NULL,
  logo bytea,
  email varchar(50),
  phone varchar(25),
  created_date timestamp with time zone NOT NULL,
  updated_date timestamp with time zone NOT NULL
);

CREATE TABLE user_account (
  id SERIAL PRIMARY KEY, 
  username varchar(150) NOT NULL, 
  password varchar(250) NOT NULL, 
  name varchar(75), 
  lastname varchar(75), 
  email varchar(50)
);

INSERT INTO user_account (username, password) 
VALUES 
  (
    'admin', '$2a$10$YVTTaqhy6SSFzg0N.aTgKeQwv3PRQQ9pgkoZB8xrttcs1LcsJYLh.'
  )