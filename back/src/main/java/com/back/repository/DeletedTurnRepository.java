package com.back.repository;

import com.back.model.DeletedTurn;
import com.back.model.Turn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface DeletedTurnRepository extends JpaRepository<DeletedTurn, Long> {

    public DeletedTurn findByDayAndPermanentTurnId(Date day, Long permanentTurnId);
}
