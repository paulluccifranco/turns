package com.back.repository;

import com.back.model.DailySell;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DailySellRepository extends JpaRepository<DailySell, Long> {

    public List<DailySell> findByTurnId(Long id);
}
