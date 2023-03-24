package com.back.service;

import com.back.model.DailySell;

import java.util.List;

public interface DailySellService {

    public List<DailySell> getDailySellList();
    public List<DailySell> getDailySellListByTurnId(Long turnId);
    public DailySell getDailySell(Long id);
    public void saveDailySell(DailySell dailySell);
    public void deleteDailySell(Long id);
}
