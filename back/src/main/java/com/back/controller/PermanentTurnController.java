package com.back.controller;

import com.back.model.PermanentTurn;
import com.back.model.Turn;
import com.back.service.PermanentTurnService;
import com.back.service.TurnService;
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

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST,  RequestMethod.DELETE })
@RestController
@RequestMapping("/permanent-turns")
@AllArgsConstructor
public class PermanentTurnController {

    private PermanentTurnService permanentTurnService;
    private TurnService turnService;

    @GetMapping("/{date}")
    public List<PermanentTurn> getTurns(@PathVariable("date") int day)  {

        List<PermanentTurn> turnBase = permanentTurnService.getPermanentTurnsByDay(day);
        List<PermanentTurn> turns = new ArrayList<>();
        for(int j=1; j<5; j++){
            for(int i=1; i<13;i++){
                PermanentTurn turnExist = new PermanentTurn(day,j, i);
                for(PermanentTurn turn : turnBase){
                    if(turn.getHour() == i && turn.getField() == j) turnExist = turn;
                }
                turns.add(turnExist);
            }
        }
        return turns;
    }


    @DeleteMapping("/{id}")
    public void deleteTurn(@PathVariable("id") Long id){
        turnService.deletePermanentTurns(id, new Date());
        permanentTurnService.deletePermanentTurn(id);
    }

    @PostMapping()
    public List<Turn> saveTurn(@RequestBody PermanentTurn turn){
        List<Turn> turnList = turnService.getTurnsForPermanent(turn.getField(), turn.getHour(), turn.getDay(), new Date());
        if(turn.getId() != null){
            permanentTurnService.updatePermanentTurn(turn.getPhone(), turn.getComment(), turn.getName(), turn.getId());
        }else{
            permanentTurnService.savePermanentTurn(turn);
        }

        return turnList;
    }
}
