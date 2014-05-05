$(document).ready(function () {
    cast.receiver.logger.setLevelValue(0);

    window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
    log('Starting Receiver Manager');

    // handler for the 'ready' event
    castReceiverManager.onReady = function (event) {
        log('Received Ready event: ' + JSON.stringify(event.data));
        window.castReceiverManager.setApplicationState("Application status is ready...");
    };

    // handler for 'senderconnected' event
    castReceiverManager.onSenderConnected = function (event) {
        log('Received Sender Connected event: ' + event.data);
        log(window.castReceiverManager.getSender(event.data).userAgent);
        var color = addPlayer(event.senderId);
        window.messageBus.send(event.senderId, {color: '#CCCCCC'});
    };

    // handler for 'senderdisconnected' event
    castReceiverManager.onSenderDisconnected = function (event) {
        log('Received Sender Disconnected event: ' + event.data);
        if (window.castReceiverManager.getSenders().length == 0) {
            window.close();
        }
        removePlayer(event.senderId);
    };

    // handler for 'systemvolumechanged' event
    castReceiverManager.onSystemVolumeChanged = function (event) {
        log('Received System Volume Changed event: ' + event.data['level'] + ' ' +
            event.data['muted']);
    };

    // create a CastMessageBus to handle messages for a custom namespace
    window.messageBus =
        window.castReceiverManager.getCastMessageBus(
            'urn:x-cast:fr.xebia.workshop.cast.maze',
            cast.receiver.CastMessageBus.MessageType.JSON);

    // handler for the CastMessageBus message event
    window.messageBus.onMessage = function (event) {
        log('Message [' + event.senderId + ']: ' + event.data);
        // display the message from the sender
        handleKeypress(event.data, event.senderId);
        // inform all senders on the CastMessageBus of the incoming message event
        // sender message listener will be invoked
        window.messageBus.send(event.senderId, event.data);
    };

    // initialize the CastReceiverManager with an application status message
    window.castReceiverManager.start({statusText: "Application is starting"});
    log('Receiver Manager started');

    /**
     * Misc method to log into console box in web view
     * @param msg message to log
     */
    function log(msg) {
        var debug = document.getElementById('debug');
        var tmpHTML = debug.innerHTML;
        debug.innerHTML = '';
        debug.innerHTML = JSON.stringify(msg) + '<br/>' + tmpHTML;
    }
});