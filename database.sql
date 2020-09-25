CREATE DATABASE todoapp;

CREATE TABLE todos(
  todo_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  todo VARCHAR(255) NOT NULL,
  date_created VARCHAR(255) NOT NULL,
  due_date VARCHAR(255) NOT NULL,
  due_time VARCHAR(255) NOT NULL,
  is_done BOOLEAN NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE users(
  id BIGSERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  UNIQUE (email)
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
CREATE INDEX "IDX_session_expire" ON "session" ("expire");