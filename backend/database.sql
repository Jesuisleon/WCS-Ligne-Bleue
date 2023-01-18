-- Active: 1667382451940@@127.0.0.1@3306@laposte

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
  ('Romain','Timmer', 'timmer@gmail.com', '$argon2id$v=19$m=65536,t=3,p=1$IiwgyuOQ6m8uekQH4Tz/Qg$GQr4Y1wC/2BXn2TF/qPApUxqU7pZxXao7AXgu1wX5kk',1),
  ('Rémy', 'Bernardin', 'bernardin@gmail.com', '$argon2id$v=19$m=65536,t=3,p=1$W5LUI7siqBwBAVUpolk+sw$v6rdgSw0Y8by65NXjMB3HIxDAULTuKd98+2Xw/+3SUw',0),
  ('Lucas' ,'Fasilleau', 'fasilleau@gmail.com', '$argon2id$v=19$m=65536,t=3,p=1$1t06KFrossBRrBAGepe9uQ$h3qFJ46mWsgcrJ+y7WhrVd4RLqhGVZ1PafAtoouTmxk',0),
  ('Léon','Versavel', 'versavel@gmail.com', '$argon2id$v=19$m=65536,t=3,p=1$dvW02UvenzYp2hVvtviP6w$gp1lRRDpVUZBe91mvB/bgbRqtxY6dGSA37J93opOkCQ',0);

DROP TABLE IF EXISTS theme;

CREATE TABLE theme (
    id int primary key NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    icon varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO theme (name, icon)

VALUES
 ('Utiliser ligne bleue', '/image/telephone.png'),
  ('Utiliser mon téléphone', '/image/phone3.gif'),
  ('Aller sur internet', '/image/internet.gif'),
  ('Vie Courante', '/image/vie_courante.png'),
  ('Me divertir', '/image/divertir.png'),
  ('Mes mails', '/image/mail3.gif'),   
  ('Communiquer', '/image/communiquer.png'),
  ('Utiliser mon téléphone en sécurité', '/image/securite.gif'),
  ('Se déplacer', '/image/deplacer.gif'),
  ('Se faire aider', '/image/aide.gif');


DROP TABLE IF EXISTS tutorial;

CREATE TABLE tutorial (
    id int primary key NOT NULL AUTO_INCREMENT,
    theme_id int NOT NULL,
    difficulty varchar(255) NOT NULL,
    title varchar(255) NOT NULL,    
    objective varchar(255) NOT NULL,
    description varchar(1000) NOT NULL,
    step LONGTEXT NOT NULL,    
    author varchar(255) NOT NULL,
    online BOOLEAN not NULL DEFAULT 0,
    creation_date DATETIME default NOW(),
    edition_date DATETIME default NOW(),
    FOREIGN KEY (theme_id) REFERENCES theme(id) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO
  tutorial (theme_id, difficulty, title, objective, description, step, author, online)

VALUES
  (2,'débutant', 'Step 1dsqddsq', 'lunedsqddsq', '<p>This is step 1dsqd</p>', '[{"step":1,"text":"Voici du contenu pour la main data","content":"<p>DSQDSQDdsqd</p>"}]{"step":"2","quiz":[{"id":1,"question":"Quelle est la capitale de la France?","answers":[{"id":1,"text":"Londres","correct":false},{"id":2,"text":"Paris","correct":false},{"id":3,"text":"Berlin","correct":true},{"id":4,"text":"New York","correct":false}]},{"id":2,"question":"Combien y a-t-il de jours dans une année?","answers":[{"id":1,"text":"365","correct":true},{"id":2,"text":"366","correct":false},{"id":3,"text":"364","correct":false},{"id":4,"text":"360","correct":false}]}]}', 'Michel', 1),
  (6, '1', 'Mails', 'creer sa boite mail', '<p>TEST</p>', '[{"id":1,"type":"editor","content":"<p>je test le migrate</p>"}]', 'admin', 0);


DROP TABLE IF EXISTS hashtag;

CREATE TABLE hashtag (
    id int primary key NOT NULL AUTO_INCREMENT,
    text varchar(255) NOT NULL    
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO hashtag (text)
VALUES
 ('phone'),('internet'),('login'),('telephone'),('chargeur'),('appareil'),('batterie'),('electrique'),('prise'),('chargement'),('charge'),('rechargement');

DROP TABLE IF EXISTS tuto_hashtag;

CREATE TABLE tuto_hashtag (
    tutorial_id INTEGER REFERENCES tutorial (id) ON DELETE CASCADE,
    hashtag_id INTEGER REFERENCES hashtag (id) ON DELETE CASCADE,
    PRIMARY KEY (tutorial_id, hashtag_id)  
) ;

INSERT INTO tuto_hashtag (tutorial_id, hashtag_id)
VALUES
 (1,1),(1,2);


DROP TABLE IF EXISTS user_journey;

CREATE TABLE user_journey (
    user_id INTEGER REFERENCES user (id) ON DELETE CASCADE,
    tutorial_id INTEGER REFERENCES tutorial (id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, tutorial_id)
);


