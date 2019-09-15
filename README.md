![yrexpert_logo.png](./images/yrexpert_logo.png)

[![npm package](https://nodei.co/npm/yrexpert-js.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/yrexpert-js/)

[![npm version][npm-image]][npm-url]
[![npm license][license-image]][npm-url]
[![npm downloads][downloads-image]][downloads-url]
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# Interface Web pour votre système expert...
Cette arborescence fournit une interface Web et les outils que vous aurez besoin pour votre système expert. Elle est maintenue par [https://www.yrelay.fr/](https://www.yrelay.fr/) et diffusée sous licence libre. Cette version comprend des contributions communautaires libres acceptées par [https://www.yrelay.fr/](https://www.yrelay.fr/).

**Disclaimer :** YRexpert est encore en développement et son interface peut changer dans les futures versions. Utilisez cette production à vos propres risques.

Ce dépot est fortement inspiré de l'application [EWD.js](http://www.mgateway.com/) de Rob Tweed (Merci).

## 1. Construire le conteneur *yrexpert-js-srv*
1) Préparer le répertoire d'accueil de vos images et vos contenurs Docker (facultatif)

Par défaut, Docker utilisara */var/lib/docker* pour installer les conteneurs et les images. Pour ne pas saturer votre répertoire */var* vous pouvez déplacer ce réperoire.

*A faire avant d'installer Docker.* Utilisez un lien symbolique pour définir le nouvel emplacement. Par exemple, pour définir le nouvel emplacement sur */opt/docker*, exécutez les commandes suivantes :
````shell
$ sudo mkdir /opt/docker
$ sudo ln -s /opt/docker /var/lib/docker
````

2) Installer Docker (sauf si déjà installé)
````shell
$ curl -sSL https://get.docker.com | sh
````
Pour éviter d'utiliser *sudo* lors de l'exécution des commandes *docker* :
````shell
$ sudo usermod -aG docker ${USER}
$ su - ${USER}
````

**Note :** Il vous sera demandé de saisir votre mot de passe Linux

3) Construire le conteneur
````shell
$ mkdir /tmp/yrelay
$ cd /tmp/yrelay
$ git clone https://github.com/yrelay/yrexpert-js.git
$ cd /tmp/yrelay/yrexpert-js/docker/gtm
$ docker build -t yrelay/yrexpert-js-srv:latest .
$ cd ~ && rm -rf /tmp/yrelay
````
4) Créer un réseau Docker (sauf si déjà créé)
````shell
$ docker network create yrexpert-js-net
````

Confirmer qu'il a été créé en répertoriant vos réseaux Docker :
````shell
$ docker network ls
````

Vous devriez voir *yrexpert-js-net* inclus dans la liste en tant que réseau *bridged*.

5) Exécuter le conteneur
````shell
$ docker run --rm --name yrexpert-js-srv --net yrexpert-js-net -p 50022:22 -p 50080-50083:8080-8083/tcp -it yrelay/yrexpert-js-srv
````

**Notes :**
- modifiez le port du port d'écoute externe selon vos besoins. Dans l'exemple ci-dessus, vous écouterez sur les port 50022, 50080 et 50081.
- les ports d'écoute internes 22, 8080 et 8081 **NE DOIVENT PAS** être modifiés.
- Les ports internes sont réservés de la manière suivante :
  - 8080 - yrexpert-js
  - 8081 - yrexpert-term
  - 8082 - yrexpert-rpc
  - 8083 - Libre pour test
  - 22 - Accès SSH à yrelay

Laisser au serveur *yrexpert-js-srv* quelques secondes pour démarrer.

## 2. Exécuter le conteneur *yrexpert-js-srv*

### 2.1. Accès en mode terminal
Pour vous connecter en tant qu'utilisateur utilisant l'instance *yrelay* (par défaut):
````shell
$ ssh -p 50022 yrelayutil@localhost # mode de passe = util
````

Pour vous connecter en tant que programmeur utilisant l'instance *yrelay* (par défaut):
````shell
$ ssh -p 50022 yrelayprog@localhost # mode de passe = prog
````
Pour lancer *yrexpert-js* :
````
YXP> D ^VSTART
````

Pour sortir du mode programmeur :
````
YXP> HALT
````

