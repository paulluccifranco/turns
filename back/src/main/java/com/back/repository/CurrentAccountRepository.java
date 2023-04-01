package com.back.repository;

import com.back.model.CurrentAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CurrentAccountRepository extends JpaRepository<CurrentAccount, Long> {

    List<CurrentAccount> findCurrenAccountByPermanentTurnIdOrderByIdDesc(Long permanentTurnId);
    List<CurrentAccount> findCurrenAccountByTurnIdOrderByIdDesc(Long turnId);
}
