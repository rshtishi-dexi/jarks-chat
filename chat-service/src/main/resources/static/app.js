endpoint = "http://localhost:8091/users";

function setConnected(connected) {
    localStorage.setItem("connected", JSON.stringify(connected));
}

function setUsername(username) {
    localStorage.setItem("username", username);
}

function setProfileImage(image) {
    localStorage.setItem("profile", image);
}

function getConnected() {
    return JSON.parse(localStorage.getItem("connected"));
}

function getUsername() {
    return localStorage.getItem("username");
}

function getProfileImage() {
    return localStorage.getItem("profile");
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
        '                                <img src="' + user.imageSource + '" alt="avatar">\n' +
        '                                <div class="about">\n' +
        '                                    <div class="name" onClick="showMessages(this)">' + user.username + '</div>\n' +
        '                                    <div class="status"> <i class="fa fa-circle offline"></i> offline since Oct 28 </div>\n' +
        '                                </div>\n' +
        '                            </li>'
    );
}

function showMessages(event) {
    console.log(event.innerText);
    $("#chat-messages").append('                                ' +
        '                               <li class="clearfix">\n' +
        '                                    <div class="message-data text-right">\n' +
        '                                        <span class="message-data-time">' + event.innerText + '</span>\n' +
        '                                        <span class="message-data-time">10:10 AM, Today</span>\n' +
        '                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar">\n' +
        '                                    </div>\n' +
        '                                    <div class="message other-message float-right"> Hi Aiden, how are you? How is the project coming along? </div>\n' +
        '                                </li>\n' +
        '                                <li class="clearfix">\n' +
        '                                    <div class="message-data">\n' +
        '                                        <span class="message-data-time">10:12 AM, Today</span>\n' +
        '                                    </div>\n' +
        '                                    <div class="message my-message">Are we meeting today?</div>\n' +
        '                                </li>');
}

function displayLoginUser() {
    $("#login-user").text(getUsername());
    console.log(getProfileImage());
    $("#profile").attr("src", getProfileImage());
}

function handleChatListEvent(message, stompClient) {
    var message = JSON.parse(message.body);
    if (message.type === "JOIN") {
        var user = {username: message.sender, imageSource: message.content};
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

function connect(stompClient, username, image) {
    stompClient.connect({}, function (frame) {

        //change view
        setConnected(true);
        setUsername(username);
        setProfileImage(image);
        refreshView();

        //send join event
        stompClient.send("/app/join", {}, JSON.stringify({
            'sender': username,
            'content': image,
            'type': 'JOIN'
        }));

        //subscribe to events channel
        stompClient.subscribe("/events", function (message) {
            handleChatListEvent(message, stompClient);
        });

    });
}

// OLD METHODS
function connectold(stompClient) {
    /*
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
        });*/
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

function showPublicMessagesx(sender, message) {
    $("#messages-public").append("<tr><td>" + sender + "</td></td><td>" + message + "</td></tr>");
}

function showMessagesx(sender, message) {
    $("#messages").append("<tr><td>" + sender + "</td></td><td>" + message + "</td></tr>");
}

function showUsersx(sender, type) {
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
            var image = $("#image").val();
            if (username && password) {
                /**
                 * TO DO
                 * Authentication
                 */
                //Connect
                socket = new SockJS('/jarks-ws');
                stompClient = Stomp.over(socket);
                connect(stompClient, username, image);
                e.preventDefault();
            }

        });

        $("#signOut").on("click", function (e) {
            e.preventDefault(e);
            signOut(stompClient);
        })


    });

});