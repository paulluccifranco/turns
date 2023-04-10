package com.back.serviceImpl;

import com.back.model.Shift;
import com.back.repository.ShiftRepository;
import com.back.service.ShiftService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@AllArgsConstructor
public class ShiftServiceImpl implements ShiftService {

    private final ShiftRepository shiftRepository;

    @Override
    public List<Shift> getAll() {
        return shiftRepository.findAllByOrderByDateDesc();
    }

    @Override
    public Shift getLast() {
        Shift shift = shiftRepository.findTopByOrderByIdDesc();
        if (shift == null) shift = new Shift();
        return shift;
    }

    @Override
    public Shift getById(Long shiftId) {
        return shiftRepository.getReferenceById(shiftId);
    }

    @Override
    public void save(Shift shift) {
        shiftRepository.save(shift);
    }

    @Override
    public void closeShift(Long id) {
        Shift shift = shiftRepository.getReferenceById(id);
        shiftRepository.save(shift);
        Shift newShift = new Shift();
        shiftRepository.save(newShift);
    }
}
