package com.lorenzomiscoli.customer_keeper.common.error_handling;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.HandlerMethodValidationException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.NoHandlerFoundException;

import com.lorenzomiscoli.customer_keeper.common.exceptions.BadRequestException;
import com.lorenzomiscoli.customer_keeper.common.translation.MessageService;

@ControllerAdvice
public class ExceptionController {

	private final MessageService messageService;

	ExceptionController(MessageService messageService) {
		this.messageService = messageService;
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ResponseError> handleValidation(MethodArgumentNotValidException ex) {
		String responseMsg = ex.getBindingResult().getAllErrors().get(0).getDefaultMessage();
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseError(responseMsg));
	}

	@ExceptionHandler(HandlerMethodValidationException.class)
	public ResponseEntity<ResponseError> handleValidations(HandlerMethodValidationException ex) {
		String responseMsg = ex.getAllErrors().get(0).getDefaultMessage();
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseError(responseMsg));
	}

	@ExceptionHandler(MaxUploadSizeExceededException.class)
	public ResponseEntity<ResponseError> maxUpload(MaxUploadSizeExceededException ex) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ResponseError(messageService.getLocalizedMessage("max-upload-error")));
	}

	@ExceptionHandler(BadRequestException.class)
	public ResponseEntity<ResponseError> handleValidations(BadRequestException ex) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseError(ex.getMessage()));
	}

	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<ResponseError> invalidCredentials(BadCredentialsException ex) {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseError(ex.getMessage()));
	}

	@ExceptionHandler(NoHandlerFoundException.class)
	public ResponseEntity<ResponseError> notFound(NoHandlerFoundException ex) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(new ResponseError(messageService.getLocalizedMessage("not-found-error")));
	}

	@ExceptionHandler({ Exception.class })
	public ResponseEntity<ResponseError> genericError(Exception ex) {
		ex.printStackTrace();
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(new ResponseError(messageService.getLocalizedMessage("generic-error")));
	}

}
