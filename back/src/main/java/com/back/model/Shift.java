package com.back.model;

import com.back.enums.ShiftEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.io.Serializable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="SHIFT", uniqueConstraints =
        {  @UniqueConstraint(name = "UniqueTurn", columnNames = { "DAY", "SHIFT" })})
public class Shift implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
    @Column(name = "DAY")
    @Temporal(TemporalType.DATE)
    private Date date;
    @Column(name = "SHIFT", length = 15)
    @Enumerated(EnumType.STRING)
    private ShiftEnum shiftEnum;
    @Column(name = "EMPLOYEE", length = 40)
    private String employee;
}
