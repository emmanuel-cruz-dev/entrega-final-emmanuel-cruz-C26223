package com.cruditems.api.repository;

import com.cruditems.api.dto.ProductFilter;
import com.cruditems.api.model.Product;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ProductSpecifications {

    private ProductSpecifications() {}

    public static Specification<Product> withFilter(ProductFilter f) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (f.search() != null && !f.search().isBlank()) {
                String like = "%" + f.search().trim().toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("name")), like),
                        cb.like(cb.lower(root.get("description")), like),
                        cb.like(cb.lower(root.get("brand")), like)
                ));
            }
            if (f.categoryIds() != null && !f.categoryIds().isEmpty()) {
                predicates.add(root.get("category").get("id").in(f.categoryIds()));
            }
            if (f.brand() != null && !f.brand().isBlank()) {
                predicates.add(cb.equal(cb.lower(root.get("brand")), f.brand().trim().toLowerCase()));
            }
            if (f.featured() != null) {
                predicates.add(cb.equal(root.get("featured"), f.featured()));
            }
            if (f.minPrice() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"), f.minPrice()));
            }
            if (f.maxPrice() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), f.maxPrice()));
            }
            if (f.minRating() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("rating"), f.minRating()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
