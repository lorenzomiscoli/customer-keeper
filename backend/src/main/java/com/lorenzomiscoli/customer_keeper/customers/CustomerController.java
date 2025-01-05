package com.lorenzomiscoli.customer_keeper.customers;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lorenzomiscoli.customer_keeper.customers.models.CustomerDTO;
import com.lorenzomiscoli.customer_keeper.customers.models.CustomerLogoDTO;
import com.lorenzomiscoli.customer_keeper.customers.models.CustomerSearchDTO;

@RestController
@RequestMapping("/api/customers")
class CustomerController {

	private final CustomerService customerService;

	CustomerController(CustomerService customerService) {
		this.customerService = customerService;
	}

	@GetMapping
	List<CustomerDTO> search(CustomerSearchDTO customerSearchDto) {
		return customerService.search(customerSearchDto);
	}

	@GetMapping("/{id}/logo")
	ResponseEntity<byte[]> findLogo(@PathVariable Integer id) {
		CustomerLogoDTO customerLogoDto = customerService.findLogo(id);
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.add("Content-Type", customerLogoDto.mimeType());
		return ResponseEntity.ok().headers(responseHeaders).body(customerLogoDto.logo());
	}

}
