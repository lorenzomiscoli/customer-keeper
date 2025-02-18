package com.lorenzomiscoli.customer_keeper.users.models;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record UserUpdateDto(@Size(max = 75, message = "Name is too long") String name,
		@Size(max = 75, message = "Lastname is too long") String lastname,
		@Email(message = "Invalid email") @Size(max = 50, message = "Email is too long") String email) {
}
