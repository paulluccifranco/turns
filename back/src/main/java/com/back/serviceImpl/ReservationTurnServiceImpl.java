package com.back.serviceImpl;

import com.back.model.ReservationTurn;
import com.back.repository.ReservationTurnRepository;
import com.back.service.ReservationTurnService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ReservationTurnServiceImpl implements ReservationTurnService {

    private final ReservationTurnRepository reservationTurnRepository;

    @Override
    public List<ReservationTurn> getReservationTurnList() {
        return reservationTurnRepository.findAll();
    }

    @Override
    public void saveReservationTurn(ReservationTurn reservationTurn) {
        reservationTurnRepository.save(reservationTurn);
    }

    @Override
    public void deleteReservationTurn(Long id) {
        reservationTurnRepository.deleteById(id);
    }
}
