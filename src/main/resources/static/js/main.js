var stompClient = null;
var list = null;

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
    var addShipsMessage = {
        player: $("#name").val(),
        ships: ships
    };
    stompClient.send("/battle/game/add/ships", {}, JSON.stringify(addShipsMessage));
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });

    $("#connect").click(function () {
        connect();
    });

    $("#board td").click(function () {
        var x = parseInt($(this).index());
        var y = parseInt($(this).parent().index());
        var cell = {
            x: x,
            y: y,
            status: "RESERVED"
        };
        if (list === null) {
            list = [];
        }
        list.push(cell);
        $(this).toggleClass('active');
//        $("#result").html("X: " + x + ", Y: " + y)
    });

    $("#add-ships").click(function () {
        addShips(list);
    });

    $("#disconnect").click(function () {
        disconnect();
    });
});