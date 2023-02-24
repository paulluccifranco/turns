package com.back.controller;

import com.back.model.Turn;
import com.back.service.TurnService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST })
@RestController
@RequestMapping("/turns")
@AllArgsConstructor
public class TurnController {

    private TurnService turnService;

    @GetMapping("/{date}")
    public List<Turn> getTurns(@PathVariable("date") String dayUnformated) throws ParseException {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date day = simpleDateFormat.parse(dayUnformated);
        return turnService.getTurnsByDay(day);
    }
}
