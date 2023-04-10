package com.back.controller;

import com.back.model.Movement;
import com.back.modelDto.CurrentAccountDto;
import com.back.modelDto.MovementDto;
import com.back.service.MovementService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
@RestController
@RequestMapping("/movement")
@AllArgsConstructor
public class MovementController {

    private final MovementService movementService;

    @GetMapping("/{shiftId}")
    public List<MovementDto> getMovementsByShift(@PathVariable("shiftId") Long shiftId) {
        List<MovementDto> responseList = new ArrayList<>();
        List<Movement> movementList = movementService.getMovementsByShift(shiftId);
        SimpleDateFormat format = new SimpleDateFormat("yyy-MM-dd hh:mm:ss");
        movementList.forEach(mov -> {
            String formattedDate = format.format(mov.getDate());
            MovementDto accDto = new MovementDto(mov.getId(), mov.getDescription(), mov.getAmount(), mov.getShiftId(), formattedDate);
            responseList.add(accDto);
        });
        return responseList;
    }

    @PostMapping("")
    public void saveMovement(@RequestBody Movement movement) {
        movementService.saveMovement(movement);
    }
}
