package com.epam.game.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Shot {

    private int x;
    private int y;
    private ShotStatus status;

    public enum ShotStatus {
        SUCCESSFUL, MISSED
    }
}
