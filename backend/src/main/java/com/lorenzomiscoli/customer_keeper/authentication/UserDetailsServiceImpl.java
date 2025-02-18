package com.lorenzomiscoli.customer_keeper.authentication;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lorenzomiscoli.customer_keeper.users.UserService;
import com.lorenzomiscoli.customer_keeper.users.models.UserLoginDto;

import java.util.ArrayList;

@Service
class UserDetailsServiceImpl implements UserDetailsService {

	private final UserService userService;

	private final PasswordEncoder encoder;

	UserDetailsServiceImpl(UserService userService, PasswordEncoder encoder) {
		this.userService = userService;
		this.encoder = encoder;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserLoginDto user = userService.findCredentialsByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
		return new org.springframework.security.core.userdetails.User(user.username(), user.password(),
				new ArrayList<>());
	}

	UserDetails validateCredentials(UserLoginDto userLoginDto) {
		try {
			UserDetails user = loadUserByUsername(userLoginDto.username());
			if (comparePasswords(userLoginDto.password(), user.getPassword())) {
				return user;
			}
		} catch (UsernameNotFoundException e) {
			throw new BadCredentialsException("Invalid username or password");
		}
		throw new BadCredentialsException("Invalid username or password");
	}

	private boolean comparePasswords(String enteredCred, String userCred) {
		return encoder.matches(enteredCred, userCred);
	}

}
