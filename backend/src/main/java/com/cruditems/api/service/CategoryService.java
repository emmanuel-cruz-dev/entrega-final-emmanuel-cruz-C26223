package com.cruditems.api.service;

import com.cruditems.api.model.Category;
import java.util.List;
import java.util.Optional;

public interface CategoryService {
    List<Category> listCategories();
    Optional<Category> getCategoryById(Long id);
    Category saveCategory(Category category);
    Category updateCategory(Long id, Category category);
    void deleteCategory(Long id);
}