CREATE DATABASE chat;

USE chat;

CREATE TABLE IF NOT EXISTS Users (
  id int(5) NOT NULL AUTO_INCREMENT,
  username varchar(250) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Messages (
  id int(5) NOT NULL AUTO_INCREMENT,
  message text NOT NULL,
  roomname varchar(250) NULL,
  user_id int(5) NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (user_id) REFERENCES Users (id)
);

/* Create other tables and define schemas for them here! */



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

