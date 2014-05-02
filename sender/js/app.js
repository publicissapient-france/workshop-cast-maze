var session = null;

var appId = '8D7FEAA1';
var namespace = 'urn:x-cast:fr.xebia.workshop.cast.maze';

/**
 * initialization
 */
initializeCastApi = function () {
    var sessionRequest = new chrome.cast.SessionRequest(appId);
    var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
        sessionListener,
        receiverListener);

    chrome.cast.initialize(apiConfig, onInitSuccess, onError);
};

/**
 * initialization success callback
 */
function onInitSuccess() {
    log('init success');
}

/**
 * initiation error callback
 */
function onError() {
    log('error');
}

/**
 * generic success callback
 */
function onSuccess(msg) {
    log(msg);
}

/**
 * session listener during initialization
 */
function sessionListener(e) {
    session = e;
    log('new session id: ' + e.sessionId);
}

/**
 * success for stopping app callback
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
 * request session success callback
 * @param {Object} e a non null new session
 */
function onRequestSessionSuccess(e) {
    log('session success: ' + e.sessionId);
    session = e;
    document.getElementById('cast-icon').src = 'img/ic_cast_active.png';
    session.addUpdateListener(sessionUpdateListener.bind(this));
}

function sessionUpdateListener(isAlive) {
    var msg = isAlive ? 'session updated' : 'session removed';
    msg += ': ' + session.sessionId;
    log(msg);
}

function onLaunchError() {
    log('launch error');
}

function log(msg) {
    var debug = document.getElementById('debug');
    debug.innerHTML += JSON.stringify(msg) + '<br/>';
}

window['__onGCastApiAvailable'] = function (loaded, errorInfo) {
    if (loaded) {
        initializeCastApi();
    } else {
        console.log(errorInfo);
    }
};

document.onkeypress = function (evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    goFromKey(charStr);
};

