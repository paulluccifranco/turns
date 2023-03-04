package com.back.serviceImpl;

import com.back.model.DeletedTurn;
import com.back.model.PermanentTurn;
import com.back.model.Turn;
import com.back.repository.DeletedTurnRepository;
import com.back.repository.PermanentTurnRepository;
import com.back.service.PermanentTurnService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class PermanentTurnServiceImpl implements PermanentTurnService {

    private PermanentTurnRepository permanentTurnRepository;
    private DeletedTurnRepository deletedTurnRepository;

    @Override
    public List<PermanentTurn> getPermanentTurnsByDay(int day) {
        return permanentTurnRepository.findByDay(day);
    }

    @Override
    public void deletePermanentTurn(Long id) {
        permanentTurnRepository.deleteById(id);
    }

    @Override
    public void savePermanentTurn(PermanentTurn permanentTurn) {
        permanentTurnRepository.save(permanentTurn);
    }

    @Override
    public Boolean getPermanentTurnByDayAndFieldAndHour(int day, int field, int hour) {
        PermanentTurn turn = permanentTurnRepository.findByDayAndFieldAndHour(day, field, hour);
        if(turn != null) return Boolean.TRUE;
        return Boolean.FALSE;

    }

    @Override
    public void updatePermanentTurn(String phone, String comment, String name, Long id) {
        permanentTurnRepository.updatePermanentTurn(phone, comment, name, id);
    }

    @Override
    public Boolean getDeletedTurn(Date day, Long permanentTurnId) {
        DeletedTurn deletedTurn = deletedTurnRepository.findByDayAndPermanentTurnId(day, permanentTurnId);
        if(deletedTurn != null) return Boolean.TRUE;
        return Boolean.FALSE;
    }

    @Override
    public void saveDeletedTurn(Date day, Long permanentTurnId) {
        DeletedTurn deletedTurn = new DeletedTurn(day, permanentTurnId);
        deletedTurnRepository.save(deletedTurn);
    }
}
