package com.back.controller;

import com.back.model.DailySell;
import com.back.service.DailySellService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
@RequestMapping("/daily-sell")
@AllArgsConstructor
public class DailySellController {

    private final DailySellService dailySellService;

    @GetMapping("")
    public List<DailySell> getDailySellList()  {
        return dailySellService.getDailySellList();
    }

    @GetMapping("/{id}")
    public DailySell getDailySell(@PathVariable("id") Long id)  {
        return dailySellService.getDailySell(id);
    }

    @GetMapping("/turn/{id}")
    public List<DailySell> getDailySellBuyTurnId(@PathVariable("id") Long turnId)  {
        return dailySellService.getDailySellListByTurnId(turnId);
    }

    @DeleteMapping("/{id}")
    public void deleteDailySell(@PathVariable("id") Long id){
        dailySellService.deleteDailySell(id);
    }

    @PostMapping()
    public void saveDailySell(@RequestBody DailySell dailySell){
        dailySellService.saveDailySell(dailySell);
    }
}
