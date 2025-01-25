package com.lorenzomiscoli.customer_keeper.common.validators;

import org.springframework.stereotype.Component;
import org.springframework.web.util.HtmlUtils;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

@Component
public class NoHtmlValidator implements ConstraintValidator<NoHtml, String> {

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		if (value != null) {
			/**
			 * Verify if a string contains any HTML characters by comparing its HTML-escaped
			 * version with the original.
			 */
			if (!value.equals(HtmlUtils.htmlEscape(value))) {
				return false;
			}
		}
		return true;
	}

}
