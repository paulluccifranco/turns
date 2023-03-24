package com.back.repository;

import com.back.model.Sells;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellsRepository extends JpaRepository<Sells, Long> {
}
