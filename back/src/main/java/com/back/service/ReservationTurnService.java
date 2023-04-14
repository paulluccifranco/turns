package com.back.service;

import com.back.model.ReservationTurn;

import java.util.List;

public interface ReservationTurnService {

    public List<ReservationTurn> getReservationTurnList();
    public void saveReservationTurn(ReservationTurn reservationTurn);
    public void deleteReservationTurn(Long id);
}
