package com.back.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
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
    private Long id;
    @Column(name="PERMANENT_TURN_ID")
    private Long permanentTurnId;
    @Column(name="TURN_ID")
    private Long turnId;
    @Column(name="DESCRIPTION")
    private String description;
    @Column(name="AMOUNT")
    private BigDecimal amount;

    @Column(name = "DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;
}
