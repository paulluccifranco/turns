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
@Table(name="current_account")
@Getter
@Setter
@NoArgsConstructor
public class CurrentAccount implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long Id;
    @Column(name="permanent_turn_id")
    private Long permanentTurnId;
    @Column(name="turn_id")
    private Long turnId;
    @Column(name="description")
    private String description;
    @Column(name="amount")
    private BigDecimal amount;
    @Column(name = "shift_id")
    private Long shiftId;
    @Column(name = "date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;
}
