package com.back.serviceImpl;

import com.back.model.CurrentAccount;
import com.back.modelDto.CurrentAccountDto;
import com.back.repository.CurrentAccountRepository;
import com.back.service.CurrentAccountService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class CurrenAccountServiceImpl implements CurrentAccountService {

    private final CurrentAccountRepository currentAccountRepository;

    @Override
    public List<CurrentAccountDto> getCurrenAccountByPermanentTurnId(Long permanentTurnId) {
        List<CurrentAccount> currentAccountList = currentAccountRepository.findCurrenAccountByPermanentTurnIdOrderByIdDesc(permanentTurnId);
        List<CurrentAccountDto> currentAccountDtoList = new ArrayList<>();
        SimpleDateFormat format = new SimpleDateFormat("yyy-MM-dd hh:mm:ss");
        currentAccountList.forEach(currAcc -> {
            String formattedDate = format.format(currAcc.getDate());
            CurrentAccountDto accDto = new CurrentAccountDto(currAcc.getId(), currAcc.getPermanentTurnId(), currAcc.getTurnId(), currAcc.getDescription(), currAcc.getAmount(), formattedDate);
            currentAccountDtoList.add(accDto);
        });
        return currentAccountDtoList;
    }

    @Override
    public List<CurrentAccountDto> getCurrenAccountByTurnId(Long turnId) {
        List<CurrentAccount> currentAccountList = currentAccountRepository.findCurrenAccountByTurnIdOrderByIdDesc(turnId);
        List<CurrentAccountDto> currentAccountDtoList = new ArrayList<>();
        SimpleDateFormat format = new SimpleDateFormat("yyy-MM-dd hh:mm:ss");
        currentAccountList.forEach(currAcc -> {
            String formattedDate = format.format(currAcc.getDate());
            CurrentAccountDto accDto = new CurrentAccountDto(currAcc.getId(), currAcc.getPermanentTurnId(), currAcc.getTurnId(), currAcc.getDescription(), currAcc.getAmount(), formattedDate);
            currentAccountDtoList.add(accDto);
        });
        return currentAccountDtoList;
    }

    @Override
    public void saveCurrentAccount(CurrentAccount currentAccount) {
        currentAccount.setDate(new Date());
        currentAccountRepository.save(currentAccount);

    }
}
