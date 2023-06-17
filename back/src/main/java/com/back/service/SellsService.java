package com.back.service;

import com.back.model.Sells;

import java.util.Date;
import java.util.List;

public interface SellsService {

    public List<Sells> getSells();
    public void saveTurnSells (Long turnId, Integer paymentMethodId);
    public List<Sells> getSellsBetweenDates(Date from, Date to);
    public List<Sells> getSellsByShiftId(Long shiftId);
}
