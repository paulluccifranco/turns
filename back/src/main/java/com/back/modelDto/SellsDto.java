package com.back.modelDto;

import com.back.model.Shift;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class SellsDto {

    private Long id;
    private Long productId;
    private String description;
    private Integer units;
    private BigDecimal productPrice;
    private Date date;
    private Shift shift;
}
