package com.epam.game.controller;

import com.epam.game.model.AddShipsMessage;
import com.epam.game.model.DoShotMessage;
import com.epam.game.model.Game;
import com.epam.game.model.Shot;
import com.epam.game.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
public class GameController {

    private final GameService gameService;

    @MessageMapping("/game/add/ships")
    @SendTo("/topic/game")
    public Game addShips(AddShipsMessage addShipsMessage) {
        return gameService.addShips(addShipsMessage.getPlayer(), addShipsMessage.getShips());
    }

    @MessageMapping("/game/shot")
    @SendTo("/topic/shot")
    public Shot doShot(DoShotMessage doShotMessage) {
        return gameService.doShot(doShotMessage.getPlayer(), doShotMessage.getShot());
    }
}
