initializeCastApi = function () {
    cast.framework.CastContext.getInstance().setOptions({
        receiverApplicationId: applicationId,
        autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
    });
};

window['__onGCastApiAvailable'] = function (isAvailable) {
    if (isAvailable) {
        initializeCastApi();
    }
};

function sendMessage(msg) {
    var castSession = cast.framework.CastContext.getInstance().getCurrentSession();
    if (castSession) {
        castSession.sendMessage('urn:x-cast:com.example.castdata', {
            type: "message",
            text: msg
        });
    }
}

var context = cast.framework.CastContext.getInstance();
context.addEventListener(
    cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
    function (event) {
        switch (event.sessionState) {
            case cast.framework.SessionState.SESSION_STARTED:
                console.log('CastSession started');
                break;
            case cast.framework.SessionState.SESSION_RESUMED:
                console.log('CastSession resumed');
                break;
            case cast.framework.SessionState.SESSION_ENDED:
                console.log('CastSession disconnected');
                break;
        }
    });