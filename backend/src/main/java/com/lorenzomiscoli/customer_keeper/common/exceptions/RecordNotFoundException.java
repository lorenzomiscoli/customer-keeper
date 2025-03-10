package com.lorenzomiscoli.customer_keeper.common.exceptions;

public class RecordNotFoundException extends BadRequestException {

	private static final long serialVersionUID = -6966014559194331025L;

	public RecordNotFoundException() {
	}

	public RecordNotFoundException(String message) {
		super(message);
	}

	public RecordNotFoundException(Throwable cause) {
		super(cause);
	}

	public RecordNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}

	public RecordNotFoundException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

}
