
DROP TABLE IF EXISTS user;
CREATE TABLE user (
    id int primary key NOT NULL AUTO_INCREMENT,
    firstname varchar(255) NOT NULL,
    lastname varchar(255) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    hashedPassword varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS theme;

CREATE TABLE theme (
    id int primary key NOT NULL AUTO_INCREMENT,
    themeName varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO
  theme (themeName)
VALUES
  (
    'Utiliser ligne bleue'    
  ),
  (
    'Utiliser mon téléphone'    
  ),
  (
    'Aller sur internet'    
  ),
  (
    'Vie Courante'    
  ),
  (
   'Me divertir'   
  ),
  (
     'Mes mails'   
  ),
   (
   'Me divertir'   
  ),
   (
   'Communiquer'    
  ),
   (
   'Utiliser mon téléphone en sécurité'    
  ),
   (
    'Se déplacer'   
  ),
  ( 'Se faire aider');

DROP TABLE IF EXISTS tutorial;

CREATE TABLE tutorial (
    id int primary key NOT NULL AUTO_INCREMENT,
    themeID int NOT NULL,
    difficulty varchar(255) NOT NULL,
    title varchar(255) NOT NULL,
    objective varchar(1000) NOT NULL,
    content LONGTEXT NOT NULL,
    hashtag varchar(255) NOT NULL,
    author varchar(255) NOT NULL,
    FOREIGN KEY (themeID) REFERENCES theme(id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;


