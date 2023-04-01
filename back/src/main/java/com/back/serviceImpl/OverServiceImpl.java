package com.back.serviceImpl;

import com.back.model.Over;
import com.back.repository.OverRepository;
import com.back.service.OverService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class OverServiceImpl implements OverService {

    private final OverRepository overRepository;

    @Override
    public List<Over> getAll() {
        return overRepository.findAllByOrderByDateDesc();
    }

    @Override
    public Over getLast() {
        return overRepository.findTopByOrderByIdDesc();
    }

    @Override
    public void save(Over over) {
        overRepository.save(over);
    }
}
