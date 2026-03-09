package com.back.model;

import lombok.Generated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="PRODUCT", uniqueConstraints =
        {  @UniqueConstraint(name = "ProductCode", columnNames = { "CODE" })})
public class Product implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
    @Column(name = "DESCRIPTION", length = 40)
    private String description;
    @Column(name = "CODE", length = 30)
    private String code;
    @Column(name = "PRICE")
    private BigDecimal price;
    @Column(name = "STOCK")
    private Integer stock;
    @Column(name = "TYPE")
    private Integer type = 1;
}
