package com.back.model;

import lombok.AllArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

@AllArgsConstructor
public class PermanentTurnKey implements Serializable {

    private int day;
    private int hour;
    private int field;
}
