
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
    themeName varchar(255) NOT NULL

) ENGINE = InnoDB DEFAULT CHARSET = utf8;

ALTER TABLE theme ADD icon varchar(255);


INSERT INTO theme (themeName, icon)
VALUES
 ('Utiliser ligne bleue', '/image/telephone.png'),
  ('Utiliser mon téléphone', '/image/phone3.gif'),
  ('Aller sur internet', '/image/internet.gif'),
  ('Vie Courante', '/image/telephone.png'),
  ('Me divertir', '/image/telephone.png'),
  ('Mes mails', '/image/mail3.gif'),   
  ('Communiquer', '/image/telephone.png'),
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
    hashtag varchar(255) NOT NULL,
    author varchar(255) NOT NULL,
    online BOOLEAN not NULL DEFAULT 0,
    creation_date DATETIME default NOW(),
    edition_date DATETIME default NOW(),

    FOREIGN KEY (theme_id) REFERENCES theme(id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO
  tutorial (theme_id, difficulty, title, objective, description,step,hashtag,author,online)
VALUES
  (2,'débutant', 'Step 1dsqddsq', 'lunedsqddsq','<p>This is step 1dsqd</p>','[{"step":1,"text":"Voici du contenu pour la main data","content":"<p>DSQDSQDdsqd</p>"}]{"step":"2","quiz":[{"id":1,"question":"Quelle est la capitale de la France?","answers":[{"id":1,"text":"Londres","correct":false},{"id":2,"text":"Paris","correct":false},{"id":3,"text":"Berlin","correct":true},{"id":4,"text":"New York","correct":false}]},{"id":2,"question":"Combien y a-t-il de jours dans une année?","answers":[{"id":1,"text":"365","correct":true},{"id":2,"text":"366","correct":false},{"id":3,"text":"364","correct":false},{"id":4,"text":"360","correct":false}]}]}','dsqddsqd','Michel',1);


DROP TABLE IF EXISTS user_journey;

CREATE TABLE user_journey (
    id_user INTEGER REFERENCES user (id) ON DELETE CASCADE,
    id_tutorial INTEGER REFERENCES user (id) ON DELETE CASCADE,
    PRIMARY KEY (id_user, id_tutorial)
);


