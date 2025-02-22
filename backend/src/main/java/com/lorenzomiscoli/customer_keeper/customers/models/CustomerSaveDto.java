package com.lorenzomiscoli.customer_keeper.customers.models;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CustomerSaveDto(
		@NotBlank(message = "{name-empty-error}") @Size(max = 75, message = "{name-exceeds-error}") String name,
		@Email(message = "{invalid-email-error}") @Size(max = 50, message = "{email-exceeds-error}") String email,
		@Size(max = 25, message = "{phone-exceeds-error}") String phone) {
}
