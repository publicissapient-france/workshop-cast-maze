var session = null;

var applicationID = '';
var namespace = '';

/**
 * Subscribe to Google Cast Api Available
 * @param loaded API loaded or not
 * @param errorInfo error information
 */
// TODO listen event __onGCastApiAvailable

/**
 * Initialization
 */
initializeCastApi = function () {
    // TODO code method
};

/**
 * When session available (join)
 */
function sessionListener(e) {
    log('Join receiver id ' + e.sessionId);
    // TODO save session
    // TODO add message listener
}

/**
 * Initialization success callback
 */
function onInitSuccess() {
    log('Init success');
}

/**
 * Initiation error callback
 */
function onError() {
    log('Error on init');
}

/**
 * On launch application button pressed request a session
 */
function launchApp() {
    log('Requesting session...');
    // TODO request a session from receiver
}

/**
 * When session requested (create)
 */
function onRequestSessionSuccess(e) {
    log('Session requested id ' + e.sessionId);
    // TODO save session
    // TODO add message listener
}

/**
 * Report if chrome cast devices are available
 * @param e
 */
function receiverListener(e) {
    if (e === chrome.cast.ReceiverAvailability.AVAILABLE) {
        log('Chromecast available')
    }
}

/**
 * Launch error
 */
function onLaunchError() {
    log('launch error');
}

/**
 * Move
 * @param dir String
 */
function go(dir) {
    log('Go to ' + dir);
    // TODO send message to receiver
}

/**
 * Success
 */
function successCallback() {
    log('Success');
}

/**
 * Error
 */
function errorCallback() {
    log('Error')
}

/**
 * When a message is received from receiver
 * @param namespace String
 * @param message String or JSON
 */
function onReceiverMessage(namespace, message) {
    log('Message: ' + message);
    // TODO change background color according to received message
}

//////////
// MISC //
//////////

/**
 * Keyboard shortcuts
 * @param key
 */
function goFromKey(key) {
    switch (key) {
        case 'z':
            go('up');
            break;
        case 'q':
            go('left');
            break;
        case 'd':
            go('right');
            break;
        case 's':
            go('down');
            break;
    }
}

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

/**
 * Retrieve key pressed
 * @param evt on key pressed event
 */
document.onkeypress = function (evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    goFromKey(charStr);
};

