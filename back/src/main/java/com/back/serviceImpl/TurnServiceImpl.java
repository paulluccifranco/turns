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
}
