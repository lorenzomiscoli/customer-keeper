package com.lorenzomiscoli.customer_keeper.common.translation;

import java.util.Locale;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

	private final MessageSource messageSource;

	public MessageService(MessageSource messageSource) {
		this.messageSource = messageSource;
	}

	public String getLocalizedMessage(String messageId) {
		return messageSource.getMessage(messageId, null, LocaleContextHolder.getLocale());
	}

	public String getLocalizedMessage(String messageId, Object[] args) {
		return messageSource.getMessage(messageId, args, LocaleContextHolder.getLocale());
	}

	public String getLocalizedMessage(String messageId, Locale locale) {
		return messageSource.getMessage(messageId, null, locale);
	}

}
