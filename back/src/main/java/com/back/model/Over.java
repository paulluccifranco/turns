package com.back.model;

import com.back.enums.Shift;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="OVER_SHIFT", uniqueConstraints =
        {  @UniqueConstraint(name = "UniqueTurn", columnNames = { "DAY", "SHIFT" })})
public class Over implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
    @Column(name = "DAY")
    @Temporal(TemporalType.DATE)
    private Date date;
    @Column(name = "SHIFT", length = 15)
    @Enumerated(EnumType.ORDINAL)
    private Shift shift;
    @Column(name = "EMPLOYEE", length = 40)
    private String employee;
    @Column(name = "WANTING_TURN")
    private Integer wantingTurn;
    @Column(name = "PAYED_TURN")
    private Integer payedTurn;
    @Column(name = "SELLS_AMOUNT")
    private BigDecimal sellsAmount;
}
