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
@Table(name="permanent_turn")
public class PermanentTurn implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    // "day" es palabra reservada en H2, se mapea explícitamente entre comillas
    @Column(name = "\"day\"")
    private int day;
    // "hour" es palabra reservada en H2, se mapea explícitamente entre comillas
    @Column(name = "\"hour\"")
    private int hour;
    // "field" es palabra reservada en H2, se mapea explícitamente entre comillas
    @Column(name = "\"field\"")
    private int field;
    @Column(name = "name")
    private String name;
    @Column(name = "phone")
    private String phone;
    @Column(name = "comment")
    private String comment;

    public PermanentTurn(int day, int field, int hour) {
        this.day = day;
        this.hour = hour;
        this.field = field;
    }
}
