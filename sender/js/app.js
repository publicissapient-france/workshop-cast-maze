var session = null;

var appId = '8D7FEAA1';
var namespace = 'urn:x-cast:fr.xebia.workshop.cast.maze';

/**
 * Initialization
 */
initializeCastApi = function () {
    var sessionRequest = new chrome.cast.SessionRequest(appId);
    var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
        sessionListener,
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
    log(msg);
}

/**
 * Session listener during initialization
 */
function sessionListener(e) {
    session = e;
    log('new session id: ' + e.sessionId);
}

/**
 * Success for stopping app callback
 */
function onStopAppSuccess() {
    log('session stopped');
    document.getElementById('cast-icon').src = 'img/ic_cast_idle.png';
}

function launchApp() {
    log('launching app...');
    chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);
}

function receiverListener(e) {
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

/**
 * Request session success callback
 * @param {Object} e a non null new session
 */
function onRequestSessionSuccess(e) {
    log('session success: ' + e.sessionId);
    session = e;
    document.getElementById('cast-icon').src = 'img/ic_cast_active.png';
//    session.addUpdateListener(sessionUpdateListener.bind(this));
}

//function sessionUpdateListener(isAlive) {
//    var msg = isAlive ? 'session updated' : 'session removed';
//    msg += ': ' + session.sessionId;
//    log(msg);
//}

function onLaunchError() {
    log('launch error');
}

/**
 * Misc method to log into console box in web view
 * @param msg message to log
 */
function log(msg) {
    var debug = document.getElementById('debug');
    debug.innerHTML += JSON.stringify(msg) + '<br/>';
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

