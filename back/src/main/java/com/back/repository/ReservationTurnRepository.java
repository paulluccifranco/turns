package com.back.repository;

import com.back.model.ReservationTurn;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;

public interface ReservationTurnRepository extends JpaRepository<ReservationTurn, Long> {

    public ReservationTurn findReservationTurnByFieldAndHourAndDay(int field, int hour, int day);
}
