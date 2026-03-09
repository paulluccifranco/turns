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
@Table(name="daily_sell")
@Getter
@Setter
@NoArgsConstructor
public class DailySell implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "turn_id")
    private Long turnId;
    @Column(name = "product_id")
    private Long productId;
    @Column(name = "product_description")
    private String description;
    @Column(name = "units")
    private Integer units;
    @Column(name = "product_price")
    private BigDecimal productPrice;
}
