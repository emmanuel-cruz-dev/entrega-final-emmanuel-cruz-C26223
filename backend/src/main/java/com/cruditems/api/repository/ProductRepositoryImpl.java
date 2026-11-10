package com.cruditems.api.repository;

import com.cruditems.api.model.Product;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class ProductRepositoryImpl implements ProductRepository {
    private final List<Product> products = new ArrayList<>();

    private long idCounter = 1;

    @Override
    public List<Product> findAll() {
        return new ArrayList<>(products);
    }

    @Override
    public Optional<Product> findById(Long id) {
        return products.stream().filter(a -> a.getId().equals(id)).findFirst();
    }

    @Override
    public Product save(Product product) {
        if (product.getId() == null) {
            product.setId(idCounter++);
            products.add(product);
        } else {
            deleteById(product.getId());
            products.add(product);
        }
        return product;
    }

    @Override
    public void deleteById(Long id) {
        products.removeIf(a -> a.getId().equals(id));
    }
}
