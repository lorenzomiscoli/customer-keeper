package com.lorenzomiscoli.customer_keeper.customers.models;

import java.util.Optional;

public record CustomerSearchDto(Optional<String> name, Optional<CustomerSort> sort) {
}
