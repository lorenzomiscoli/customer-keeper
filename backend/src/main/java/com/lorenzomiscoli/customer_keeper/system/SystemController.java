package com.lorenzomiscoli.customer_keeper.system;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/system")
class SystemController {

	private final SystemService systemService;

	SystemController(SystemService systemService) {
		this.systemService = systemService;
	}

	@GetMapping("/version")
	ResponseEntity<Map<String, String>> getVersion() {
		return ResponseEntity.ok(systemService.getVersion());
	}

}
