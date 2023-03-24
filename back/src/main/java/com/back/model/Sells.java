package com.back.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Table(name="SELLS")
@Getter
@Setter
public class Sells implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    private Long id;
    @Column(name="PRODUCT_ID")
    private Long productId;
    @Column(name="DESCRIPTION")
    private String description;
    @Column(name = "PRODUCT_DESCRIPTION")
    private Integer units;
    @Column(name = "PRODUCT_PRICE")
    private BigDecimal productPrice;
}
