package com.back.controller;

import com.back.model.Sells;
import com.back.service.SellsService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
@RestController
@RequestMapping("/sells")
@AllArgsConstructor
public class SellsController {

    private final SellsService sellsService;

    @GetMapping("")
    public List<Sells> getSellsList() {
        return sellsService.getSells();
    }

    @PostMapping("/{turnId}/{paymentMethodId}")
    public void saveSells(@PathVariable Long turnId, @PathVariable Integer paymentMethodId) {
        sellsService.saveTurnSells(turnId, paymentMethodId);
    }

}
