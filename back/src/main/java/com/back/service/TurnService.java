package com.back.service;

import com.back.model.Turn;

import java.util.Date;
import java.util.List;

public interface TurnService {

    public List<Turn> getTurnsByDay(Date day);

    public void deleteTurn(Long id);

    public void saveTurn(Turn turn);

    public Boolean getTurnByDayAndFieldAndHour(Date day, int field, int Hour);

    public void updateTurn(String phone, String comment, String name, Integer stateId, Long id);

    public Turn getTurnById(Long id);

    public void updatePermanentTurns(String phone, String comment, String name,  Long permanentTurnId);

}
