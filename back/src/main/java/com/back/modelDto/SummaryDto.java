package com.back.modelDto;

import com.back.model.Sells;
import com.back.model.Shift;
import com.back.model.Turn;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SummaryDto implements Serializable {

    private Shift shift;
    private List<Turn> turnList;
    private List<Sells> sellsList;
}
