-- Active: 1670837724115@@127.0.0.1@3306@laposte

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

DROP TABLE IF EXISTS difficulty;

CREATE TABLE difficulty (
    id int primary key NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL    
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO difficulty (name)

VALUES
 ('Débutant'),
  ('Intermédiaire'),
  ('Avancé');

DROP TABLE IF EXISTS tutorial;

CREATE TABLE tutorial (
    id int primary key NOT NULL AUTO_INCREMENT,
    theme_id int DEFAULT 1,
    difficulty_id int NOT NULL DEFAULT 1,
    title varchar(255) NOT NULL,    
    objective varchar(255) NOT NULL,
    description varchar(1000) NOT NULL,
    step LONGTEXT NOT NULL,    
    author varchar(255) NOT NULL,
    published BOOLEAN not NULL DEFAULT 0,
    creation_date DATETIME default NOW(),
    edition_date DATETIME default NOW(),
    FOREIGN KEY (theme_id) REFERENCES theme(id) ON DELETE CASCADE,
    FOREIGN KEY (difficulty_id) REFERENCES difficulty(id) ON DELETE SET DEFAULT
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO
  tutorial (theme_id, difficulty_id, title, objective, description, step, author, published)

VALUES
  (2, '1', 'test', 'migrate', '<p>test pour migrate</p>', '[{"id":1,"type":"editor","content":"<p>remplacmeent</p>"}]', 'admin', 0),
  (6, '1', 'Mails', 'creer sa boite mail', '<p>TEST</p>', '[{"id":1,"type":"editor","content":"<p>je test le migrate</p>"}]', 'admin', 0),
  (5, '2', 'quizz', 'reussir quiz', '<p>Quizz</p>', '[{"id":1,"type":"quiz","content":[{"id":1,"question":"qui est le plus beau","answers":[{"id":1,"text":"Leon","correct":true},{"id":2,"text":"Saak","correct":false},{"id":3,"text":"Leon","correct":false}]}]}]', 'admin', 0),
  (3, '1', 'Comment chercher une information ?', 'effectuer une recherche sur internet', '<p><strong>Internet : Un oc&eacute;an</strong></p>', '[{"id":1,"type":"editor","content":"<p><img style=\\"display: block; margin-left: auto; margin-right: auto;\\" src=\\"http://localhost:5000/images/fa8dad65-e93d-4110-87f2-00bb34b512e0internet.png\\" alt=\\"\\" width=\\"800\\" height=\\"254\\"></p>"},{"id":2,"type":"editor","content":"<p><img style=\\"display: block; margin-left: auto; margin-right: auto;\\" src=\\"http://localhost:5000/images/6e2de84e-be38-4cea-bd4d-ea4f3413ed70icones.png\\" alt=\\"\\" width=\\"900\\" height=\\"471\\"></p>"},{"id":3,"type":"quiz","content":[{"id":1,"question":" A votre avis, à quoi servent ces icones ?","answers":[{"id":1,"text":"Ouvrir des fichiers","correct":false},{"id":2,"text":"Aller sur Internet","correct":true},{"id":3,"text":"Je ne sais pas","correct":false}]}]}]', 'admin', 0),
  (2, '1', 'Charger un appareil', 'reussir a mettre un appareil en charge', '<h1 class="fr-view">Introduction</h1>', '[{"id":1,"type":"editor","content":"<p style=\\"text-align: center;\\"><strong>Les tablettes et smartphone fonctionnent avec une batterie...</strong><br><strong>Ce qui n&eacute;cessite de les charger r&eacute;guli&egrave;rement avec le courant electrique.</strong></p>"},{"id":2,"type":"editor","content":"<p><img style=\\"display: block; margin-left: auto; margin-right: auto;\\" src=\\"http://localhost:5000/images/cef604b2-4fd4-4a05-8555-1177793d12c3batt.png\\" alt=\\"\\" width=\\"512\\" height=\\"512\\"></p>"},{"id":3,"type":"editor","content":"<p><img style=\\"display: block; margin-left: auto; margin-right: auto;\\" src=\\"http://localhost:5000/images/2f98bc4d-b21d-4019-b867-8cc355e97289tablette.png\\" alt=\\"\\" width=\\"900\\" height=\\"433\\"></p>"},{"id":4,"type":"quiz","content":[{"id":1,"question":"Sur la tablette ci-dessus, ou se situe le \\"port de charge\\" ?","answers":[{"id":1,"text":"Réponse A","correct":true},{"id":2,"text":"Réponse B","correct":false},{"id":3,"text":"Réponse C","correct":false}]}]}]', 'admin', 0),
  (8, '3', 'Protéger ses proches', 'savoir lire une info', '<h2>La mauvaise ou fausse... nouvelle !</h2>', '[{"id":1,"type":"editor","content":"<p><img style=\\"display: block; margin-left: auto; margin-right: auto;\\" src=\\"http://localhost:5000/images/f57a30e4-6453-460c-addf-baa8741472e2secu.png\\" alt=\\"\\" width=\\"484\\" height=\\"394\\"></p>"},{"id":2,"type":"quiz","content":[{"id":1,"question":" A votre avis, quels sont les éléments qui font douter Anita ?","answers":[{"id":1,"text":"La source de l information","correct":false},{"id":2,"text":" Elle n a entendu personne en parler ","correct":false},{"id":3,"text":"La photo ne ressemble pas à une vraie photo","correct":false}]}]}]', 'admin', 0),
  (9, '1', 'Les gestes de manipulation', 'se deplacer sur son appareil', '<p>les Gestes utiles</p>', '[{"id":1,"type":"editor","content":"<p style=\\"text-align: center;\\"><strong>Geste 1 : Glisser de gauche &agrave; droite / swipe</strong></p>\\n<p><strong>Mais une partie de celui-ci ne vous est pas encore visible...&nbsp;</strong></p>\\n<p>Glissez votre doigt de droite &agrave; gauche sur l &eacute;cran, comme affich&eacute; ci-contre. Que voyez-vous ? Qu est-ce qui a chang&eacute; ? Qu est-ce qui n a pas chang&eacute; ?</p>\\n<p>R&eacute;p&eacute;tez l op&eacute;ration plusieurs fois, en alternant le sens droite-gauche/gauche-droite.</p>"},{"id":2,"type":"editor","content":"<p><img style=\\"display: block; margin-left: auto; margin-right: auto;\\" src=\\"http://localhost:5000/images/255c17b6-7d0d-4187-b77a-3886b4f40628slide.gif\\" alt=\\"\\" width=\\"416\\" height=\\"300\\"></p>"},{"id":3,"type":"editor","content":"<p style=\\"text-align: center;\\"><strong>Geste 2 : Cliquer</strong></p>\\n<p style=\\"text-align: center;\\"><strong>Pour actionner un bouton, ouvrir une application ou s&eacute;lectionner un emplacement pr&eacute;cis, on aura besoin de cliquer. Ceci se fait &agrave; l aide d une courte pression sur l &eacute;cran.</strong></p>\\n<p style=\\"text-align: center;\\"><strong><img src=\\"http://localhost:5000/images/aaf1f6d1-c4f7-479f-aeac-e52b92487f83cliquer.gif\\" alt=\\"\\" width=\\"325\\" height=\\"300\\"></strong></p>"}]', 'admin', 0),
  (6, '1', ' Introduction', 'repondre', '<p>&nbsp;Introduction</p>', '[{"id":1,"type":"editor","content":"<p><img style=\\"display: block; margin-left: auto; margin-right: auto;\\" src=\\"http://localhost:5001/images/2b582137-2a72-48de-8a48-3a55a1067e81mail.png\\" alt=\\"\\" width=\\"900\\" height=\\"503\\"></p>"},{"id":2,"type":"quiz","content":[{"id":1,"question":"Avez-vous une boîte mail ?","answers":[{"id":1,"text":"Oui","correct":false},{"id":2,"text":"Non","correct":true}]}]}]', 'admin', 0),
  (3, '2', 'Comment chercher une information ? Suite', 'reussir les exercices', '<p><strong>Internet : Un oc&eacute;an d informations&nbsp;</strong></p>', '[{"id":1,"type":"editor","content":"<p style=\\"text-align: center;\\">Thomas cherche des chansons de C&eacute;line Dion.&nbsp;</p>"},{"id":2,"type":"quiz","content":[{"id":1,"question":"Quels sont les mots-clés qu il devra utiliser pour faire sa recherche ?","answers":[{"id":1,"text":"Cherche des chansons de Céline Dion","correct":false},{"id":2,"text":"Céline Dion","correct":false},{"id":3,"text":"Chansons Céline Dion","correct":true}]}]},{"id":3,"type":"editor","content":"<p>In&egrave;s cherche une poussette deux places pour ses enfants. Dans la barre de recherche, elle tape les mots-cl&eacute;s suivants : Je cherche une poussette pour mes deux enfants.</p>\\n<p><img src=\\"http://localhost:5001/images/c4df3686-235b-484c-99e1-453a47981f71fp.png\\" alt=\\"\\" width=\\"852\\" height=\\"94\\"></p>\\n<p>&nbsp;</p>"},{"id":4,"type":"quiz","content":[{"id":1,"question":" Inès a t-elle choisi les bons mots-clés ?","answers":[{"id":1,"text":"Oui","correct":false},{"id":2,"text":"Non","correct":true}]}]}]', 'admin', 0),
  (3, '1', 'se déplacer sur internet', 'répondre au question', '<p>Introduction</p>', '[{"id":1,"type":"editor","content":"<p style=\\"text-align: center;\\">Mobilit&eacute; et num&eacute;rique&nbsp;<strong>quel rapport ?&nbsp;</strong>&Ecirc;tes-vous pr&ecirc;t(e) &agrave; le d&eacute;couvrir ?</p>\\n<p style=\\"text-align: center;\\"><img src=\\"http://localhost:5000/images/61da11ce-a888-4a2a-a3a9-cb1c22d98b8cchien.png\\" alt=\\"\\" width=\\"700\\" height=\\"467\\"></p>"},{"id":2,"type":"quiz","content":[{"id":1,"question":" Consulter les horaires de bus","answers":[{"id":1,"text":"Oui","correct":true},{"id":2,"text":"Non","correct":false}]},{"id":2,"question":"Louer une voiture","answers":[{"id":1,"text":"Oui","correct":true},{"id":2,"text":"Non","correct":false}]},{"id":3,"question":"Prendre un abonnement bus, metro,tramway,velo","answers":[{"id":1,"text":"Oui","correct":true},{"id":2,"text":"Non","correct":false}]},{"id":4,"question":"Faire le plein d essence","answers":[{"id":1,"text":"Oui","correct":false},{"id":2,"text":"Non","correct":true}]},{"id":5,"question":"changer le pneu de son vélo","answers":[{"id":1,"text":"Oui","correct":false},{"id":2,"text":"Non","correct":true}]}]}]', 'admin', 0),
  (4, '2', 'Découvrir le cheque energie', 'reussir', '<p>Cheque energie</p>', '[{"id":1,"type":"editor","content":"<p><img style=\\"display: block; margin-left: auto; margin-right: auto;\\" src=\\"http://localhost:5000/images/5e592599-1f00-4a75-97ef-3367ae563a4bcheque.png\\" alt=\\"\\" width=\\"700\\" height=\\"438\\"></p>"},{"id":2,"type":"quiz","content":[{"id":1,"question":" Est-ce que vous connaissez le chèque énergie ?","answers":[{"id":1,"text":"Oui, mais je ne sais pas l utiliser","correct":false},{"id":2,"text":"Oui, je l ai déjà utilisé ","correct":false},{"id":3,"text":"Non, c est pour ça que je suis ici","correct":true}]},{"id":2,"question":" A votre avis, qu est-ce que le chèque énergie ?","answers":[{"id":1,"text":"Un bon de réduction mis en place par les fournisseurs d énergie","correct":false},{"id":2,"text":"Une déduction d impôts","correct":false},{"id":3,"text":"Une aide de l Etat pour payer sa facture d énergie ","correct":true},{"id":4,"text":"Je ne sais pas","correct":false}]},{"id":3,"question":"Qui a le droit au chèque énergie ?","answers":[{"id":1,"text":"Tout le monde","correct":false},{"id":2,"text":"Uniquement les locataires d appartement","correct":false},{"id":3,"text":"Toute personne déclarée avec un revenu fiscal inférieur à 10 800€","correct":true}]},{"id":4,"question":"A votre avis, que faut-il faire pour obtenir le chèque énergie ? ","answers":[{"id":1,"text":"Remplir un formulaire de demande chaque année","correct":false},{"id":2,"text":" Pas de démarche, le chèque est envoyé automatiquement chaque année","correct":true},{"id":3,"text":"Prendre rendez-vous sur internet avec un conseiller spécialisé","correct":false}]}]}]', 'admin', 0),
  (4, '1', 'video', 'test url', '<p>a voir</p>', '[{"id":1,"type":"editor","content":"<p><iframe src=\\"https://www.youtube.com/embed/-j8TMdLAAmc\\" width=\\"560\\" height=\\"314\\" allowfullscreen=\\"allowfullscreen\\"></iframe></p>"}]', 'admin', 0);

DROP TABLE IF EXISTS hashtag;

CREATE TABLE hashtag (
    id int primary key NOT NULL AUTO_INCREMENT,
    text varchar(255) NOT NULL    
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO hashtag (text)
VALUES

 ('phone'),('internet'),('login'),('telephone'),('chargeur'),('appareil'),('batterie'),('electrique'),('prise'),('chargement'),('charge'),('rechargement'),('recherche'),('navigateur'),('web'),('information'),('mail'),('email'),('adresse'),('boite'),('creer'),('creation'),('proteger'),('securite'),('fausse'),('proche'),('mots'),('cle'),('utiliser'),('itineraire'),('cheque'),('energie'),('etat'),('aide');


DROP TABLE IF EXISTS tuto_hashtag;

CREATE TABLE tuto_hashtag (
    tutorial_id INTEGER REFERENCES tutorial (id) ON DELETE CASCADE,
    hashtag_id INTEGER REFERENCES hashtag (id) ON DELETE CASCADE,
    PRIMARY KEY (tutorial_id, hashtag_id)  
) ;

INSERT INTO tuto_hashtag (tutorial_id, hashtag_id)
VALUES
 (1,1),(1,2),(2,2),(2,7),(2,8),(3,15),(4,2),(4,13),(4,14),(5,5),(5,10),(5,11),(5,12),(5,9),(5,8),(5,7),(5,6);


DROP TABLE IF EXISTS user_journey;

CREATE TABLE user_journey (
    user_id INTEGER REFERENCES user (id) ON DELETE CASCADE,
    tutorial_id INTEGER REFERENCES tutorial (id) ON DELETE CASCADE,
    rating INTEGER,
    comment varchar(255),
    PRIMARY KEY (user_id, tutorial_id)
);


