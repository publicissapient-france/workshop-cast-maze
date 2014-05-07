---
layout: main-layout
---

{% include asset.md %}

{% include setup.md %}

## Déroulement du TP

Le TP se déroule en plusieurs étapes qui seront validées soit par des changements d'UI (apparition/disparition d'éléments) soit via des messages dans votre console de log.

Le fichier principal avec lequel vous allez majoritairement travailler est ```MazeViewController.m```. Il contient tous les éléments quant aux différentes étapes nécessaires pour jouer:

- Scan des devices
- Connexion au Chromecast
- Envoi des événements de jeu

Tout au long du TP pensez à vous enregistrer en tant que ```delegate``` lorsque vous créez vos objets afin de recevoir leurs "notifications". Pour savoir pour quels objets vous devrez vous définir en tant que delegate vous pouvez regarder ```MazeViewController.h```

## Coding Party

Importer le projet suivant dans Xcode (ou AppCode)

	 sender/ios

Ce projet contiendra tout le code nécessaire pour communiquer avec le serveur sur la Chromecast.

Pour pouvoir se connecter à un Chromecast il faut d'abord scanner le réseau afin de pouvoir en trouver auxquels se connecter.

Ouvrez ```MazeViewController.m``` et implémentez le constructeur afin de créer une instance de ```GCKDeviceScanner```. Vérifiez bien que celui-ci est appelé (Breakpoints, NSLog,...)

Dans la méthode ````viewDidLoad````, démarrez le scanner afin qu'il puisse trouver des devices.

Si tout se passe bien vous devriez voir "Device xxx found" dans votre console. Il est temps de s'y connecter !


### Connexion à Chromecast
On va d'abord afficher la liste de tous les Chromecast trouvés afin de pouvoir choisir celui auquel on va se connecter. Pour se faire:

1. Implémenter la méthode ```onChooseCastDevice```. Elle devra:
  - Créer une ```UIActionSheet``` avec le titre "Choose your device"
  - Lister tous les devices dans cette UIActionSheet
  - Afficher un bouton "Cancel". Pour le TP, le bouton devra s'afficher à la FIN de la liste !
2. Implémenter la méthode ```onConnectToCastDevice```. Elle devra:
  - Créer un Device Manager pour le device sélectionné
  - Se connecter au device
  
Lancez votre application et sélectionnez un device dans en cliquant sur l'icône Chromecast en haut à droite.
Si tout se passe bien vous devriez voir:

1. Le message "Connecting to xxx" après avoir seléctionné le device
2. Le message "Connected to device!" une fois la connexion avec le device réussie. L'icône Chromecast doit aussi s'être mise à jour

### Connexion à l'application
Maintenant que la connexion est établie, on va tenter de lancer l'application Maze avec son ID ```8D7FEAA1```. Pour ça vous devez implémenter la méthode ```deviceManagerDidConnect```

Le message "Joined Workshop Cast. Enjoy!" vous précisera la réussite (ou pas!) de cette étape ;) 

Ok time to (quasi) play!

## Le jeu

On s'est connecté à Chromecast et on a lancé l'application (le receiver). Great! Maintenant il nous reste encore à pouvoir envoyer/gérer nos messages :)

### Recevoir des messages

Pour pouvoir communiquer il nous faut créer un ```MazeChannel``` dans la méthode ```deviceManager:didConnectToCastApplication:sessionID:launchedApplication:``` et l'attacher à notre DeviceManager à l'aide de la méthode ```addChannel```. Pour pouvoir utiliser la classe ```MazeChannel``` il faudra d'abord la fixer en lui settant son namespace à la valeur ```urn:x-cast:fr.xebia.workshop.cast.maze```

Relancez le projet et connectez-vous à  un Chromecast. Si tout se passe bien vous devriez voir une petite barre de couleur apparaître. Elle représente la couleur de votre personnage dans le jeu ! Vous venez officiellement d'apparaître dans le labyrinthe tout en haut à gauche :) En route pour l'aventure !

### Se déplacer

Maintenant que vous pouvez discuter avec le receiver il vous reste à lui envoyer des messages afin de vous déplacer dans le labyrinthe. Pour se faire:

- Implémenter ```mazeView:selectedMove:```. Elle est appelée à chaque fois que vous appuyez sur une des flèches dans l'UI. Cette méthode doit envoyer à notre channel le mouvement désiré
- Implémenter ```move``` dans ```MazeChannel```. Cette méthode doit envoyer le mouvement désiré à notre receiver à l'aide de la méthode ```sendTextMessage```. Les seuls messages que vous pourrez envoyer au receiver sont les NSString ```up, down, left, right```

Relancez le projet et une fois connecté, appuyez sur les touches. Vous devriez voir votre joueur se déplacer dans le labyrinthe :)

## Go

Il ne vous reste plus qu'à essayer de sortir du labyrinthe ! Enjoy!