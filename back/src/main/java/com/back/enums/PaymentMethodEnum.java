package com.back.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum PaymentMethodEnum {

    CASH(1, "Efectivo"),
    TRANSFER(2, "Transferencia");

    Integer id;
    String description;

    public static String getDescriptionById(Integer id) {
        for(PaymentMethodEnum pme : PaymentMethodEnum.values()){
            if(pme.getId() == id) return pme.description;
        }
        return "";
    }
}
