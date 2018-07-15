package com.epam.game.model;


import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class Field {

    private List<Cell> cells;
    private String player;

    public Field(String player) {
        this.player = player;
        this.cells = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            for (int j = 1; j <= 10; j++) {
                this.cells.add(new Cell(i, j, Cell.CellStatus.FREE));
            }
        }
    }
}
