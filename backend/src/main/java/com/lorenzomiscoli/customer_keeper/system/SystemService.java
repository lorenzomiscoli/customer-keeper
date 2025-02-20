package com.lorenzomiscoli.customer_keeper.system;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Map;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

@Service
class SystemService {
	 
	private final String FILE_VERSION = "VERSION.txt";
	
	private final String VERSION = "version";
	 
	Map<String, String> getVersion() {
		 String version;
			try {
				var resource = new ClassPathResource(FILE_VERSION);
				InputStream inputStream = resource.getInputStream();
				version = new String(inputStream.readAllBytes(), StandardCharsets.UTF_8).trim();
			} catch (Exception e) {
				version = new String("0.0.0");
			}			
		return Map.of(VERSION, version);
	}

}
