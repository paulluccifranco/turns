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
import jakarta.persistence.UniqueConstraint;
import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="platform_parameter", uniqueConstraints =
        {  @UniqueConstraint(name = "ParameterKey", columnNames = { "param_key"})})
public class PlatformParameter implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "param_key", length = 30)
    private String key;
    @Column(name = "description")
    private String description;
    // "value" es palabra reservada en H2
    @Column(name = "\"value\"")
    private String value;
}
