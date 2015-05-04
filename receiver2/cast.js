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

    // TODO log level

    window.castReceiverManager = {}; // TODO get CastReceiverManager
    log('Starting receiver manager');

    window.castReceiverManager.onReady = function (event) {
        log('Received ready event ' + JSON.stringify(event.data));
        window.castReceiverManager.setApplicationState("Application status is ready...");
    };

    window.messageBus = {} // TODO get CastMessageBus

    /**
     * When sender connected
     */
    // TODO onSenderConnected call addPlayer(<id>)

    /**
     * When sender disconnect
     * @param event
     */
    window.castReceiverManager.onSenderDisconnected = function (event) {
        log('Received sender disconnected event ' + event.data);
        removePlayer(event.senderId);
        if (window.castReceiverManager.getSenders().length == 0) {
            window.close();
        }
    };

    /**
     * When message received
     * @param event object
     */
    window.messageBus.onMessage = function (event) {
        log('Message [' + event.senderId + '] ' + event.data);
        // TODO call method to move player with direction
    };

    /**
     * Start receiver
     */
    // TODO start CastReceiverManager
    log('Receiver manager started');

    /**
     * Misc method to log into console box in web view
     * @param msg message to log
     */
    function log(msg) {
        if (window.debug) {
            var debug = document.getElementById('debug');
            var tmpHTML = debug.innerHTML;
            debug.innerHTML = '';
            debug.innerHTML = msg + '<br/>' + tmpHTML;
        }
    }
});