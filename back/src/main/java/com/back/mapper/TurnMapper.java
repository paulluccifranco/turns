package com.back.mapper;

import com.back.model.Turn;
import com.back.util.RawIteratorMapper;

import java.util.ArrayList;
import java.util.List;

public class TurnMapper {

    public static List<Turn> mapTurnList(Object[] rawRequests) {
        List<Turn> result = new ArrayList<>();
        for (Object request: rawRequests){
            result.add(mapTurn(request));
        }
        return result;
    }

    public static Turn mapTurn(Object rawObject) {
        Turn turn = new Turn();
        Object[] rawTurn = (Object[]) rawObject;
        RawIteratorMapper iteratorMapper = new RawIteratorMapper(rawTurn);
        turn.setDay(iteratorMapper.nextDate());
        turn.setName(iteratorMapper.nextString());
        return turn;
    }
}
