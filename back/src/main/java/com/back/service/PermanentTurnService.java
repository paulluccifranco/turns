package com.back.service;

import com.back.model.DeletedTurn;
import com.back.model.PermanentTurn;

import java.util.Date;
import java.util.List;

public interface PermanentTurnService {

    public List<PermanentTurn> getPermanentTurnsByDay(int day);
    public void deletePermanentTurn(Long id);
    public void savePermanentTurn(PermanentTurn permanentTurn);
    public Boolean getPermanentTurnByDayAndFieldAndHour(int day, int field, int Hour);
    public void updatePermanentTurn(String phone, String comment, String name, Long id);
    public Boolean getDeletedTurn(Date day, Long permanentTurnId);
    public void saveDeletedTurn(Date day, Long permanentTurnId);


}
