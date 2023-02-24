package com.back.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
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
@IdClass(TurnKey.class)
public class Turn implements Serializable {

    @Id
    @Column(name = "DAY")
    @Temporal(TemporalType.DATE)
    private Date day;
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
