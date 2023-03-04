package com.back.repository;

import com.back.model.PermanentTurn;
import com.back.model.Turn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Repository
public interface PermanentTurnRepository extends JpaRepository<PermanentTurn, Long> {

    public List<PermanentTurn> findByDay(int day);

    PermanentTurn findByDayAndFieldAndHour(int day, int field, int Hour);

    @Modifying
    @Transactional
    @Query(value = "UPDATE PERMANENT_TURN t " +
            "SET t.PHONE = :phone, t.COMMENT = :comment, " +
            "t.NAME = :name " +
            "WHERE ID = :id " , nativeQuery = true)
    void updatePermanentTurn(@Param("phone") String phone, @Param("comment") String comment, @Param("name") String name, @Param("id") Long id);
}
