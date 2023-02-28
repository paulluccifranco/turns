package com.back.serviceImpl;

import com.back.model.Turn;
import com.back.repository.TurnRepository;
import com.back.service.TurnService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class TurnServiceImpl implements TurnService {

    private TurnRepository turnRepository;

    @Override
    public List<Turn> getTurnsByDay(Date day) {
        return turnRepository.findByDay(day);
    }

    @Override
    public void deleteTurn(Long id) {
        turnRepository.deleteById(id);
    }

    @Override
    public void saveTurn(Turn turn) {
        turnRepository.save(turn);
    }

    @Override
    public Boolean getTurnByDayAndFieldAndHour(Date day, int field, int hour) {
        Turn turn = turnRepository.findByDayAndFieldAndHour(day, field, hour);
        if(turn != null) return Boolean.TRUE;
        return Boolean.FALSE;
    }

    @Override
    public void updateTurn(String dni, String name, Integer stateId, Long id) {
        turnRepository.updateTurn(dni, name, stateId, id);
    }
}
