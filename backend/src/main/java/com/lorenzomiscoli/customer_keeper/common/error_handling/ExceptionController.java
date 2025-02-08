package com.lorenzomiscoli.customer_keeper.common.error_handling;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.HandlerMethodValidationException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.NoHandlerFoundException;

import com.lorenzomiscoli.customer_keeper.common.exceptions.RecordNotFoundException;

@ControllerAdvice
public class ExceptionController {

	@ExceptionHandler(HandlerMethodValidationException.class)
	public ResponseEntity<ResponseError> handleValidations(HandlerMethodValidationException ex) {
		String responseMsg = ex.getAllErrors().get(0).getDefaultMessage();
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseError(responseMsg));
	}

	@ExceptionHandler(MaxUploadSizeExceededException.class)
	public ResponseEntity<ResponseError> maxUpload(MaxUploadSizeExceededException ex) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseError("Maximum upload size exceeded"));
	}

	@ExceptionHandler(RecordNotFoundException.class)
	public ResponseEntity<ResponseError> recordNotFound(RecordNotFoundException ex) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseError(ex.getMessage()));
	}

	@ExceptionHandler(NoHandlerFoundException.class)
	public ResponseEntity<ResponseError> notFound(NoHandlerFoundException ex) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseError("URL not found"));
	}

	@ExceptionHandler({ Exception.class })
	public ResponseEntity<ResponseError> genericError(Exception ex) {
		ex.printStackTrace();
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseError("Something went wrong"));
	}

}
