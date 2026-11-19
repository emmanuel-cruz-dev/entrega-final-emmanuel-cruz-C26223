package com.cruditems.api.service;

import com.cruditems.api.dto.ProductFilter;
import com.cruditems.api.dto.ProductRequest;
import com.cruditems.api.model.Category;
import com.cruditems.api.model.Product;
import com.cruditems.api.repository.CategoryRepository;
import com.cruditems.api.repository.ProductRepository;
import com.cruditems.api.repository.ProductSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Product> listProducts() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public Product saveProduct(ProductRequest request) {
        Product product = toProduct(request);
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long id, ProductRequest request) {
        Product product = toProduct(request);
        product.setId(id);
        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public Page<Product> searchProducts(ProductFilter filter, Pageable pageable) {
        return productRepository.findAll(ProductSpecifications.withFilter(filter), pageable);
    }

    @Override
    public List<String> listBrands() {
        return productRepository.findDistinctBrands();
    }

    private Product toProduct(ProductRequest request) {
        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setBrand(request.getBrand());
        product.setPrice(request.getPrice());
        product.setRating(request.getRating());
        product.setImageUrl(request.getImageUrl());
        product.setFeatured(request.getFeatured());

        if (request.getCategory() != null && request.getCategory().getId() != null) {
            Category category = categoryRepository.findById(request.getCategory().getId())
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Category not found with id: " + request.getCategory().getId()));
            product.setCategory(category);
        }

        return product;
    }
}
