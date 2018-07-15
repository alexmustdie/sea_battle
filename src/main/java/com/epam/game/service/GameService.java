package com.epam.game.service;

import com.epam.game.model.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {

    private final Game game = new Game();

    public Game addShips(String player, List<Cell> ships) {
        if (game.getFields().size() < 2) {
            Field field = new Field(player);
            field.getCells().forEach(cell -> ships.forEach(shipCell -> {
                if (cell.getX() == shipCell.getX() && cell.getY() == shipCell.getY()) {
                    cell.setStatus(shipCell.getStatus());
                }
            }));
            game.getFields().add(field);
            if (game.getFields().size() == 2) {
                game.setStatus(Game.GameStatus.STARTED);
            }
        }

        return game;
    }

    public Shot doShot(String player, Shot shot) {
        game.getFields().forEach(field -> {
            if (field.getPlayer().equals(player)) {
                field.getCells().forEach(cell -> {
                    if (cell.getX() == shot.getX() && cell.getY() == shot.getY()) {
                        cell.setStatus(Cell.CellStatus.SHOT);
                        shot.setStatus(Shot.ShotStatus.SUCCESSFUL);
                    }
                });
            }
        });

        return shot;
    }
}
