package com.cruditems.api.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;

@Entity
@Table(name = "products")
@Schema(description = "Producto del catálogo")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identificador único del producto", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;

    @Schema(description = "Nombre del producto", example = "Auriculares Bluetooth XZ-500", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(description = "Descripción detallada del producto", example = "Auriculares inalámbricos con cancelación de ruido activa")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    @Schema(description = "Categoría a la que pertenece el producto")
    private Category category;

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

    public Product() {}

    public Product(
            Long id,
            String name,
            String description,
            Category category,
            String brand,
            Double price,
            Double rating,
            String imageUrl,
            Boolean featured
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.brand = brand;
        this.price = price;
        this.rating = rating;
        this.imageUrl = imageUrl;
        this.featured = featured;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

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
