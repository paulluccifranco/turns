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
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Table(name="DAILY_SELL")
@Getter
@Setter
@NoArgsConstructor
public class DailySell implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
    @Column(name = "TURN_ID")
    private Long turnId;
    @Column(name = "PRODUCT_ID")
    private Long productId;
    @Column(name = "PRODUCT_DESCRIPTION")
    private String description;
    @Column(name = "UNITS")
    private Integer units;
    @Column(name = "PRODUCT_PRICE")
    private BigDecimal productPrice;
}
