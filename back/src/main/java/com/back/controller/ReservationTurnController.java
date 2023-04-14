package com.back.controller;

import com.back.model.ReservationTurn;
import com.back.service.ReservationTurnService;
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
@RequestMapping("/reservation")
@AllArgsConstructor
public class ReservationTurnController {

    private final ReservationTurnService reservationTurnService;

    @GetMapping("")
    public List<ReservationTurn> getReservationTurnList(){
        return reservationTurnService.getReservationTurnList();
    }

    @GetMapping("/{field}/{hour}/{day}")
    public ReservationTurn getReservationTurnByFieldAndHourAndDay(@PathVariable("field") Long field, @PathVariable("hour") Long hour, @PathVariable("day") String day){
        return null;
    }

    @PostMapping("")
    public void saveReservationTurn(@RequestBody ReservationTurn reservationTurn) {
        reservationTurnService.saveReservationTurn(reservationTurn);
    }

    @DeleteMapping("/{id}")
    public void deleteReservationTurn(@PathVariable("id") Long id) {
        reservationTurnService.deleteReservationTurn(id);
    }
}
