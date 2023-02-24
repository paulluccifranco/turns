package com.back.repository;

import com.back.model.Turn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface TurnRepository extends JpaRepository<Turn, Integer> {

    public List<Turn> findByDay(Date day);

}
