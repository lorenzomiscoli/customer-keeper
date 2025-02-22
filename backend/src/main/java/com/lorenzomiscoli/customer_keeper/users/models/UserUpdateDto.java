package com.lorenzomiscoli.customer_keeper.users.models;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record UserUpdateDto(@Size(max = 75, message = "{name-exceeds-error}") String name,
		@Size(max = 75, message = "{lastname-exceeds-error}") String lastname,
		@Email(message = "{invalid-email-error}") @Size(max = 50, message = "{email-exceeds-error}") String email) {
}
