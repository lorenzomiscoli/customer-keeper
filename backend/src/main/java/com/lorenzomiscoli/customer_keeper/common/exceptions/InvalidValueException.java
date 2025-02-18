package com.lorenzomiscoli.customer_keeper.common.exceptions;

public class InvalidValueException extends BadRequestException {

	private static final long serialVersionUID = -5443436730059918999L;

	public InvalidValueException() {
		super();
	}

	public InvalidValueException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public InvalidValueException(String message, Throwable cause) {
		super(message, cause);
	}

	public InvalidValueException(String message) {
		super(message);
	}

	public InvalidValueException(Throwable cause) {
		super(cause);

	}

}
