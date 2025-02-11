package com.lorenzomiscoli.customer_keeper.customers.models;

import java.time.ZonedDateTime;

public record CustomerDto(Integer id, String name, String email, String phone, ZonedDateTime updatedDate) {
}
