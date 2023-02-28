package com.back.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="TURN")
public class Turn implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
    @Column(name = "DAY")
    @Temporal(TemporalType.DATE)
    private Date day;
    @Column(name = "HOUR")
    private int hour;
    @Column(name = "FIELD")
    private int field;
    @Column(name = "NAME")
    private String name;
    @Column(name = "LASTNAME")
    private String lastname;
    @Column(name = "PHONE")
    private String phone;
    @Column(name = "DNI")
    private String dni;
    @Column(name = "STATE_ID")
    private int stateId;

    public Turn(int hour, int field, Date date) {
        this.hour = hour;
        this.field = field;
        this.day = date;
        this.stateId = 1;
    }
}
