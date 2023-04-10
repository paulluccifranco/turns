package com.back.repository;

import com.back.model.Sells;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface SellsRepository extends JpaRepository<Sells, Long> {

    public List<Sells> findAllByShiftIdOrderByDateDesc(Long shiftId);
    public List<Sells> findByDateBetween(Date from, Date to);
    public List<Sells> findByShiftId(Long shiftId);
}
