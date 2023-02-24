package com.back.repository;

import com.back.model.PermanentTurn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermanentTurnRepository extends JpaRepository<PermanentTurn, Integer> {
}
