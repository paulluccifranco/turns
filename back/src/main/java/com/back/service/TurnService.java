package com.back.service;

import com.back.model.Turn;

import java.util.Date;
import java.util.List;

public interface TurnService {

    public List<Turn> getTurnsByDay(Date day);
}
