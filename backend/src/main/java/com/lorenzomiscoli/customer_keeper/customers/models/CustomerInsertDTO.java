package com.lorenzomiscoli.customer_keeper.customers.models;

import com.lorenzomiscoli.customer_keeper.common.validators.NoHtml;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CustomerInsertDTO(
		@NotBlank(message = "Name cannot be empty") @Size(max = 250, message = "Name is too long") @NoHtml(message = " Name contains invalid characters") String name,
		@Email(message = "Invalid email") @Size(max = 50, message = "Email is too long") @NoHtml(message = " Email contains invalid characters") String email,
		@Size(max = 25, message = "Phone is too long") @NoHtml(message = " Phone contains invalid characters") String phone) {
}
