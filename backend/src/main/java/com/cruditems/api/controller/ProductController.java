package com.cruditems.api.controller;

import com.cruditems.api.dto.PageResponse;
import com.cruditems.api.dto.ProductFilter;
import com.cruditems.api.dto.ProductRequest;
import com.cruditems.api.model.Product;
import com.cruditems.api.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@Tag(name = "Productos", description = "Operaciones CRUD sobre productos")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @Operation(
            summary = "Listar productos (paginado y filtrable)",
            description = "Retorna productos paginados. Todos los filtros son opcionales y combinables."
    )
    @ApiResponse(responseCode = "200", description = "Página de productos obtenida exitosamente")
    @GetMapping
    public PageResponse<Product> list(
            @Parameter(description = "Texto a buscar en nombre, descripción o marca")
            @RequestParam(required = false) String search,
            @Parameter(description = "IDs de categorías (puede repetirse o separarse por coma)", example = "1,2")
            @RequestParam(required = false) List<Long> categoryId,
            @Parameter(description = "Marca exacta")
            @RequestParam(required = false) String brand,
            @Parameter(description = "Filtrar por destacados", example = "true")
            @RequestParam(required = false) Boolean featured,
            @Parameter(description = "Precio mínimo")
            @RequestParam(required = false) Double minPrice,
            @Parameter(description = "Precio máximo")
            @RequestParam(required = false) Double maxPrice,
            @Parameter(description = "Rating mínimo (0 a 5)")
            @RequestParam(required = false) Double minRating,
            @ParameterObject @PageableDefault(size = 10, sort = "id") Pageable pageable) {

        ProductFilter filter = new ProductFilter(
                search, categoryId, brand, featured, minPrice, maxPrice, minRating);
        return PageResponse.from(productService.searchProducts(filter, pageable));
    }

    @Operation(summary = "Listar marcas disponibles", description = "Útil para armar el filtro de marcas en el frontend.")
    @GetMapping("/brands")
    public List<String> brands() {
        return productService.listBrands();
    }

    @Operation(
        summary = "Obtener un producto por ID",
        description = "Busca y retorna un producto específico según su identificador único."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Producto encontrado",
            content = @Content(schema = @Schema(implementation = Product.class))),
        @ApiResponse(responseCode = "404", description = "Producto no encontrado", content = @Content)
    })
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(
            @Parameter(description = "ID del producto a buscar", required = true, example = "1")
            @PathVariable Long id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(
        summary = "Crear un nuevo producto",
        description = "Registra un nuevo producto en el sistema. Debe incluir al menos nombre y categoría."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Producto creado exitosamente",
            content = @Content(schema = @Schema(implementation = Product.class))),
        @ApiResponse(responseCode = "400", description = "Datos del producto inválidos", content = @Content)
    })
    @PostMapping
    public Product create(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                description = "Datos del nuevo producto",
                required = true,
                content = @Content(schema = @Schema(implementation = ProductRequest.class))
            )
            @RequestBody ProductRequest request) {
        return productService.saveProduct(request);
    }

    @Operation(
        summary = "Actualizar un producto existente",
        description = "Modifica los datos de un producto existente según su ID."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Producto actualizado exitosamente",
            content = @Content(schema = @Schema(implementation = Product.class))),
        @ApiResponse(responseCode = "404", description = "Producto no encontrado", content = @Content)
    })
    @PostMapping("/{id}")
    public ResponseEntity<Product> update(
            @Parameter(description = "ID del producto a actualizar", required = true, example = "1")
            @PathVariable Long id,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                description = "Nuevos datos del producto",
                required = true,
                content = @Content(schema = @Schema(implementation = ProductRequest.class))
            )
            @RequestBody ProductRequest request) {
        if (productService.getProductById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(productService.updateProduct(id, request));
    }

    @Operation(
        summary = "Eliminar un producto",
        description = "Elimina de forma permanente un producto del sistema según su ID."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Producto eliminado exitosamente", content = @Content),
        @ApiResponse(responseCode = "404", description = "Producto no encontrado", content = @Content)
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @Parameter(description = "ID del producto a eliminar", required = true, example = "1")
            @PathVariable Long id) {
        if (productService.getProductById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
