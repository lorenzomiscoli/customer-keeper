package com.lorenzomiscoli.customer_keeper.users.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserPasswordUpdateDto(
		@NotBlank(message = "{old-password-empty-error}") @Size(max = 250, message = "{old-password-exceeds-error}") String oldPassword,
		@NotBlank(message = "{new-password-empty-error}") @Size(max = 250, message = "{new-password-exceeds-error}") String newPassword) {
}
