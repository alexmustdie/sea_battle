package com.epam.game.model;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class Game {

     private List<Field> fields;
     private String winner;
     private GameStatus status;

    public Game() {
        this.fields = new ArrayList<>(2);
    }

    public enum GameStatus {
         STARTED, FINISHED
     }
}
