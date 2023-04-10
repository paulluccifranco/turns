package com.back.service;

import com.back.model.Shift;

import java.util.List;

public interface ShiftService {

    public List<Shift> getAll();
    public Shift getLast();
    public Shift getById(Long shiftId);
    public void save(Shift shift);
    public void closeShift(Long id);
}
