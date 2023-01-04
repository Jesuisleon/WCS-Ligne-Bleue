DROP TABLE IF EXISTS user;
CREATE TABLE user (
    id int primary key NOT NULL AUTO_INCREMENT,
    firstname varchar(255) NOT NULL,
    lastname varchar(255) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    hashedPassword varchar(255) NOT NULL,
    admin BOOLEAN NOT NULL DEFAULT 0
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO
  user (firstname, lastname, email, hashedPassword, admin)
VALUES
  ('admin','admin', 'adminlaposte@gmail.com', '$argon2id$v=19$m=65536,t=3,p=1$CIEbKZNo6pCTTsu8tgQU2Q$T4Iidc3Kbnksn02Q6C2v+NF+8590r4UcHAhckpBll/Q',1),
  ('Romain','Timmer', 'timmer@gmail.com', '$argon2id$v=19$m=65536,t=3,p=1$IiwgyuOQ6m8uekQH4Tz/Qg$GQr4Y1wC/2BXn2TF/qPApUxqU7pZxXao7AXgu1wX5kk',0),
  ('Rémy', 'Bernardin', 'bernardin@gmail.com', '$argon2id$v=19$m=65536,t=3,p=1$W5LUI7siqBwBAVUpolk+sw$v6rdgSw0Y8by65NXjMB3HIxDAULTuKd98+2Xw/+3SUw',0),
  ('Lucas' ,'Fasilleau', 'fasilleau@gmail.com', '$argon2id$v=19$m=65536,t=3,p=1$1t06KFrossBRrBAGepe9uQ$h3qFJ46mWsgcrJ+y7WhrVd4RLqhGVZ1PafAtoouTmxk',0),
  ('Léon','Versavel', 'versavel@gmail.com', '$argon2id$v=19$m=65536,t=3,p=1$dvW02UvenzYp2hVvtviP6w$gp1lRRDpVUZBe91mvB/bgbRqtxY6dGSA37J93opOkCQ',0);

DROP TABLE IF EXISTS theme;

CREATE TABLE theme (
    id int primary key NOT NULL AUTO_INCREMENT,
    themeName varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO theme (themeName)
VALUES
  ('Utiliser ligne bleue'),
  ('Utiliser mon téléphone'),
  ('Aller sur internet'),
  ('Vie Courante'),
  ('Me divertir'),
  ('Mes mails'),
  ('Communiquer'),
  ('Utiliser mon téléphone en sécurité'),
  ('Se déplacer'),
  ('Se faire aider');

DROP TABLE IF EXISTS tutorial;

CREATE TABLE tutorial (
    id int primary key NOT NULL AUTO_INCREMENT,
    themeID int NOT NULL,
    difficulty varchar(255) NOT NULL,
    title varchar(255) NOT NULL,    
    objective varchar(255) NOT NULL,
    description varchar(1000) NOT NULL,
    content LONGTEXT NOT NULL,
    hashtag varchar(255) NOT NULL,
    author varchar(255) NOT NULL,
    creation_date DATETIME default NOW(),
    edition_date DATETIME default NOW(),
    FOREIGN KEY (themeID) REFERENCES theme(id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
