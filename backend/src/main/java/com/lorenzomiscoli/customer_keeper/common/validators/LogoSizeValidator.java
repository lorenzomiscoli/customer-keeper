package com.lorenzomiscoli.customer_keeper.common.validators;

import java.util.Optional;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

@Component
public class LogoSizeValidator implements ConstraintValidator<ValidLogoSize, Optional<MultipartFile>> {

	private final long MAX_FILE_SIZE = 1048576; // 1 MB

	@Override
	public boolean isValid(Optional<MultipartFile> value, ConstraintValidatorContext context) {
		if (value.isPresent()) {
			return value.get().getSize() <= MAX_FILE_SIZE;
		}
		return true;
	}

}
