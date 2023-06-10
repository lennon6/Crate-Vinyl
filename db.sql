-- boilerplate for sql data table
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE TABLE users (
    "_id" serial NOT NULL,
    "username" varchar NOT NULL,
    "password" varchar NOT NULL,
    CONSTRAINT "user_pk" PRIMARY KEY("_id")
)

CREATE TABLE favorites (
    "_id" serial NOT NULL,
    "master_id" int NOT NULL,
    "artist" varchar,
    "release_title" varchar,
    "image_url" varchar,
    "user_id" int NOT NULL,
    CONSTRAINT "favorites_pk" PRIMARY KEY("_id"),
    CONSTRAINT "users_fk" FOREIGN KEY ("user_id") REFERENCES users ("_id")
)

CREATE TABLE reviews (
    "_id" serial NOT NULL,
    "master_id" int NOT NULL,
    "comment" varchar NOT NULL,
    CONSTRAINT "reviews_pk" PRIMARY KEY("_id")
)