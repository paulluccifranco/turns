package com.back.modelDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MovementDto implements Serializable {

    private Long id;
    private String description;
    private BigDecimal amount;
    private Long shiftId;
    private String date;
}
