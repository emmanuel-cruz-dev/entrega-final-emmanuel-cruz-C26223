package com.cruditems.api.service;

import com.cruditems.api.model.Category;
import com.cruditems.api.repository.CategoryRepository;
import com.cruditems.api.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Override
    public List<Category> listCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    @Override
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Long id, Category category) {
        category.setId(id);
        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Long id) {
        boolean hasProducts = !productRepository.findByCategoryId(id).isEmpty();
        if (hasProducts) {
            throw new IllegalStateException("Categoría en uso. Reasigna o elimina sus productos antes de borrarla.");
        }
        categoryRepository.deleteById(id);
    }
}