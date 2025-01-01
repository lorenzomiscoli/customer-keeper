package com.lorenzomiscoli.customer_keeper.customers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lorenzomiscoli.customer_keeper.customers.models.CustomerDTO;
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

}
