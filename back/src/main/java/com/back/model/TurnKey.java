package com.back.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.io.Serializable;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
public class TurnKey implements Serializable {

    private Date day;
    private int hour;
    private int field;
}
