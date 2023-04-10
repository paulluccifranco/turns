package com.back.serviceImpl;

import com.back.model.Movement;
import com.back.repository.MovementRepository;
import com.back.service.MovementService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Service
public class MovementServiceImpl implements MovementService {

    private final MovementRepository movementRepository;

    @Override
    public void saveMovement(Movement movement) {
        movement.setDate(new Date());
        movementRepository.save(movement);
    }

    @Override
    public List<Movement> getMovementsByShift(Long shiftId) {
        return movementRepository.findAllByShiftIdOrderByDateDesc(shiftId);
    }
}
