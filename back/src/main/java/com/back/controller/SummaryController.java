package com.back.controller;

import com.back.modelDto.SummaryDto;
import com.back.service.SummaryService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
@RestController
@RequestMapping("/summary")
@AllArgsConstructor
public class SummaryController {

    private final SummaryService summaryService;

    @GetMapping("/{shiftId}")
    public String getNormalReport(@PathVariable("shiftId") Long shiftId) {
        return summaryService.getNormalResume(shiftId);
    }
}
