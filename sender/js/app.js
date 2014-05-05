var session = null;

var appId = '8D7FEAA1';
var namespace = 'urn:x-cast:fr.xebia.workshop.cast.maze';

/**
 * Initialization
 */
initializeCastApi = function () {
    var sessionRequest = new chrome.cast.SessionRequest(appId);
    var apiConfig = new chrome.cast.ApiConfig(
        sessionRequest,
        onSessionListener,
        receiverListener);

    chrome.cast.initialize(apiConfig, onInitSuccess, onError);
};

/**
 * Initialization success callback
 */
function onInitSuccess() {
    log('init success');
}

/**
 * Initiation error callback
 */
function onError() {
    log('error');
}

/**
 * Generic success callback
 */
function onSuccess(msg) {
    log('success');
}

function onReceiverMessage(namespace, message) {
    if (message) {
        log('message: ' + message);
        var o = JSON.parse(message);
        if (o.color) {
            document.body.style.backgroundColor = o.color;
        }
    }
}
/**
 * Session listener during initialization
 */
function onSessionListener(e) {
    log('new session ' + e.sessionId);
    session = e;
    session.addMessageListener(namespace, onReceiverMessage);
}

/**
 * On launch application button pressed
 */
function launchApp() {
    log('launching app...');
    chrome.cast.requestSession(onSessionListener, onLaunchError);
}

function receiverListener(e) {
    log(JSON.stringify(e));
    if (e === chrome.cast.ReceiverAvailability.AVAILABLE) {
    } else {
        var msg = JSON.parse(e);
        if (msg.color) {
            document.body.style.backgroundColor = e.color;
        }
    }
}

function go(dir) {
    log('go to:' + dir);
    session.sendMessage(namespace, dir, onSuccess, onError);
}

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

function onLaunchError() {
    log('launch error');
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

