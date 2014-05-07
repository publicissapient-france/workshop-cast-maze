window.debug = true;

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

    //cast.receiver.logger.setLevel(0);

    window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
    log('Starting receiver manager');

    window.castReceiverManager.onReady = function (event) {
        log('Received ready event ' + JSON.stringify(event.data));
        window.castReceiverManager.setApplicationState("Application status is ready...");
    };

    window.messageBus = cast.receiver.CastReceiverManager.getInstance().getCastMessageBus("urn:x-cast:fr.xebia.workshop.cast.maze");

    /**
     * When sender connected
     */
    window.castReceiverManager.onSenderConnected = function(event) {
        log('Sender connected event ' + event.data);
        addPlayer(event.senderId);
    };

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
        handleKeypress(event.data, event.senderId);
        
    };

    //window.castReceiverManager.start(cast.receiver.CastReceiverManager.Config());
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