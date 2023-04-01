package com.back.modelDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CurrentAccountDto implements Serializable {

    private Long id;
    private Long permanentTurnId;
    private Long turnId;
    private String description;
    private BigDecimal amount;
    private String date;
}
