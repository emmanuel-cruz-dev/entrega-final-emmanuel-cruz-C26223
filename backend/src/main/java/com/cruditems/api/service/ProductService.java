package com.cruditems.api.service;

import com.cruditems.api.dto.ProductFilter;
import com.cruditems.api.dto.ProductRequest;
import com.cruditems.api.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> listProducts();
    Optional<Product> getProductById(Long id);
    Product saveProduct(ProductRequest request);
    Product updateProduct(Long id, ProductRequest request);
    void deleteProduct(Long id);
    Page<Product> searchProducts(ProductFilter filter, Pageable pageable);
    List<String> listBrands();
}
