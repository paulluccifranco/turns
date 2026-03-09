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
@Table(name="TURN", uniqueConstraints =
        {  @UniqueConstraint(name = "UniqueTurn", columnNames = { "DAY", "HOUR", "FIELD" })})
public class Turn implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
    @Column(name = "DAY")
    @Temporal(TemporalType.DATE)
    private Date day;
    @Column(name = "WEEK_DAY")
    private int weekDay;
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
    @Column(name = "STATE_ID")
    private int stateId;
    @Column(name = "PERMANENT_TURN_ID")
    private Long permanentTurnId;
    @Column(name = "TURN_VALUE")
    private BigDecimal turnValue;
    @Column(name = "SHIFT_ID")
    private Long shiftId;
    @Column(name = "PAYMENT_METHOD")
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
