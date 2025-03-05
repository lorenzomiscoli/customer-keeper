package com.lorenzomiscoli.customer_keeper.common.configuration;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.lorenzomiscoli.customer_keeper.authentication.BasicAuthenticationProvider;

@Configuration
public class SecurityConfig {

	private final BasicAuthenticationProvider authProvider;

	private final List<String> allowedOrigins;

	public SecurityConfig(BasicAuthenticationProvider authProvider,
			@Value("${allowedOrigins}") List<String> allowedOrigins) {
		this.authProvider = authProvider;
		this.allowedOrigins = allowedOrigins;
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
		http.authenticationProvider(authProvider).cors(Customizer.withDefaults()).csrf((value) -> value.disable())
				.authorizeHttpRequests((matcher) -> {
					matcher.requestMatchers("/api/login").permitAll();
					matcher.anyRequest().authenticated();
				}).httpBasic(basic -> {
					basic.authenticationEntryPoint(new CustomBasicAuthenticationEntryPoint());
				});
		return http.build();
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(allowedOrigins);
		configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

}
