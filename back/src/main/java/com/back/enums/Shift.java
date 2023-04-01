package com.back.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum Shift {

    MORNING(1L, "Mañana"),
    AFTERNOON(2L, "Tarde");


    Long id;
    String description;
}
