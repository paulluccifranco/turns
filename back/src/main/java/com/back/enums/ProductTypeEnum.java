package com.back.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@AllArgsConstructor
@Getter
public enum ProductTypeEnum {

    OTROS(1, "Otros"),
    BEBIDAS(2, "Bebidas"),
    ACCESORIOS(3, "Accesorios"),
    COMIDA(4, "Comida");

    Integer typeId;
    String description;

    public static String getDescriptionByType(Integer typeId) {
        for(ProductTypeEnum pte : ProductTypeEnum.values()){
            if(pte.getTypeId() == typeId) return pte.description;
        }
        return "";
    }
}