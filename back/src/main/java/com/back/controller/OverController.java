package com.back.controller;

import com.back.model.Over;
import com.back.service.OverService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST,  RequestMethod.DELETE })
@RestController
@RequestMapping("/over")
@AllArgsConstructor
public class OverController {

    private final OverService overService;

    @GetMapping("")
    public List<Over> getAll() {
        return overService.getAll();
    }

    @GetMapping("/last")
    public Over getLast() {
        return overService.getLast();
    }

    @PostMapping("")
    public void save(@RequestBody Over over) {
        overService.save(over);
    }
}
