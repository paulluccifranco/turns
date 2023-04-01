package com.back.serviceImpl;

import com.back.model.Product;
import com.back.repository.ProductRepository;
import com.back.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;

    @Override
    public List<Product> getProductList() {
        return productRepository.findAllByOrderByDescriptionAsc();
    }

    @Override
    public Product getProduct(Long id) {
        return productRepository.findById(id).get();
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public void saveProduct(Product product) {
        productRepository.save(product);
    }

    @Override
    public void addStockProduct(Long productId, Integer units) {
        Product product = productRepository.findById(productId).get();
        Integer actualStock = product.getStock();
        product.setStock(actualStock+units);
        productRepository.save(product);
    }
}
