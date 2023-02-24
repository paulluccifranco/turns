package com.back.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;
import java.io.Serializable;

@Data
@Entity
@NoArgsConstructor
@Table(name="PERMANENT_TURN")
@IdClass(PermanentTurnKey.class)
public class PermanentTurn implements Serializable {

    @Id
    @Column(name = "DAY")
    private int day;
    @Id
    @Column(name = "HOUR")
    private int hour;
    @Id
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
}
