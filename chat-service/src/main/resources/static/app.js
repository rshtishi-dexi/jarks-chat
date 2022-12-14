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
            updateChatList();
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
            updateChatList();
            stompClient.unsubscribe();
        }
    });
}

function updateChatList() {
    clearChatList();
    $.ajax({
        url: endpoint,
        contentType: "application/json",
        method: "GET",
        success: function (users) {
            clearChatList();
            console.log("users");
            console.log(users);
            for (user of users) {
                if (user === null || user.username === getUsername()) {
                    continue;
                }
                displayUser(user);
            }

        }
    });
}

function clearChatList() {
    $("#chat-list").empty();
}

function displayUser(user) {
    $("#chat-list").append('<li class="clearfix">\n' +
        '                                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="avatar">\n' +
        '                                <div class="about">\n' +
        '                                    <div class="name">' + user.username + '</div>\n' +
        '                                    <div class="status"> <i class="fa fa-circle offline"></i> offline since Oct 28 </div>\n' +
        '                                </div>\n' +
        '                            </li>'
    );
}

function displayLoginUser() {
    $("#login-user").text(getUsername());
}

function handleChatListEvent(message, stompClient) {
    var message = JSON.parse(message.body);
    if (message.type === "JOIN") {
        var user = {username: message.sender}
        onJoinedUser(user);
        displayLoginUser();
    } else if (message.type == "LEAVE") {
        onLeftUser(message.sender, stompClient);
    }
}

function signOut(stompClient) {
    stompClient.send("/app/leave", {}, JSON.stringify({
        'sender': getUsername(),
        'type': 'LEAVE'
    }));
    setConnected(false);
    refreshView();
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

$(document).ready(function () {

    $(window).on("load", function () {

        var socket, stompClient;

        //display correct view
        refreshView();


        $("#login-form").on('submit', function (e) {
            e.preventDefault();
            var username = $("#username").val();
            var password = $("#password").val();
            if (username && password) {
                /**
                 * TO DO
                 * Authentication
                 */

                //Connect
                socket = new SockJS('/jarks-ws');
                stompClient = Stomp.over(socket);
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
                        handleChatListEvent(message, stompClient);
                    });

                });

                e.preventDefault();
            }

        });

        $("#signOut").on("click", function (e) {
            e.preventDefault(e);
            signOut(stompClient);
        })


    });

});