package com.epam.game.controller;

import com.epam.game.model.Game;
import com.epam.game.model.Ship;
import com.epam.game.model.Shot;
import com.epam.game.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class GameController {

    private final GameService gameService;

    @MessageMapping("/game/add/ships")
    @SendTo("/topic/game")
    public Game addShips(String player, List<Ship> ships) {
        return gameService.addShips(player, ships);
    }

    @MessageMapping("/game/shot")
    @SendTo("/topic/game")
    public Shot doShot(String player, Shot shot) {
        return gameService.doShot(player, shot);
    }
}
