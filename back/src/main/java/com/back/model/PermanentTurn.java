package com.back.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.io.Serializable;

@Data
@Entity
@NoArgsConstructor
@Table(name="PERMANENT_TURN")
public class PermanentTurn implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
    @Column(name = "DAY")
    private int day;
    @Column(name = "HOUR")
    private int hour;
    @Column(name = "FIELD")
    private int field;
    @Column(name = "NAME")
    private String name;
    @Column(name = "PHONE")
    private String phone;
    @Column(name = "COMMENT")
    private String comment;

    public PermanentTurn(int day, int field, int hour) {
        this.day = day;
        this.hour = hour;
        this.field = field;
    }
}
