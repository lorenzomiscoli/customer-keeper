package com.lorenzomiscoli.customer_keeper.authentication;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lorenzomiscoli.customer_keeper.users.models.UserLoginDto;

@RestController
@RequestMapping(value = "/api/login")
class AuthController {

	private UserDetailsServiceImpl userDetailsService;

	AuthController(UserDetailsServiceImpl userService) {
		this.userDetailsService = userService;
	}

	@PostMapping
	ResponseEntity<UserDetails> login(@RequestBody UserLoginDto userLoginDto) {
		UserDetails user = userDetailsService.validateCredentials(userLoginDto);
		return ResponseEntity.ok(user);
	}

}
