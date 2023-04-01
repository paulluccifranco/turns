package com.back.service;

import com.back.model.CurrentAccount;
import com.back.modelDto.CurrentAccountDto;

import java.util.List;

public interface CurrentAccountService {

    public List<CurrentAccountDto> getCurrenAccountByPermanentTurnId(Long permanentTurnId);
    List<CurrentAccountDto> getCurrenAccountByTurnId(Long turnId);
    public void saveCurrentAccount(CurrentAccount currentAccount);
}
