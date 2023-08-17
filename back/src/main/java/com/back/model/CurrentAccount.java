package com.back.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name="CURRENT_ACCOUNT")
@Getter
@Setter
@NoArgsConstructor
public class CurrentAccount implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    private Long Id;
    @Column(name="PERMANENT_TURN_ID")
    private Long permanentTurnId;
    @Column(name="TURN_ID")
    private Long turnId;
    @Column(name="DESCRIPTION")
    private String description;
    @Column(name="AMOUNT")
    private BigDecimal amount;
    @Column(name = "SHIFT_ID")
    private Long shiftId;
    @Column(name = "DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;
}
