package com.back.service;

import com.back.model.Movement;

import java.util.List;

public interface MovementService {

    public void saveMovement(Movement movement);
    public List<Movement> getMovementsByShift(Long shiftId);
}
