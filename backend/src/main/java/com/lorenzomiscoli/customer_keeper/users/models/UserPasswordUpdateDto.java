package com.lorenzomiscoli.customer_keeper.users.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserPasswordUpdateDto(
		@NotBlank(message = "Old password cannot be empty") @Size(max = 250, message = "Old password is too long") String oldPassword,
		@NotBlank(message = "New password cannot be empty") @Size(max = 250, message = "New password is too long") String newPassword) {
}
