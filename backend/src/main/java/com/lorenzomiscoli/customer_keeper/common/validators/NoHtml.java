package com.lorenzomiscoli.customer_keeper.common.validators;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Documented
@Constraint(validatedBy = NoHtmlValidator.class)
@Target({ ElementType.METHOD, ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface NoHtml {

	String message() default "Field contains invalid characters";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};

}
