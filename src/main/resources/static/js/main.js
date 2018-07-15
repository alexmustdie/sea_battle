var stompClient = null;
var list = null;
var game = null;

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
        stompClient.subscribe("/topic/game", onGameReceived);
        stompClient.subscribe("/topic/shot", onShotReceived);
    });
}

function onGameReceived(game) {

}

function onShotReceived(shot) {
    var receivedShot = JSON.parse(shot.body);

    var cell = $("#enemy-board").children("tr").eq(receivedShot.y).children("td").eq(receivedShot.x);
    if (receivedShot.status === "SUCCESSFUL") {
        cell.toggleClass('active')
    } else if (receivedShot.status === "MISSED") {
        cell.toggleClass('missed')
    }
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

function doShot(shot) {
    var doShotMessage = {
        player: $("#name").val(),
        shot: shot
    };
    stompClient.send("/battle/game/shot", {}, JSON.stringify(doShotMessage));
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
    });

    $("#enemy-board td").click(function () {
        var x = parseInt($(this).index());
        var y = parseInt($(this).parent().index());
        var shot = {
            x: x,
            y: y,
            status: "PENDING"
        };
        doShot(shot);
    });

    $("#add-ships").click(function () {
        addShips(list);
    });

    $("#disconnect").click(function () {
        disconnect();
    });
});