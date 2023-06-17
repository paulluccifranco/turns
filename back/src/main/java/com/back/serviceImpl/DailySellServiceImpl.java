package com.back.serviceImpl;

import com.back.model.DailySell;
import com.back.model.Product;
import com.back.repository.DailySellRepository;
import com.back.service.DailySellService;
import com.back.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class DailySellServiceImpl implements DailySellService {

    private final DailySellRepository dailySellRepository;
    private final ProductService productService;

    @Override
    public List<DailySell> getDailySellList() {
        return dailySellRepository.findAll();
    }

    @Override
    public List<DailySell> getDailySellListByTurnId(Long turnId) {
        return dailySellRepository.findByTurnId(turnId);
    }

    @Override
    public DailySell getDailySell(Long id) {
        return dailySellRepository.findById(id).get();
    }

    @Override
    public void saveDailySell(DailySell dailySell) {
        List<DailySell> dailySells = getDailySellListByTurnId(dailySell.getTurnId());
        DailySell dailySellUpdate = dailySells.stream().filter(sell -> sell.getProductId().equals(dailySell.getProductId())).findFirst().orElse(null);
        Product product = productService.getProduct(dailySell.getProductId());
        product.setStock(product.getStock() - dailySell.getUnits());
        productService.saveProduct(product);
        if(dailySellUpdate != null && dailySellUpdate.getProductPrice().compareTo(dailySell.getProductPrice()) == 0) {
            dailySellUpdate.setUnits(dailySell.getUnits() + dailySellUpdate.getUnits());
            if(dailySellUpdate.getUnits() == 0) {
                dailySellRepository.deleteById(dailySellUpdate.getId());
            }else {
                dailySellRepository.save(dailySellUpdate);
            }

        }else {
            dailySellRepository.save(dailySell);
        }
    }

    @Override
    public void deleteDailySell(Long id) {
        DailySell dailySell = dailySellRepository.getReferenceById(id);
        Product product = productService.getProduct(dailySell.getProductId());
        product.setStock(product.getStock() + dailySell.getUnits());
        productService.saveProduct(product);
        dailySellRepository.deleteById(id);
    }

    @Override
    public void deleteDailySellForClose(Long id) {
        dailySellRepository.deleteById(id);
    }
}
