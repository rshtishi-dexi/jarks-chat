endpoint = "http://localhost:8091/users";

function setConnected(connected) {
    localStorage.setItem("connected", JSON.stringify(connected));
}

function setUsername(username) {
    localStorage.setItem("username", username);
}

function getConnected() {
    return JSON.parse(localStorage.getItem("connected"));
}

function getUsername() {
    return localStorage.getItem("username");
}

function refreshView() {
    if (getConnected()) {
        $("#chat-page").show()
        $("#login-page").hide();
    } else {
        $("#chat-page").hide();
        $("#login-page").show();
    }
}

function onJoinedUser(user) {
    /**
     * TO DO
     * add check for user input
     */
    $.ajax({
        url: endpoint,
        contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify(user),
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        success: function (result) {
            console.log(result);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
        console.log(errorThrown);
    });
    ;
}

function onLeftUser(username, stompClient) {
    /**
     * TO DO
     * add check for input
     */
    $.ajax({
        url: endpoint + "/" + username,
        contentType: "application/json",
        method: "DELETE",
        success: function (result) {
            console.log("DELETED " + username);
            stompClient.disconnect();
        }
    });
}

// OLD METHODS
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

// END OF OLD METHODS

$(function () {

    var socket, stompClient;

    //display correct view
    refreshView();

    $("#login-form").on('submit', function (e) {

        var username = $("#username").val();
        var password = $("#password").val();
        if (username && password) {
            console.log(username);
            console.log(password);
            /**
             * TO DO
             * Authentication
             */

            //Connect
            socket = new SockJS('/jarks-ws');
            stompClient = Stomp.over(socket);
            console.log(socket);
            console.log(stompClient);
            stompClient.connect({}, function (frame) {

                //change view
                setConnected(true);
                setUsername(username);
                refreshView();

                //send join event
                stompClient.send("/app/join", {}, JSON.stringify({
                    'sender': username,
                    'type': 'JOIN'
                }));

                //subscribe to events channel
                stompClient.subscribe("/events", function (message) {
                    var message = JSON.parse(message.body);
                    if (message.type === "JOIN") {
                        var user = {username: message.sender}
                        console.log(user);
                        onJoinedUser(user);
                    } else if (message.type == "LEAVE") {
                        console.log(message.sender)
                        onLeftUser(message.sender, stompClient);
                        ;
                    }
                });

            });

            e.preventDefault();
        }

    });

    $("#signOut").on("click", function () {
        stompClient.send("/app/leave", {}, JSON.stringify({
            'sender': getUsername(),
            'type': 'LEAVE'
        }));
        setConnected(false);
        refreshView();
    })


});