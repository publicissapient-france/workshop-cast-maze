$(document).ready(function () {

    cast.receiver.logger.setLevelValue(0);

    window.castReceiverManager.onReady = function (event) {
        log('Received ready event ' + JSON.stringify(event.data));
        window.castReceiverManager.setApplicationState("Application status is ready...");
    };

    window.castReceiverManager.onSenderConnected = function (event) {
        log('Received sender connected event ' + event.data);
        log(window.castReceiverManager.getSender(event.data).userAgent);
        addPlayer(event.senderId);
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

    window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
    log('Starting receiver manager');

    window.castReceiverManager.start({statusText: "Application is starting"});
    log('Receiver manager started');

    window.messageBus = window.castReceiverManager
        .getCastMessageBus('urn:x-cast:fr.xebia.workshop.cast.maze');

    /**
     * Misc method to log into console box in web view
     * @param msg message to log
     */
    function log(msg) {
        var debug = document.getElementById('debug');
        var tmpHTML = debug.innerHTML;
        debug.innerHTML = '';
        debug.innerHTML = msg + '<br/>' + tmpHTML;
    }
});