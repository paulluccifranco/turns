package com.back.modelDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ShiftRequestDto implements Serializable {

    private Long shiftId;
    private String employeeName;
    private String shiftDescription;
}
