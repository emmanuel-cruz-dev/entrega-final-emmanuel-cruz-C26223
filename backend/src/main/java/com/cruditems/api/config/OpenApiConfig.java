package com.cruditems.api.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("CRUD Items API")
                        .version("1.0.0")
                        .description(
                                "REST API para la gestión de productos y categorías. " +
                                "Permite realizar operaciones CRUD completas sobre productos y sus categorías."
                        )
                        .contact(new Contact()
                                .name("crud-items")
                                .email("emmanuelgerr@gmail.com")
                        )
                );
    }
}

