package com.back.repository;

import com.back.enums.ShiftEnum;
import com.back.model.Shift;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface ShiftRepository extends JpaRepository<Shift, Long> {

    public List<Shift> findAllByOrderByDateDesc();
    public Shift findTopByOrderByIdDesc();
    public Shift findByDateAndShiftEnum(Date date, ShiftEnum shiftEnum);
}
