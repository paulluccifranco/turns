package com.back.serviceImpl;

import com.back.model.DailySell;
import com.back.model.Product;
import com.back.model.Sells;
import com.back.model.Shift;
import com.back.repository.SellsRepository;
import com.back.service.DailySellService;
import com.back.service.ProductService;
import com.back.service.SellsService;
import com.back.service.ShiftService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class SellsServiceImpl implements SellsService {

    private final SellsRepository sellsRepository;
    private final DailySellService dailySellService;
    private final ShiftService shiftService;
    private final ProductService productService;

    @Override
    public List<Sells> getSells() {
        Shift shift = shiftService.getLast();
        List<Sells> sellsList = sellsRepository.findAllByShiftIdOrderByDateDesc(shift.getId());
        return sellsList;
    }

    @Override
    public void saveTurnSells(Long turnId, Integer paymentMethodId) {
        List<DailySell> dailySellList = dailySellService.getDailySellListByTurnId(turnId);
        Shift shift = shiftService.getLast();
        Date closeDate = new Date();
        dailySellList.forEach(dSell -> {
            Product product = productService.getProduct(dSell.getProductId());
            Sells sells = new Sells(dSell.getProductId(), dSell.getDescription(), dSell.getUnits(), dSell.getProductPrice(), closeDate, shift.getId(), dSell.getTurnId(), product.getType(), paymentMethodId);
            sellsRepository.save(sells);
            dailySellService.deleteDailySellForClose(dSell.getId());
        });

    }

    @Override
    public List<Sells> getSellsBetweenDates(Date from, Date to) {
        return sellsRepository.findByDateBetween(from, to);
    }

    @Override
    public List<Sells> getSellsByShiftId(Long shiftId) {
        return sellsRepository.findByShiftId(shiftId);
    }
}
