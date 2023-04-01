package com.back.controller;

import com.back.model.CurrentAccount;
import com.back.modelDto.CurrentAccountDto;
import com.back.service.CurrentAccountService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST,  RequestMethod.DELETE })
@RestController
@RequestMapping("/current-account")
@AllArgsConstructor
public class CurrentAccountController {

    private final CurrentAccountService currentAccountService;

    @GetMapping("/permanent-turn/{id}")
    public List<CurrentAccountDto> getCurrenAccountByPermanentTurnId(@PathVariable Long id) {
        return currentAccountService.getCurrenAccountByPermanentTurnId(id);
    }

    @GetMapping("/turn/{id}")
    public List<CurrentAccountDto> getCurrenAccountByTurnId(@PathVariable Long id) {
        return currentAccountService.getCurrenAccountByTurnId(id);
    }

    @PostMapping("")
    public void saveCurrentAccount(@RequestBody CurrentAccount currentAccount) {
        currentAccountService.saveCurrentAccount(currentAccount);
    }
}
