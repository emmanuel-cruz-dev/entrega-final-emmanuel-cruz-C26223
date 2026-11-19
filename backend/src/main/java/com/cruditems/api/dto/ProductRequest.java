package com.cruditems.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Datos para crear o actualizar un producto")
public class ProductRequest {

    @Schema(description = "Nombre del producto", example = "Auriculares Bluetooth XZ-500", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(description = "Descripción detallada del producto", example = "Auriculares inalámbricos con cancelación de ruido activa")
    private String description;

    @Schema(description = "Referencia a la categoría existente (se requiere el id)", requiredMode = Schema.RequiredMode.REQUIRED)
    private CategoryRef category;

    @Schema(description = "Marca del producto", example = "SoundMax")
    private String brand;

    @Schema(description = "Precio del producto en la moneda local", example = "149.99")
    private Double price;

    @Schema(description = "Puntuación de valoración del producto (0.0 a 5.0)", example = "4.5", minimum = "0", maximum = "5")
    private Double rating;

    @Schema(description = "URL de la imagen principal del producto", example = "https://example.com/images/product-1.jpg")
    private String imageUrl;

    @Schema(description = "Indica si el producto es destacado en el catálogo", example = "true")
    private Boolean featured;

    @Schema(description = "Referencia a una categoría existente")
    public static class CategoryRef {

        @Schema(description = "Identificador único de la categoría existente", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
        private Long id;

        public CategoryRef() {}

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
    }

    public ProductRequest() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public CategoryRef getCategory() { return category; }
    public void setCategory(CategoryRef category) { this.category = category; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Boolean getFeatured() { return featured; }
    public void setFeatured(Boolean featured) { this.featured = featured; }
}

