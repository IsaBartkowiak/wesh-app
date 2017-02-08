Doodle node + angular
===================

Redesign of the website doodle. APIs made with node + express + postgresql + sequelize.

###Installation

 - Installer git
 - Installer node
 - Installer postgresql et pgAdmin
 - Créer la BD events et faire un utilisateur
 
`npm install`
`bower install`

**Faire ce fichier :**
server/config/config.json

```json
{
  "development": {
    "username": "nom util BD",
    "password": "Mot de passe Utilisateur",
    "database": "events",
    "host": "localhost",
    "port": "5432",
    "dialect": "postgres"
  }
}
```

###Lancer le server
Dans le terminal (à la racine du projet)
`nodemon ./server/bin/www` 





