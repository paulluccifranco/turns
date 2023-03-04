package com.back.repository;

import com.back.model.Turn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface TurnRepository extends JpaRepository<Turn, Long> {

    public List<Turn> findByDay(Date day);

    public Optional<Turn> findById(Long id);

    Turn findByDayAndFieldAndHour(Date day, int field, int Hour);

    @Modifying
    @Transactional
    @Query(value = "UPDATE TURN t " +
            "SET t.PHONE = :phone, t.COMMENT = :comment, " +
            "t.STATE_ID = :stateId, t.NAME = :name " +
            "WHERE ID = :id " , nativeQuery = true)
    void updateTurn(@Param("phone") String phone, @Param("comment") String comment, @Param("name") String name, @Param("stateId") Integer stateId, @Param("id") Long id);

    @Modifying
    @Transactional
    @Query(value = "UPDATE PERMANENT_TURN t " +
            "SET t.PHONE = :phone, t.COMMENT = :comment, " +
            "t.NAME = :name " +
            "WHERE ID = :permanentTurnId " , nativeQuery = true)
    void updatePermanentTurns(@Param("phone") String phone, @Param("comment") String comment, @Param("name") String name, @Param("permanentTurnId") Long permanentTurnId);
}
