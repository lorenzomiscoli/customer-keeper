package com.lorenzomiscoli.customer_keeper.authentication;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.lorenzomiscoli.customer_keeper.common.translation.MessageService;

import java.util.ArrayList;

@Component
public class BasicAuthenticationProvider implements AuthenticationProvider {

	private final UserDetailsService userServ;

	private final PasswordEncoder encoder;

	private final MessageService messageService;

	BasicAuthenticationProvider(UserDetailsService userServ, PasswordEncoder encoder, MessageService messageService) {
		super();
		this.userServ = userServ;
		this.encoder = encoder;
		this.messageService = messageService;
	}

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String name = authentication.getName();
		String password = authentication.getCredentials().toString();
		try {
			UserDetails user = userServ.loadUserByUsername(name);
			if (comparePasswords(password, user.getPassword())) {
				return new UsernamePasswordAuthenticationToken(name, password, new ArrayList<>());
			}
		} catch (UsernameNotFoundException e) {
			throw new BadCredentialsException(messageService.getLocalizedMessage("invalid-username-password"));
		}
		throw new BadCredentialsException(messageService.getLocalizedMessage("invalid-username-password"));
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}

	private boolean comparePasswords(String enteredCred, String userCred) {
		return encoder.matches(enteredCred, userCred);
	}

}
