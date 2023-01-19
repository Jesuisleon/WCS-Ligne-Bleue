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
  (2, '1', 'test', 'migrate', '<p>test pour migrate</p>', '[{"id":1,"type":"editor","content":"<p>remplacmeent</p>"}]', 'admin', 0),
  (6, '1', 'Mails', 'creer sa boite mail', '<p>TEST</p>', '[{"id":1,"type":"editor","content":"<p>je test le migrate</p>"}]', 'admin', 0),
  (5, '2', 'quizz', 'reussir quiz', '<p>Quizz</p>', '[{"id":1,"type":"quiz","content":[{"id":1,"question":"qui est le plus beau","answers":[{"id":1,"text":"Leon","correct":true},{"id":2,"text":"Saak","correct":false},{"id":3,"text":"Leon","correct":false}]}]}]', 'admin', 0),
  (3, '1', 'Comment chercher une information ?', 'effectuer une recherche sur internet', '<p><strong>Internet : Un oc&eacute;an</strong></p>', '[{"id":1,"type":"editor","content":"<p><img style=\\"display: block; margin-left: auto; margin-right: auto;\\" src=\\"http://localhost:5000/images/fa8dad65-e93d-4110-87f2-00bb34b512e0internet.png\\" alt=\\"\\" width=\\"800\\" height=\\"254\\"></p>"},{"id":2,"type":"editor","content":"<p><img style=\\"display: block; margin-left: auto; margin-right: auto;\\" src=\\"http://localhost:5000/images/6e2de84e-be38-4cea-bd4d-ea4f3413ed70icones.png\\" alt=\\"\\" width=\\"900\\" height=\\"471\\"></p>"},{"id":3,"type":"quiz","content":[{"id":1,"question":" A votre avis, à quoi servent ces icones ?","answers":[{"id":1,"text":"Ouvrir des fichiers","correct":false},{"id":2,"text":"Aller sur Internet","correct":true},{"id":3,"text":"Je ne sais pas","correct":false}]}]}]', 'admin', 0),
  (2, '1', 'Charger un appareil', 'reussir a mettre un appareil en charge', '<h1 class="fr-view">Introduction</h1>', '[{"id":1,"type":"editor","content":"<p style=\\"text-align: center;\\"><strong>Les tablettes et smartphone fonctionnent avec une batterie...</strong><br><strong>Ce qui n&eacute;cessite de les charger r&eacute;guli&egrave;rement avec le courant electrique.</strong></p>"},{"id":2,"type":"editor","content":"<p><img style=\\"display: block; margin-left: auto; margin-right: auto;\\" src=\\"http://localhost:5000/images/cef604b2-4fd4-4a05-8555-1177793d12c3batt.png\\" alt=\\"\\" width=\\"512\\" height=\\"512\\"></p>"},{"id":3,"type":"editor","content":"<p><img style=\\"display: block; margin-left: auto; margin-right: auto;\\" src=\\"http://localhost:5000/images/2f98bc4d-b21d-4019-b867-8cc355e97289tablette.png\\" alt=\\"\\" width=\\"900\\" height=\\"433\\"></p>"},{"id":4,"type":"quiz","content":[{"id":1,"question":"Sur la tablette ci-dessus, ou se situe le \\"port de charge\\" ?","answers":[{"id":1,"text":"Réponse A","correct":true},{"id":2,"text":"Réponse B","correct":false},{"id":3,"text":"Réponse C","correct":false}]}]}]', 'admin', 0);


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


