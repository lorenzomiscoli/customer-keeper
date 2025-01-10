package com.lorenzomiscoli.customer_keeper.customers.models;

import java.time.ZonedDateTime;

public record CustomerDTO(Integer id, String name, ZonedDateTime updatedDate) {
}
