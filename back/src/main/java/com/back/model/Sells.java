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
@Table(name="SELLS")
@Getter
@Setter
@NoArgsConstructor
public class Sells implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    private Long id;
    @Column(name="PRODUCT_ID")
    private Long productId;
    @Column(name = "TURN_ID")
    private Long turnId;
    @Column(name="DESCRIPTION")
    private String description;
    @Column(name = "PRODUCT_DESCRIPTION")
    private Integer units;
    @Column(name = "PRODUCT_PRICE")
    private BigDecimal productPrice;
    @Column(name = "DATE")
    @Temporal(TemporalType.DATE)
    private Date date;
    @Column(name = "SHIFT")
    private Long shiftId;

    public Sells(Long productId, String description, Integer units, BigDecimal productPrice, Date date, Long shiftId, Long turnId) {
        this.productId = productId;
        this.description = description;
        this.units = units;
        this.productPrice = productPrice;
        this.date = date;
        this.shiftId = shiftId;
        this.turnId = turnId;
    }
}
