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

import javax.websocket.server.PathParam;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST,  RequestMethod.DELETE })
@RestController
@RequestMapping("/turns")
@AllArgsConstructor
public class TurnController {

    private TurnService turnService;
    private PermanentTurnService permanentTurnService;

    @GetMapping("/{date}")
    public List<Turn> getTurns(@PathVariable("date") String dayUnformated)  {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("MMM dd yyyy");
        SimpleDateFormat simpleDateFormat2 = new SimpleDateFormat("yyyy-MM-dd");
        Date day = null;
        try {
            String date = dayUnformated.substring(4,15);
            day = simpleDateFormat.parse(date);
        } catch (Exception e) {
            try{
                String date2 = dayUnformated.substring(0,10);
                day = simpleDateFormat2.parse(date2);
            }catch(Exception ex){

            }
        }
        Calendar cal = Calendar.getInstance();
        cal.setTime(day);
        int dayOfWeek = cal.get(Calendar.DAY_OF_WEEK);
        List<PermanentTurn> permanentTurns = permanentTurnService.getPermanentTurnsByDay(dayOfWeek);
        for(PermanentTurn permTurn : permanentTurns){
            Turn newTurn = new Turn(day, permTurn.getHour(),permTurn.getField(),permTurn.getName(),permTurn.getPhone(),permTurn.getComment(),permTurn.getId(),dayOfWeek);
            try{
                if(!permanentTurnService.getDeletedTurn(day, permTurn.getId())) turnService.saveTurn(newTurn);
            }catch(Exception ex){
                System.out.println(ex);
            }
        }
        List<Turn> turnBase = turnService.getTurnsByDay(day);
        List<Turn> turns = new ArrayList<>();
        for(int j=1; j<5; j++){
            for(int i=1; i<13;i++){
                Turn turnExist = new Turn(i, j, day, dayOfWeek);
                for(Turn turn : turnBase){
                    if(turn.getHour() == i && turn.getField() == j) turnExist = turn;
                }
                turns.add(turnExist);
            }
        }
        return turns;
    }


    @DeleteMapping("/{id}")
    public void deleteTurn(@PathVariable("id") Long id){
        Turn turn = turnService.getTurnById(id);
        if(turn.getPermanentTurnId() != null) permanentTurnService.saveDeletedTurn(turn.getDay(), turn.getPermanentTurnId());
        turnService.deleteTurn(id);
    }

    @PostMapping()
    public void saveTurn(@RequestBody Turn turn){
        if(turn.getId() != null){
            if(turn.getPermanentTurnId() != null){
                permanentTurnService.updatePermanentTurn(turn.getPhone(), turn.getComment(), turn.getName(), turn.getPermanentTurnId());
                turnService.updatePermanentTurns(turn.getPhone(), turn.getComment(), turn.getName(), turn.getPermanentTurnId());
            }
            turnService.updateTurn(turn.getPhone(), turn.getComment(), turn.getName(), turn.getStateId(), turn.getId());
        }else{
            turnService.saveTurn(turn);
        }
    }
}
