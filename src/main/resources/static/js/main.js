var stompClient = null;
var username = null;

function setConnected(connected) {
    if (connected) {
        $("#field").show();
    } else {
        $("#field").hide();
    }
}

function connect() {
    var socket = new SockJS("/ws");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function () {
        setConnected(true);
        stompClient.subscribe("/topic/game")
    });
}

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect()
    }
    setConnected(false);
}

function addShips(ships) {
    stompClient.send("game/add/ships", {}, ships);
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
});