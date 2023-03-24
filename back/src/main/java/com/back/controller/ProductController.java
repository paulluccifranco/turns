package com.back.controller;

import com.back.model.PermanentTurn;
import com.back.model.Product;
import com.back.model.Turn;
import com.back.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST,  RequestMethod.DELETE })
@RestController
@RequestMapping("/product")
@AllArgsConstructor
public class ProductController {

    private ProductService productService;

    @GetMapping("")
    public List<Product> getProductList()  {
        return productService.getProductList();
    }

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable("id") Long id)  {
        return productService.getProduct(id);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable("id") Long id){
        productService.deleteProduct(id);
    }

    @PostMapping()
    public void saveProduct(@RequestBody Product product){
        productService.saveProduct(product);
    }

    @PutMapping("/{id}/{units}")
    public void addStock(@PathVariable("id") Long id, @PathVariable("units") Integer units){
        productService.addStockProduct(id, units);
    }
}
