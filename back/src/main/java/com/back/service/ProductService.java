package com.back.service;

import com.back.model.Product;

import java.util.List;

public interface ProductService {

    public List<Product> getProductList();
    public Product getProduct(Long id);
    public void deleteProduct(Long id);
    public void saveProduct(Product product);
    public void addStockProduct(Long productId, Integer units);
}
