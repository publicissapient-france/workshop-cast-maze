window.debug = false;

function checkDebug() {
    if (window.debug) {
        document.getElementById('debug').style.display = 'block';
        document.getElementById('maze').style.margin = '30px';
    } else {
        document.getElementById('debug').style.display = 'none';
        document.getElementById('maze').style.margin = '30px auto';
    }
}

$(document).ready(function () {

    cast.receiver.logger.setLevelValue(0);

    window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
    log('Starting receiver manager');

    window.castReceiverManager.onReady = function (event) {
        log('Received ready event ' + JSON.stringify(event.data));
        window.castReceiverManager.setApplicationState("Application status is ready...");
    };

    window.messageBus = window.castReceiverManager
        .getCastMessageBus('urn:x-cast:fr.xebia.workshop.cast.maze');

    window.castReceiverManager.onSenderConnected = function (event) {
        log('Received sender connected event ' + event.data);
        var color = addPlayer(event.senderId);
        window.messageBus.send(event.senderId, JSON.stringify({color: color}));
    };

    window.castReceiverManager.onSenderDisconnected = function (event) {
        log('Received sender disconnected event ' + event.data);
        removePlayer(event.senderId);
        if (window.castReceiverManager.getSenders().length == 0) {
            window.close();
        }
    };

    window.messageBus.onMessage = function (event) {
        log('Message [' + event.senderId + '] ' + event.data);
        handleKeypress(event.data, event.senderId);
    };

    window.castReceiverManager.start({statusText: "Application is starting"});
    log('Receiver manager started');

    /**
     * Misc method to log into console box in web view
     * @param msg message to log
     */
    function log(msg) {
        if (debug) {
            var debug = document.getElementById('debug');
            var tmpHTML = debug.innerHTML;
            debug.innerHTML = '';
            debug.innerHTML = msg + '<br/>' + tmpHTML;
        }
    }
});