package com.back.serviceImpl;

import com.back.model.DailySell;
import com.back.model.Sells;
import com.back.repository.SellsRepository;
import com.back.service.DailySellService;
import com.back.service.SellsService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class SellsServiceImpl implements SellsService {

    private final SellsRepository sellsRepository;
    private final DailySellService dailySellService;

    @Override
    public List<Sells> getSells() {
        List<Sells> sellsList = sellsRepository.findAllByOrderByDateDesc();
        return sellsList;
    }

    @Override
    public void saveTurnSells(Long turnId) {
        List<DailySell> dailySellList = dailySellService.getDailySellListByTurnId(turnId);
        Date closeDate = new Date();
        dailySellList.forEach(dSell -> {
            Sells sells = new Sells(dSell.getProductId(), dSell.getDescription(), dSell.getUnits(), dSell.getProductPrice(), closeDate);
            sellsRepository.save(sells);
            dailySellService.deleteDailySell(dSell.getId());
        });

    }
}
