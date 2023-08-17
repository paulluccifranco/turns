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
@Table(name="PLATFORM_PARAMETER", uniqueConstraints =
        {  @UniqueConstraint(name = "ParameterKey", columnNames = { "PARAM_KEY"})})
public class PlatformParameter implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
    @Column(name = "PARAM_KEY", length = 30)
    private String key;
    @Column(name = "DESCRIPTION")
    private String description;
    @Column(name = "VALUE")
    private String value;
}
