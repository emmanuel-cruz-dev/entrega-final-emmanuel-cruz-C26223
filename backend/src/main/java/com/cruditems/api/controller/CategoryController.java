package com.cruditems.api.controller;

import com.cruditems.api.model.Category;
import com.cruditems.api.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/categories")
@Tag(name = "Categorías", description = "Operaciones CRUD sobre categorías de productos")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @Operation(
        summary = "Listar todas las categorías",
        description = "Retorna la lista completa de categorías de productos disponibles en el sistema."
    )
    @ApiResponse(responseCode = "200", description = "Lista de categorías obtenida exitosamente")
    @GetMapping
    public List<Category> list() {
        return categoryService.listCategories();
    }

    @Operation(
        summary = "Obtener una categoría por ID",
        description = "Busca y retorna una categoría específica según su identificador único."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Categoría encontrada",
            content = @Content(schema = @Schema(implementation = Category.class))),
        @ApiResponse(responseCode = "404", description = "Categoría no encontrada", content = @Content)
    })
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(
            @Parameter(description = "ID de la categoría a buscar", required = true, example = "1")
            @PathVariable Long id) {
        return categoryService.getCategoryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(
        summary = "Crear una nueva categoría",
        description = "Registra una nueva categoría de productos en el sistema."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Categoría creada exitosamente",
            content = @Content(schema = @Schema(implementation = Category.class))),
        @ApiResponse(responseCode = "400", description = "Datos de categoría inválidos", content = @Content)
    })
    @PostMapping
    public Category create(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                description = "Datos de la nueva categoría",
                required = true,
                content = @Content(schema = @Schema(implementation = Category.class))
            )
            @RequestBody Category category) {
        return categoryService.saveCategory(category);
    }

    @Operation(
        summary = "Actualizar una categoría existente",
        description = "Modifica los datos de una categoría existente según su ID."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Categoría actualizada exitosamente",
            content = @Content(schema = @Schema(implementation = Category.class))),
        @ApiResponse(responseCode = "404", description = "Categoría no encontrada", content = @Content)
    })
    @PostMapping("/{id}")
    public ResponseEntity<Category> update(
            @Parameter(description = "ID de la categoría a actualizar", required = true, example = "1")
            @PathVariable Long id,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                description = "Nuevos datos de la categoría",
                required = true,
                content = @Content(schema = @Schema(implementation = Category.class))
            )
            @RequestBody Category category) {
        if (categoryService.getCategoryById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(categoryService.updateCategory(id, category));
    }

    @Operation(
        summary = "Eliminar una categoría",
        description = "Elimina de forma permanente una categoría del sistema según su ID."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Categoría eliminada exitosamente", content = @Content),
        @ApiResponse(responseCode = "404", description = "Categoría no encontrada", content = @Content)
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(
            @Parameter(description = "ID de la categoría a eliminar", required = true, example = "1")
            @PathVariable Long id) {
        if (categoryService.getCategoryById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        try {
            categoryService.deleteCategory(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", e.getMessage()));
        }
    }
}
