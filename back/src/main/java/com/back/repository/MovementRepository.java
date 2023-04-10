package com.back.repository;

import com.back.model.Movement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovementRepository extends JpaRepository<Movement, Long> {

    public List<Movement> findAllByShiftIdOrderByDateDesc(Long shiftId);
}
