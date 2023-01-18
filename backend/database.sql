-- Active: 1667382451940@@127.0.0.1@3306@mvc_express

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
  tutorial (theme_id, difficulty, title, objective, description,step,author,online)
VALUES
  (2,'débutant', 'Step 1dsqddsq', 'lunedsqddsq','<p>This is step 1dsqd</p>','[{"step":1,"text":"Voici du contenu pour la main data","content":"<p>DSQDSQDdsqd</p>"}]{"step":"2","quiz":[{"id":1,"question":"Quelle est la capitale de la France?","answers":[{"id":1,"text":"Londres","correct":false},{"id":2,"text":"Paris","correct":false},{"id":3,"text":"Berlin","correct":true},{"id":4,"text":"New York","correct":false}]},{"id":2,"question":"Combien y a-t-il de jours dans une année?","answers":[{"id":1,"text":"365","correct":true},{"id":2,"text":"366","correct":false},{"id":3,"text":"364","correct":false},{"id":4,"text":"360","correct":false}]}]}','Michel',1),
  (3,'1', 'trouver un navigateur', 'test', '<p>juste un test</p>', '[{"id":1,"type":"quiz","content":[{"id":1,"question":"qui est le plus beau","answers":[{"id":1,"text":"Leon","correct":false},{"id":2,"text":"Leon","correct":true},{"id":3,"text":"Leon","correct":false}]}]},{"id":2,"type":"editor","content":"<p>blalbalalab</p>"}]', 'admin', 0 ),
  (2, '1', 'Charger un appareil', 'réussir a charger son téléphone', '<p><strong>Les tablettes et smartphone fonctionnent avec une batterie...</strong><br><strong>Ce qui n&eacute;cessite de les charger r&eacute;guli&egrave;rement avec le courant &eacute;lectrique.</strong></p>', '[{"id":1,"type":"editor","content":"<p><img src=\"http://localhost:5000/images/fe50e0f3-1d5c-431c-af50-a451d45bb8aacarburant_batterie.png\" alt=\"\" width=\"512\" height=\"512\"><img style=\"float: right;\" src=\"http://localhost:5000/images/0d87eb61-393a-4783-8a5b-1f9a6ee29648batt.png\" alt=\"\" width=\"512\" height=\"512\"></p>"},{"id":2,"type":"editor","content":"<p><span style=\"color: rgb(224, 62, 45);\">Une voiture a besoin qu on <strong>remplisse</strong> son <strong>réservoir</strong> de <strong>carburant</strong>...         </span>      ...Un appareil a besoin qu on <strong>charge</strong> sa <strong>batterie</strong> avec de <strong>l électricité</strong>.</p>"},{"id":3,"type":"editor","content":"<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"http://localhost:5000/images/78b7c3bd-6559-481c-94a5-d86d6dd99d90tablette.png\" alt=\"\" width=\"1000\" height=\"482\"></p>"},{"id":4,"type":"quiz","content":[{"id":1,"question":" Sur la tablette ci-dessus, où se situe le \"port de charge\" ?","answers":[{"id":1,"text":"Réponse A","correct":true},{"id":2,"text":"Réponse B","correct":false},{"id":3,"text":"Réponse C","correct":false}]}]}]', 'admin', 0 ),
  (3, '1', 'Comment naviguer sur Internet ? (1)', 'aller sur internet', '<p><strong>Internet : Un oc&eacute;an d informations&nbsp;</strong></p>', '[{"id":1,"type":"editor","content":"<p style=\"text-align: center;\"><strong>Avant, il fallait se d&eacute;placer pour trouver une information. Aujourd hui, avec internet, il suffit d &eacute;crire sa recherche pour trouver rapidement l information dont vous avez besoin.&nbsp;</strong></p>\n<p style=\"text-align: center;\">&nbsp;</p>\n<p style=\"text-align: center;\"><strong><img src=\"http://localhost:5000/images/ac2b2636-b2ef-4bdb-9285-972703ac9af2internet.png\" alt=\"\" width=\"1051\" height=\"334\"></strong></p>"},{"id":2,"type":"editor","content":"<p style=\"text-align: center;\">Pour aller sur Internet il faut avoir :&nbsp;</p>\n<ol>\n<li style=\"list-style-type: none;\">\n<ol>\n<li style=\"list-style-type: none;\">\n<ol>\n<li style=\"list-style-type: none;\">\n<ol>\n<li style=\"list-style-type: none;\">\n<ol>\n<li style=\"list-style-type: none;\">\n<ol>\n<li style=\"list-style-type: none;\">\n<ol>\n<li style=\"list-style-type: none;\">\n<ol>\n<li style=\"list-style-type: none;\">\n<ol>\n<li style=\"list-style-type: none;\">\n<ol>\n<li style=\"list-style-type: none;\">\n<ol>\n<li style=\"list-style-type: none;\">\n<ol>\n<li>Un&nbsp;<strong>appareil compatible&nbsp;</strong>(un ordinateur, un smartphone ou une tablette).</li>\n<li>Une&nbsp;<strong>connexion</strong>&nbsp;: un abonnement, des recharges Internet ou un lieu qui diffuse de l Internet.</li>\n<li>&Ecirc;tre &agrave; proximit&eacute;&nbsp;<strong>d une installation</strong>&nbsp;(exemple : antenne relais) qui diffuse de l Internet.&nbsp;</li>\n</ol>\n</li>\n</ol>\n</li>\n</ol>\n</li>\n</ol>\n</li>\n</ol>\n</li>\n</ol>\n</li>\n</ol>\n</li>\n</ol>\n</li>\n</ol>\n</li>\n</ol>\n</li>\n</ol>\n</li>\n</ol>"},{"id":3,"type":"editor","content":"<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"http://localhost:5000/images/fc35b32e-5f53-4d4e-95e8-fd8660e4fd18icones.png\" alt=\"\" width=\"900\" height=\"471\"></p>"},{"id":4,"type":"quiz","content":[{"id":1,"question":"A votre avis, à quoi servent ces icônes ?","answers":[{"id":1,"text":"Ouvrir des fichiers","correct":false},{"id":2,"text":"Aller sur Internet","correct":true},{"id":3,"text":"Je ne sais pas","correct":false}]}]},{"id":5,"type":"editor","content":"<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"http://localhost:5000/images/ee263819-8be2-4641-bd0a-4a4c7c79c210V0res.png\" alt=\"\" width=\"900\" height=\"471\"></p>"}]', 'admin', 0),
  (6, '3', 'Comment choisir et créer une b', 'créer sa boite mail', '<p>Test sans hastag pour voir si ca crash ou pas</p>', '[{"id":1,"type":"editor","content":"<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"http://localhost:5000/images/ce74ce17-27b5-4f9c-9ac3-6be8ea35d2d6mail.png\" alt=\"\" width=\"900\" height=\"503\"></p>"},{"id":2,"type":"quiz","content":[{"id":1,"question":"Avez-vous une boîte mail ?","answers":[{"id":1,"text":"Oui","correct":false},{"id":2,"text":"Non","correct":true}]}]}]', 'admin', 0 );





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


