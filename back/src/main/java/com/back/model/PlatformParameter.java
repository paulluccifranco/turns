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
import javax.persistence.UniqueConstraint;
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
