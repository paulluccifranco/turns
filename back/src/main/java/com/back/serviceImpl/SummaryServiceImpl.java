package com.back.serviceImpl;

import com.back.enums.ProductTypeEnum;
import com.back.model.Movement;
import com.back.model.Sells;
import com.back.model.Shift;
import com.back.model.Turn;
import com.back.modelDto.SummaryDto;
import com.back.service.MovementService;
import com.back.service.SellsService;
import com.back.service.ShiftService;
import com.back.service.SummaryService;
import com.back.service.TurnService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@Service
public class SummaryServiceImpl implements SummaryService {

    private final TurnService turnService;
    private final SellsService sellsService;
    private final ShiftService shiftService;
    private final MovementService movementService;
    private static final Integer WANTING_TURN_STATUS_ID = 4;
    private static final Integer PAYED_TURN_STATUS_ID = 5;
    @Override
    public String getNormalResume(Long shiftId) {
        BigDecimal totalAmount = BigDecimal.ZERO;
        Integer payedTurns = 0;
        Integer wantingTurns = 0;
        HashMap<BigDecimal, Integer> turnHashMap = new HashMap<>();
        HashMap<String, Sells> sellsHashMap = new HashMap<>();
        HashMap<Integer, List<Sells>> sellsListByType = new HashMap<>();
        Shift shift = shiftService.getById(shiftId);
        List<Turn> turnList = turnService.getTurnsByShiftId(shiftId);
        List<Sells> sellsList = sellsService.getSellsByShiftId(shiftId);
        List<Movement> movementList = movementService.getMovementsByShift(shiftId);

        for(Turn turn: turnList) {
            if(turn.getStateId() == WANTING_TURN_STATUS_ID) wantingTurns = wantingTurns + 1;
            if(turn.getStateId() == PAYED_TURN_STATUS_ID) {
                payedTurns = payedTurns + 1;
                BigDecimal turnValue = turn.getTurnValue() == null ? BigDecimal.ZERO : turn.getTurnValue();
                if (!turnHashMap.containsKey(turnValue)) {
                    turnHashMap.put(turnValue, 0);
                }
                Integer oldValue = turnHashMap.get(turnValue);
                turnHashMap.put(turnValue, oldValue + 1);
                totalAmount = totalAmount.add(turnValue);
            }
        }

        StringBuilder messagge = new StringBuilder();
        messagge.append("Turno ");
        messagge.append(shift.getShiftEnum().name());
        messagge.append("\n");
        messagge.append("A cargo de ");
        messagge.append(shift.getEmployee());
        messagge.append("\n");
        messagge.append("\n");
        messagge.append(payedTurns + " Turnos: $");
        messagge.append(totalAmount);
        messagge.append("\n");
        messagge.append("\n");

        for (Map.Entry<BigDecimal, Integer> entry : turnHashMap.entrySet()) {
            BigDecimal value = entry.getKey();
            Integer units = entry.getValue();
            BigDecimal total = value.multiply(new BigDecimal(units));
            messagge.append("   " + "$" + value + "(" + units + "): $" + total);
            messagge.append("\n");
        }
        totalAmount = BigDecimal.ZERO;
        for(Sells sell : sellsList) {
            if(!sellsHashMap.containsKey(sell.getDescription())){
                sellsHashMap.put(sell.getDescription(), sell);
            }else {
                Sells auxSell = sellsHashMap.get(sell.getDescription());
                auxSell.setUnits(auxSell.getUnits() + sell.getUnits());
                sellsHashMap.put(sell.getDescription(), auxSell);
            }
            BigDecimal total = sell.getProductPrice().multiply(new BigDecimal(sell.getUnits()));
            totalAmount = totalAmount.add(total);
        }
        messagge.append("\n");
        messagge.append("Ventas: $" + totalAmount);
        messagge.append("\n");

        for (Map.Entry<String, Sells> entry : sellsHashMap.entrySet()) {
            if (!sellsListByType.containsKey(entry.getValue().getType())) {
                sellsListByType.put(entry.getValue().getType(), new ArrayList<>());
            }
            List<Sells> newValue = sellsListByType.get(entry.getValue().getType());
            newValue.add(entry.getValue());
            sellsListByType.put(entry.getValue().getType(), newValue);
        }

        for (Map.Entry<Integer, List<Sells>> entry : sellsListByType.entrySet()) {
            BigDecimal typeTotalAmount = BigDecimal.ZERO;
            for(Sells sell : entry.getValue()){
                BigDecimal total = sell.getProductPrice().multiply(new BigDecimal(sell.getUnits()));
                typeTotalAmount = typeTotalAmount.add(total);
            }
            messagge.append(" -" + ProductTypeEnum.getDescriptionByType(entry.getKey()) + ": $" + typeTotalAmount);
            messagge.append("\n");
            for(Sells sell : entry.getValue()){
                BigDecimal total = sell.getProductPrice().multiply(new BigDecimal(sell.getUnits()));
                messagge.append("     " + sell.getDescription() + "(" + sell.getUnits() + "): $" + total);
                messagge.append("\n");
            }
        }

        messagge.append("\n");
        messagge.append("Salidas: ");
        messagge.append("\n");
        for(Movement movement : movementList) {
            if(movement.getAmount().compareTo(BigDecimal.ZERO) == -1) {
                messagge.append("   " + movement.getDescription() + ": $" + movement.getAmount());
                messagge.append("\n");
            }
        }
        messagge.append("\n");
        messagge.append("Ingresos: ");
        messagge.append("\n");
        for(Movement movement : movementList) {
            if(movement.getAmount().compareTo(BigDecimal.ZERO) == 1) {
                messagge.append("   " + movement.getDescription() + ": $" + movement.getAmount());
                messagge.append("\n");
            }
        }
        messagge.append("\n");
        messagge.append("Faltaron " + wantingTurns + " Turnos");
        return messagge.toString();
    }
}
