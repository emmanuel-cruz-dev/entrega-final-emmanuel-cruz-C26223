package com.cruditems.api.dto;

import java.util.List;

public record ProductFilter(
        String search,
        List<Long> categoryIds,
        String brand,
        Boolean featured,
        Double minPrice,
        Double maxPrice,
        Double minRating
) {
}
