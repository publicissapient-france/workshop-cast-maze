var session = null;

var applicationID = '8D7FEAA1';
var namespace = 'urn:x-cast:fr.xebia.workshop.cast.maze';

/**
 * Initialization
 */
initializeCastApi = function () {
    var sessionRequest = new chrome.cast.SessionRequest(applicationID);
    var apiConfig = new chrome.cast.ApiConfig(
        sessionRequest,
        sessionListener,
        receiverListener);

    chrome.cast.initialize(apiConfig, onInitSuccess, onError);
};

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
 * When a message is received from receiver
 * @param namespace String
 * @param message String or JSON
 */
function onReceiverMessage(namespace, message) {
    if (message) {
        log('Message: ' + message);
        var o = JSON.parse(message);
        if (o.color) {
            document.body.style.backgroundColor = o.color;
        }
    }
}
/**
 * When session available (join)
 */
function sessionListener(e) {
    log('Join receiver id ' + e.sessionId);
    session = e;
    session.addMessageListener(namespace, onReceiverMessage);
}

/**
 * On launch application button pressed request a session
 */
function launchApp() {
    log('Requesting session...');
    chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);
}

/**
 * When session requested (create)
 */
function onRequestSessionSuccess(e) {
    log('Session requested id ' + e.sessionId);
    session = e;
    session.addMessageListener(namespace, onReceiverMessage);
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
    session.sendMessage(namespace, dir, successCallback, errorCallback);
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
 * Subscribe to Google Cast Api Available
 * @param loaded API loaded or not
 * @param errorInfo error information
 */
window['__onGCastApiAvailable'] = function (loaded, errorInfo) {
    if (loaded) {
        initializeCastApi();
    } else {
        console.log(errorInfo);
    }
};

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

