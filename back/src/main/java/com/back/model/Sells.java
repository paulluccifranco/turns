package com.back.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name="sells")
@Getter
@Setter
@NoArgsConstructor
public class Sells implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="product_id")
    private Long productId;
    @Column(name = "turn_id")
    private Long turnId;
    @Column(name="description")
    private String description;
    @Column(name = "units")
    private Integer units;
    @Column(name = "product_price")
    private BigDecimal productPrice;
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;
    @Column(name = "shift")
    private Long shiftId;
    @Column(name = "type")
    private Integer type = 1;
    @Column(name = "payment_method")
    private Integer paymentMethod = 1;

    public Sells(Long productId, String description, Integer units, BigDecimal productPrice, Date date, Long shiftId, Long turnId, Integer type, Integer paymentMethodId) {
        this.productId = productId;
        this.description = description;
        this.units = units;
        this.productPrice = productPrice;
        this.date = date;
        this.shiftId = shiftId;
        this.turnId = turnId;
        this.type = type;
        this.paymentMethod = paymentMethodId;
    }
}
