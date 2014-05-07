---
layout: main-layout
---

{% include asset.md %}

## Setup

Faites un fork du dépôt puis un git clone :

     $ https://github.com/xebia-france/workshop-cast-maze.git

## Coding party

Ouvrez le fichier suivant dans votre IDE favori

    receiver/cast.js

Ce fichier contiendra tout le code nécessaire pour communiquer avec la chromecast.

Nous allons développer un [Custom Receiver Application](https://developers.google.com/cast/docs/custom_receiver) pour gérer le labyrinthe et
les joueurs.

### Configuration

Ajoutez l'import du SDK dans le fichier <code>index.html</code>

    <script type="text/javascript" src="//www.gstatic.com/cast/sdk/libs/receiver/2.0.0/cast_receiver.js"></script>

Activez le mode debug dans le fichier <code>cast.js</code>

    window.debug = true;

Indiquez un niveau de log égal à <code>NONE</code> pour la chromecast ```cast.receiver.logger.setLevelValue()```

cf. [cast.receiver.LoggerLevel](https://developers.google.com/cast/docs/reference/receiver/cast.receiver.LoggerLevel#.NONE)

Vous pouvez lancer à tout moment le serveur en local en exécutant le serveur node :

    node server.js
Puis en vous rendant sur :

    http://localhost:8080/receiver/index.html

Affichez la console pour debugger le receiver.

### Initialisation

Récupérez une instance du <code>CastReceiverManager</code>

Utilisez ```getInstance()```.

Lancez l'application cf. [CastReceiver](https://developers.google.com/cast/docs/reference/receiver/cast.receiver.CastReceiverManager#start)

### Connection d'un joueur

Une fois l'application lancée, les événements lors des connections, des déconnections, des messages, etc. peuvent être écoutés.

Complétez le code dans la méthode [onSenderConnected](https://developers.google.com/cast/docs/reference/receiver/cast.receiver.CastReceiverManager#onSenderConnected)
pour ajouter une joueur au labyrinthe cf.

    game.js > addPlayer(playerId)

### Reception d'un message

L'application Chromecast est capable de recevoir des messages.

Pour ce faire vous devez récupérer un [CastMessageBus](https://developers.google.com/cast/docs/reference/receiver/cast.receiver.CastMessageBus)

Cet objet possède une méthode [onMessage](https://developers.google.com/cast/docs/reference/receiver/cast.receiver.CastMessageBus#onMessage) qui permet
d'écouter les messages.

Completez la méthode onMessage pour que le joueur se déplace si le message correspond à l'une des chaines de caractères suivantes :

* up
* down
* right
* left

cf. méthode :

    game.js > handleKeypress(direction, id);

### Déploiement du receiver

Le receiver doit être déployé sur un serveur et être accessible par la chromecast.

Pour cela, contactez un intervenant :).

### Envoi d'un message vers les senders

L'application Chromecast peut également envoyer des messages aux clients.

Pour cela l'objet [CastMessageBus](https://developers.google.com/cast/docs/reference/receiver/cast.receiver.CastMessageBus) possède une méthode [send](https://developers.google.com/cast/docs/reference/receiver/cast.receiver.CastMessageBus#send)

Faites en sorte qu'à la connection d'un joueur le receiver transmette un message vers le sender pour lui indique sa couleur.

NB : la méthode <code>game.js > addPlayer(playerId)</code> renvoie une couleur.

Le format attendu est un objet contenant un champ <code>color</code> et la valeur de la couleur.