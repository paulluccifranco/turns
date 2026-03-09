package com.back.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="turn", uniqueConstraints =
        {  @UniqueConstraint(name = "UniqueTurn", columnNames = { "day", "hour", "field" })})
public class Turn implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    // "day" es palabra reservada en H2
    @Column(name = "\"day\"")
    @Temporal(TemporalType.DATE)
    private Date day;
    @Column(name = "week_day")
    private int weekDay;
    // "hour" es palabra reservada en H2
    @Column(name = "\"hour\"")
    private int hour;
    // "field" es palabra reservada en H2
    @Column(name = "\"field\"")
    private int field;
    @Column(name = "name")
    private String name;
    @Column(name = "phone")
    private String phone;
    @Column(name = "comment")
    private String comment;
    @Column(name = "state_id")
    private int stateId;
    @Column(name = "permanent_turn_id")
    private Long permanentTurnId;
    @Column(name = "turn_value")
    private BigDecimal turnValue;
    @Column(name = "shift_id")
    private Long shiftId;
    @Column(name = "payment_method")
    private Integer paymentMethod = 1;

    public Turn(int hour, int field, Date date, int weekDay) {
        this.hour = hour;
        this.field = field;
        this.day = date;
        this.stateId = 1;
        this.weekDay = weekDay;
    }

    public Turn(Date day, int hour, int field, String name, String phone, String comment, Long permanentTurnId, int weekDay) {
        this.day = day;
        this.hour = hour;
        this.field = field;
        this.name = name;
        this.phone = phone;
        this.comment = comment;
        this.stateId = 1;
        this.permanentTurnId = permanentTurnId;
        this.weekDay = weekDay;
    }
}
