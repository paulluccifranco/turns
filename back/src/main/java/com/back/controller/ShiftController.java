package com.back.controller;

import com.back.enums.ShiftEnum;
import com.back.model.Shift;
import com.back.modelDto.ShiftRequestDto;
import com.back.service.ShiftService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST,  RequestMethod.DELETE })
@RestController
@RequestMapping("/shift")
@AllArgsConstructor
public class ShiftController {

    private final ShiftService shiftService;

    @GetMapping("")
    public List<Shift> getAll() {
        return shiftService.getAll();
    }

    @GetMapping("/last")
    public Shift getLast() {
        return shiftService.getLast();
    }

    @PostMapping("/open")
    public ResponseEntity<Object> openShift(@RequestBody ShiftRequestDto shiftRequestDto) {
        Shift shift = new Shift();
        shift.setId(shiftRequestDto.getShiftId());
        if(!shiftRequestDto.getShiftDescription().equals("")) shift.setShiftEnum(ShiftEnum.valueOf(shiftRequestDto.getShiftDescription()));
        shift.setEmployee(shiftRequestDto.getEmployeeName());
        shift.setDate(new Date());
        try {
            shiftService.save(shift);
            return new ResponseEntity<>(null, HttpStatus.OK);
        }catch(Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/{id}/close")
    public void closeShift(@PathVariable("id") Long id) {
        shiftService.closeShift(id);
    }
}
