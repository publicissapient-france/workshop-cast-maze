var session = null;

var appId = ''; // TODO
var namespace = ''; // TODO

/**
 * Init cast API
 */
initializeCastApi = function () {
    // TODO
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
function onSuccess() {
    log('success');
}

/**
 * When receive message from receiver
 *
 * @param namespace receiver namespace
 * @param message string sent by the receiver
 */
function onReceiverMessage(namespace, message) {
    // TODO
}

/**
 * Session listener during initialization
 */
function onSessionListener(e) {
    log('new session ' + e.sessionId);
    // TODO save session
    // TODO add message listener
}

/**
 * On launch application button pressed
 */
function launchApp() {
    log('launching app...');
    // TODO
}

/**
 * When sender connected to receiver
 * When configuration change
 * @param e string
 */
function receiverListener(e) {
    log(JSON.stringify(e));
}

function go(dir) {
    log('go to:' + dir);
    // TODO send message to receiver
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
// TODO

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

