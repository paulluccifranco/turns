package com.back.repository;

import com.back.model.Over;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OverRepository extends JpaRepository<Over, Long> {

    public List<Over> findAllByOrderByDateDesc();
    public Over findTopByOrderByIdDesc();
}
