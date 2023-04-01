package com.back.service;

import com.back.model.Sells;

import java.util.List;

public interface SellsService {

    public List<Sells> getSells();
    public void saveTurnSells (Long turnId);
}
