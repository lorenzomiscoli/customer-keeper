package com.lorenzomiscoli.customer_keeper.common.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import com.lorenzomiscoli.customer_keeper.authentication.BasicAuthenticationProvider;

@Configuration
public class SecurityConfig {

	private final BasicAuthenticationProvider authProvider;

	public SecurityConfig(BasicAuthenticationProvider authProvider) {
		this.authProvider = authProvider;
	}

	@Bean
	public AuthenticationManager authManager(HttpSecurity http) throws Exception {
		AuthenticationManagerBuilder authenticationManagerBuilder = http
				.getSharedObject(AuthenticationManagerBuilder.class);
		authenticationManagerBuilder.authenticationProvider(authProvider);
		return authenticationManagerBuilder.build();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.authenticationProvider(authProvider).csrf((value) -> value.disable()).authorizeHttpRequests((matcher) -> {
			matcher.requestMatchers("/api/login").permitAll();
			matcher.anyRequest().authenticated();
		}).httpBasic(basic -> {
			basic.authenticationEntryPoint(new CustomBasicAuthenticationEntryPoint());
		});
		return http.build();
	}

}
