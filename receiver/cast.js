$(document).ready(function () {
    cast.receiver.logger.setLevelValue(0);

    window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
    log('Starting receiver manager');

    castReceiverManager.onReady = function (event) {
        log('Received ready event ' + JSON.stringify(event.data));
        window.castReceiverManager.setApplicationState("Application status is ready...");
    };

    castReceiverManager.onSenderConnected = function (event) {
        log('Received sender connected event ' + event.data);
        log(window.castReceiverManager.getSender(event.data).userAgent);
        var color = addPlayer(event.senderId);
        window.messageBus.send(even.senderId, {color: color});
    };

    castReceiverManager.onSenderDisconnected = function (event) {
        log('Received sender disconnected event: ' + event.data);
        if (window.castReceiverManager.getSenders().length == 0) {
            window.close();
        }
        removePlayer(event.senderId);
    };

    castReceiverManager.onSystemVolumeChanged = function (event) {
        log('Received system volume changed event: ' + event.data['level'] + ' ' +
            event.data['muted']);
    };

    window.messageBus = window.castReceiverManager.getCastMessageBus('urn:x-cast:fr.xebia.workshop.cast.maze');

    window.messageBus.onMessage = function (event) {
        log('Message [' + event.senderId + '] ' + event.data);
        handleKeypress(event.data, event.senderId);
        window.messageBus.send(event.senderId, event.data);
    };

    window.castReceiverManager.start({statusText: "Application is starting"});
    log('Receiver manager started');

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