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
    List<Turn> findByShiftId(Long shiftId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE TURN t " +
            "SET t.PHONE = :phone, t.COMMENT = :comment, " +
            "t.NAME = :name " +
            "WHERE PERMANENT_TURN_ID = :permanentTurnId " , nativeQuery = true)
    void updatePermanentTurns(@Param("phone") String phone, @Param("comment") String comment, @Param("name") String name, @Param("permanentTurnId") Long permanentTurnId);

    @Query(value = "SELECT t.DAY, t.NAME FROM TURN t WHERE t.WEEK_DAY = :weekDay " +
            "AND t.HOUR = :hour AND t.FIELD = :field AND t.DAY > :day" , nativeQuery = true)
    Object[]  getTurnsForPermanent(@Param("field") int field, @Param("hour") int hour, @Param("weekDay") int weekDay, @Param("day") Date day);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM TURN t WHERE t.PERMANENT_TURN_ID = :permanentTurnId AND t.DAY > :date" , nativeQuery = true)
    void deletePermanentTurns(@Param("permanentTurnId") Long permanentTurnId, @Param("date") Date date);
}
