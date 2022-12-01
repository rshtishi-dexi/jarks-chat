var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    } else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('/jarks-ws');

    stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {

        setConnected(true);
        console.log('Connected: ' + frame);

        //send join event
        stompClient.send("/app/join", {}, JSON.stringify({
            'sender': $("#username").val(),
            'type': 'JOIN'
        }));

        //subscribe to public channel
        stompClient.subscribe('/jarks', function (message) {
            console.log(message);
            showPublicMessages(JSON.parse(message.body).sender, JSON.parse(message.body).content);
        });

        //subscribe to private channel
        stompClient.subscribe("/user/" + $("#username").val(), function (message) {
            console.log(message)
            showMessages(JSON.parse(message.body).sender, JSON.parse(message.body).content);
        });

        //subscribe to private channel
        stompClient.subscribe("/events", function (message) {
            console.log(message)
            showUsers(JSON.parse(message.body).sender, JSON.parse(message.body).type);
            if (JSON.parse(message.body).type === 'LEAVE') {

                if (stompClient !== null) {
                    stompClient.disconnect();
                }
                setConnected(false);
                console.log("Disconnected");

            }
        });
    });
}

function disconnect() {
    //send leave event
    stompClient.send("/app/leave", {}, JSON.stringify({
        'sender': $("#username").val(),
        'type': 'LEAVE'
    }));

}

function sendPublicMessage() {
    stompClient.send("/app/message/public", {}, JSON.stringify({
        'sender': $("#sender").val(),
        'content': $("#message").val()
    }));
}

function sendMessage() {

    $("#messages").append("<tr><td>" + $("#sender").val() + "</td></td><td>" + $("#message").val() + "</td></tr>");

    stompClient.send("/app/message", {}, JSON.stringify({
        'sender': $("#sender").val(),
        'content': $("#message").val(),
        'recipient': $("#recipient").val()
    }));
}

function showPublicMessages(sender, message) {
    $("#messages-public").append("<tr><td>" + sender + "</td></td><td>" + message + "</td></tr>");
}

function showMessages(sender, message) {
    $("#messages").append("<tr><td>" + sender + "</td></td><td>" + message + "</td></tr>");
}

function showUsers(sender, type) {
    $("#users").append("<tr><td>" + sender + "</td></td><td>" + type + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $("#connect").click(function () {
        connect();
    });
    $("#disconnect").click(function () {
        disconnect();
    });
    $("#sendAll").click(function () {
        sendPublicMessage();
    });
    $("#send").click(function () {
        sendMessage();
    });
});