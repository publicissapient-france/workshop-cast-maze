---
layout: main-layout
---

{% include asset.md %}

{% include setup.md %}

## Coding party

Importer le projet gradle suivant dans votre IDE favori

    sender/android

Ce projet contiendra tout le code nécessaire pour communiquer avec le serveur sur la chromecast.

## Initialisation du mediaRouter

Dans le onCreate() de l'activité récupérer l'instance du [MediaRouter](https://developer.android.com/reference/android/support/v7/media/MediaRouter.html#getInstance\(android.content.Context\)).
Ensuite créer un [MediaRouteSelector](http://developer.android.com/reference/android/support/v7/media/MediaRouteSelector.Builder.html) et via la méthode addControlCategory, ajouter la catégorie suivante:

<pre><code>CastMediaControlIntent.categoryForCast(getString(R.string.app_id))</code></pre>

Cela va permettre d'identifier le receiver souhaité pour notre application.

Créer une classe interne MediaRouterCallback qui hérite de [MediaRouter.Callback](https://developer.android.com/reference/android/support/v7/media/MediaRouter.Callback.html), pour être
informé quand l'utilisateur aura choisi une route (i.e. un device). Laissez les méthodes onRouteSelected et onRouteUnselected vides pour le moment.

Pour finir dans le onResume() demarrer la recherche de devices grâce à la méthode [addCallback](https://developer.android.com/reference/android/support/v7/media/MediaRouter.html#addCallback\(android.support.v7.media.MediaRouteSelector, android.support.v7.media.MediaRouter.Callback, int\))
avec comme flag [MediaRouter.CALLBACK\_FLAG\_PERFORM\_ACTIVE\_SCAN](https://developer.android.com/reference/android/support/v7/media/MediaRouter.html#CALLBACK_FLAG_PERFORM_ACTIVE_SCAN)

## Prérequis
Créer les méthodes :

<pre><code>public void launchReceiver() {
}
public void teardown() {
}</code></pre>

Nous les implémenterons un peu plus loin dans l'exercice.

## Sélection de la route
Lorsque l'utilisateur choisit une route, le méthode onRouteSelected de votre MediaRouterCallback est appelée. Récupérer le
device sélectionné grâce à :
<pre><code class="java">mSelectedDevice = CastDevice.getFromBundle(info.getExtras());</code></pre>
Dans la foulée appeler la méthode launchReceiver().
A l'inverse dans le callback onRouteUnSelected déclencher la méthode teardown() afin de libérer les resources et réinitialiser la variable mSelectedDevice.

## Connexion au play services
Avant de pouvoir communiquer avec la chromecast, il faut d'abord se connecter au play services. Utiliser le builder du [GoogleApiClient](http://developer.android.com/reference/com/google/android/gms/common/api/GoogleApiClient.Builder.html)
utiliser la méthode addApi pour ajouter la feature [Cast.API](http://developer.android.com/reference/com/google/android/gms/cast/Cast.html#API) en n'oubliant pas de passer les CastOptions suivantes:
<pre><code class="java">Cast.CastOptions.Builder apiOptionsBuilder = Cast.CastOptions
    .builder(mSelectedDevice, new Cast.Listener() {
        @Override
        public void onApplicationDisconnected(int errorCode) {
            Log.d(TAG, "application has stopped");
            teardown();
        }
    });</code></pre>

Ajouter les listeners pour le ConnectionCallbacks et le OnConnectionFailed (une impélementation est fournie). Ensuite démarrer la connexion avec la méthode [connect](http://developer.android.com/reference/com/google/android/gms/common/api/GoogleApiClient.html#connect\(\))

## Démarrage du receiver

La gestion de la reconnection étant quelque peu complexe, elle vous est fournie. Cependant, il vous faut maintenant démarrer le receiver.
Utiliser la méthode [launchApplication](http://developer.android.com/reference/com/google/android/gms/cast/Cast.CastApi.html#launchApplication\(com.google.android.gms.common.api.GoogleApiClient, java.lang.String\)) pour le démarrer (où rejoindre une session s'il est déjà lancé) puis enregistrer un [ResultCallback](http://developer.android.com/reference/com/google/android/gms/common/api/ResultCallback.html).

## Verification du status de la connexion

Dans le onResult du ResultCallback, vous pouvez vérifier le statut de votre connexion. C'est généralement ici que l'on enregistre un channel pour recevoir des messages du receiver. Dans notre cas nous ne n'utiliserons pas cette fonctionnalité. Un exemple est cependant fourni dans la solution de l'exercice.

## Envoi d'un message

Le receiver n'accepte que 4 actions : left, up, right, down. Pour lui envoyer un message il ne reste plus qu'à utiliser la méthode  [Cast.CastApi.sendMessage](http://developer.android.com/reference/com/google/android/gms/cast/Cast.CastApi.html#sendMessage\(com.google.android.gms.common.api.GoogleApiClient, java.lang.String, java.lang.String\)). Le namespace de notre application est :
<pre><code>urn:x-cast:fr.xebia.workshop.cast.maze</code></pre>
Vous pouvez attacher un listener pour vérifier si votre message a bien été envoyé. Mapper le clic de vos boutons pour qu'il envoie l'action correspondante au receiver.

## Teardown

Dans la méthode teardown [quitter le receiver](http://developer.android.com/reference/com/google/android/gms/cast/Cast.CastApi.html#leaveApplication\(com.google.android.gms.common.api.GoogleApiClient\)).

## La touche finale

Vous aller bientôt pouvoir jouer! La dernière étape consiste à afficher le logo cast dans l'action bar. Créer un menu avec le code suivant :
<pre><code class="xml">&lt;menu xmlns:android="http://schemas.android.com/apk/res/android"
                             xmlns:tools="http://schemas.android.com/tools"
                             xmlns:app="http://schemas.android.com/apk/res-auto"
                             tools:context="fr.xebia.workshop.cast.maze.MazeActivity"&gt;
       &lt;item
               android:id="@+id/media_route_menu_item"
               android:title="@string/media_route_menu_title"
               app:actionProviderClass="android.support.v7.app.MediaRouteActionProvider"
               app:showAsAction="always"/&gt;
&lt;/menu&gt;</code></pre>

Utiliser le dans le onCreateOptionsMenu et ajouter le code suivant :

<pre><code class="java">MenuItem mediaRouteMenuItem = menu.findItem(R.id.media_route_menu_item);
MediaRouteActionProvider mediaRouteActionProvider = (MediaRouteActionProvider) MenuItemCompat.getActionProvider(mediaRouteMenuItem);
// Set the MediaRouteActionProvider selector for device discovery.
mediaRouteActionProvider.setRouteSelector(mMediaRouteSelector);</code></pre>

## Go

Essayer de trouver la sortie du labyrinthe\!