### 2.2. Accès en mode WEB
Pour accéder à l'administration du serveur *yrexpert-js-srv* tapez dans l'URL de votre navigateur le lien suivant : http://localhost:50080/yrexpert/index.html

## 3. Contributions communautaires libres dans ce dépôt
### 3.1. NVM - Node.js Version Manager
[NVM](https://github.com/creationix/nvm) permet d'installer et gérer différentes versions de Node.js et la liaison des versions locales dans des répertoires spécifiques.

### 3.2. Node.js - plateforme serveur en JavaScript
[Node.js](https://nodejs.org/) est une plateforme logicielle libre et événementielle en JavaScript orientée vers les applications réseau qui doivent pouvoir monter en charge. Elle utilise la machine virtuelle V8 et implémente sous licence MIT les spécifications CommonJS. Node.js contient une bibliothèque de serveur HTTP intégrée, ce qui rend possible de faire tourner un serveur web sans avoir besoin d'un logiciel externe comme Apache ou Lighttpd, et permettant de mieux contrôler la façon dont le serveur web fonctionne.

### 3.3. GT.M - Base de données & compilateur MUMPS sous GNU/Linux
[GT.M](https://sourceforge.net/projects/fis-gtm/) est une base de donnée robuste ; Cette plate forme d’application de traitement transactionnel se compose d’un moteur de base de données optimisé pour des sorties élevées et d’un compilateur pour le langage de programmation M (MUMPS). GT.M est un logiciel libre open-source qui fonctionne sous x86/Linux.

### 3.4. EWD.js - Applications serveur/conteneur pour une utilisation avec les bases de données Caché, GlobalsDB, GT.M and MongoDB databases
[EWD.js](http://www.mgateway.com/) est un framework basé [Node.js](https://nodejs.org/), il fait parti d'une longue liste dont les plus connus sont [Express](http://expressjs.com/) and [Meteor.js](https://www.meteor.com/).  Voir [ici](http://nodeframework.com/#mvc) une liste assez complète des frameworks basés sur Nodes.js.

### 3.5. NodeM - Module Node.js de liaison pour le langage et base de données GT.M
[ModeM](https://github.com/dlwicksell/nodem) est un module open source add-on pour Node.js. Ce module Node.js permet via l'interface C Call-in, la communication en Javascript avec la base de données GT.M. Depuis le module Node.js, vous pouvez effectuer les opérations de manipulation de base de la base de données et invoquer également les fonctions mumps de GT.M. 

### 3.6. Axiom - Ensemble d'outils de développement
[Axiom](https://github.com/dlwicksell/axiom) est un ensemble d'outils de développement pour l'édition des routines mumps de GT.M dans l'environnement Vim.

### 3.7. Docker - Pour lancer des applications dans des conteneurs logiciels
[Docker](https://docs.docker.com/) est un logiciel libre permettant facilement de lancer des applications dans des conteneurs logiciels.

## 4. Pour tester, vous pouvez aussi utiliser les box Vagrant
Pour tester yrexpert-js, vous pouvez installer [yrexpert-box](https://github.com/yrelay/yrexpert-box).

## 5. Comment contribuer ?
* Dupliquer le dépôt (utiliser Fork)
* Créer un nouvelle branche (git checkout -b ma-branche)
* Commit(er) votre proposition d'évolution (git commit -am 'Ajouter mon évolution')
* Push(er) la branche (git push origin ma-branche)
* Créer une demande d'évolution (utiliser Pull Requests)

Pour remonter un bug : [https://github.com/yrelay/yrexpert-js/issues](https://github.com/yrelay/yrexpert-js/issues)

## 6. Liens
* yrelay Page d'accueil : [https://www.yrelay.fr/](https://www.yrelay.fr/)
* yrelay Référentiels : [https://code.yrelay.fr/](https://code.yrelay.fr/)
* yrelay Github : [https://github.com/yrelay/](https://github.com/yrelay/)

[npm-image]: https://img.shields.io/npm/v/yrexpert-js.svg
[license-image]: https://img.shields.io/npm/l/yrexpert-js.svg
[npm-url]: https://npmjs.org/package/yrexpert-js

[downloads-image]: https://img.shields.io/npm/dm/yrexpert-js.svg
[downloads-url]: https://npmjs.org/package/yrexpert-js
